// Checks every product file before you publish.
// Run it with:  npm run validate
//
// To check a different folder (e.g. the deliberately broken test files):
//   npm run validate -- tests/fixtures/products
//
// ERRORS (✗) are mistakes that must be fixed. The site won't build until they are.
// WARNINGS (⚠) are things to look at, like stale prices. They don't block anything.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { parse } from 'yaml';
import type { z } from 'astro/zod';
import { categories, productSchema } from '../src/categories';
import type { Product } from '../src/categories';
import { settings } from '../src/settings';
import { isAfterDay } from '../src/lib/dates';
import { allPrices, bestPrice } from '../src/lib/pricing';
import { isCertificationCurrent, isCoaStale } from '../src/lib/staleness';
import { tierFor } from '../src/lib/tier';

const PRODUCTS_DIR = process.argv[2] ?? join('src', 'content', 'products');
const today = new Date();

interface FileReport {
  file: string;
  errors: string[];
  warnings: string[];
  summary?: string;
}

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

const day = (d: Date) => d.toISOString().slice(0, 10);
const usd = (n: number) => `$${n.toFixed(2)}`;

// Turns a field path like ["prices", 0, "price_usd"] into "prices #1 → price_usd".
function fieldName(path: PropertyKey[]): string {
  if (path.length === 0) return '(whole file)';
  return path.map((p) => (typeof p === 'number' ? `#${p + 1}` : String(p))).join(' → ').replace(/ → #/g, ' #');
}

// Rewrites the schema checker's messages in plainer words where it can.
function friendlyIssue(issue: z.core.$ZodIssue): string[] {
  if (issue.code === 'unrecognized_keys') {
    const where = issue.path.length ? ` in ${fieldName(issue.path)}` : '';
    return issue.keys.map((k) => `Unknown field "${k}"${where}. Check the spelling against the README.`);
  }
  if (issue.code === 'invalid_type' && issue.input === undefined) {
    return [`${fieldName(issue.path)}: missing. This field is required.`];
  }
  if (issue.code === 'too_small' && issue.origin === 'string') {
    return [`${fieldName(issue.path)}: empty. Fill it in.`];
  }
  if (issue.code === 'too_small' && issue.origin === 'number') {
    return [`${fieldName(issue.path)}: must be more than 0.`];
  }
  return [`${fieldName(issue.path)}: ${issue.message}`];
}

function checkFile(path: string): FileReport {
  const file = relative(PRODUCTS_DIR, path).split(sep).join('/');
  const report: FileReport = { file, errors: [], warnings: [] };
  const { errors, warnings } = report;

  // --- File name and folder ---
  if (!path.endsWith('.yaml')) {
    errors.push(
      path.endsWith('.yml')
        ? 'File ends in ".yml". Rename it to ".yaml" or the site will ignore it.'
        : 'Not a .yaml file. Only product files belong in this folder.',
    );
    return report;
  }
  const parts = file.split('/');
  const fileName = parts[parts.length - 1];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*\.yaml$/.test(fileName)) {
    errors.push('File name must be lowercase letters and numbers joined by dashes, e.g. brand-creatine-powder.yaml.');
  }
  if (parts.length !== 2) {
    errors.push('Product files must sit directly inside a category folder, e.g. creatine/brand-product.yaml.');
  }

  // --- Can the YAML be read at all? ---
  let raw: unknown;
  try {
    raw = parse(readFileSync(path, 'utf8'));
  } catch (e) {
    errors.push(`The file isn't valid YAML (often a wrong indent or a missing colon): ${(e as Error).message.split('\n')[0]}`);
    return report;
  }

  // --- Does it match the product shape? ---
  const result = productSchema.safeParse(raw);
  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push(...friendlyIssue(issue));
    }
    return report;
  }
  const product: Product = result.data;
  const category = categories[product.category];

  if (parts.length === 2 && parts[0] !== product.category) {
    errors.push(`File is in the "${parts[0]}" folder but says category: ${product.category}.`);
  }

  // --- Impossible values ---
  const { dose } = product;
  if (dose.creatine_per_serving_g > dose.serving_size_g) {
    errors.push(
      `dose: creatine per serving (${dose.creatine_per_serving_g} g) is more than the whole serving (${dose.serving_size_g} g).`,
    );
  }
  const futureDates: [string, Date][] = [
    ...product.prices.map((p, i): [string, Date] => [`prices #${i + 1} → date_checked`, p.date_checked]),
    ...product.certifications.map((c, i): [string, Date] => [`certifications #${i + 1} → date_verified`, c.date_verified]),
    ...product.coas.map((c, i): [string, Date] => [`coas #${i + 1} → test_date`, c.test_date]),
  ];
  for (const [field, date] of futureDates) {
    if (isAfterDay(date, today)) errors.push(`${field}: ${day(date)} is in the future.`);
  }

  // --- Things to look at ---
  if (product.prices.length === 0) warnings.push('No prices yet, so it has no cost per dose.');
  const retailers = product.prices.map((p) => p.retailer.toLowerCase());
  const duplicates = [...new Set(retailers.filter((r, i) => retailers.indexOf(r) !== i))];
  for (const r of duplicates) warnings.push(`Retailer "${r}" is listed more than once. Is that on purpose?`);

  const { min, max } = category.plausibleCostPerReferenceDose;
  for (const p of allPrices(product, today)) {
    const where = `${p.price.retailer} (${usd(p.price.price_usd)})`;
    if (p.stale) {
      warnings.push(`STALE PRICE: ${where} was checked ${day(p.price.date_checked)}, over ${settings.priceStaleAfterDays} days ago.`);
    }
    if (p.costPerReferenceDose < min || p.costPerReferenceDose > max) {
      warnings.push(
        `${where} works out to ${usd(p.costPerReferenceDose)} ${category.referenceDose.label}, which is unusual. Check the price and servings for a typo.`,
      );
    }
  }
  product.coas.forEach((coa, i) => {
    if (isCoaStale(coa.test_date, today)) {
      warnings.push(`STALE COA: coas #${i + 1} (lot ${coa.lot}) was tested ${day(coa.test_date)}, over ${settings.coaStaleAfterYears} years ago.`);
    }
    if (coa.tests.length === 0) warnings.push(`coas #${i + 1} (lot ${coa.lot}) lists no tests.`);
  });
  product.certifications.forEach((c, i) => {
    if (!isCertificationCurrent(c.date_verified, today)) {
      warnings.push(
        `OLD CERTIFICATION CHECK: certifications #${i + 1} (${c.program}) was last verified ${day(c.date_verified)}. Re-check the certifier's listing and update date_verified.`,
      );
    }
  });
  const urls = [...product.prices.map((p) => p.url), ...product.certifications.map((c) => c.listing_url), ...product.coas.map((c) => c.url)];
  if (urls.some((u) => new URL(u).hostname.endsWith('example.com'))) {
    warnings.push('Uses example.com links, so this is sample data. Remove it or replace it before launch.');
  }

  // One-line summary of what the site will show.
  const best = bestPrice(product, today);
  const price = best ? `${usd(best.costPerReferenceDose)} ${category.referenceDose.label}` : 'no price';
  report.summary = `Tier ${tierFor(product, today).tier}, best ${price}`;
  return report;
}

// --- Run it ---
const reports = listFiles(PRODUCTS_DIR).sort().map(checkFile);
let errorCount = 0;
let warningCount = 0;

console.log(`Checking ${reports.length} product file(s) in ${PRODUCTS_DIR} (today is ${day(today)})\n`);
for (const r of reports) {
  errorCount += r.errors.length;
  warningCount += r.warnings.length;
  const mark = r.errors.length ? '✗' : r.warnings.length ? '⚠' : '✓';
  console.log(`${mark} ${r.file}${r.summary && !r.errors.length ? `  (${r.summary})` : ''}`);
  for (const e of r.errors) console.log(`    ✗ ${e}`);
  for (const w of r.warnings) console.log(`    ⚠ ${w}`);
}

console.log(`\n${errorCount} error(s), ${warningCount} warning(s).`);
if (errorCount > 0) {
  console.log('Fix the errors (✗) above before publishing.');
  process.exit(1);
}
console.log(warningCount > 0 ? 'No errors. Look over the warnings (⚠) before publishing.' : 'All good.');
