// Checks every product file before you publish.
// Run it with:  npm run validate
//
// To check a different folder (e.g. the deliberately broken test files):
//   npm run validate -- tests/fixtures/products
//
// ERRORS (✗) are mistakes that must be fixed. The site won't build until they are.
// WARNINGS (⚠) are things to look at, like stale prices. They don't block anything.
//
// Short version, for Claude's checkpoints:  npm run validate:brief
// It shows every error and every warning that needs action now (stale, missing prices,
// duplicates...), but only counts the review-queue warnings (UNVERIFIED, NOT GRADED,
// DRAFT) instead of listing all of them. Pass/fail is exactly the same as the full run.
// Add --show=<text> to list matching files in full, e.g.
//   npm run validate:brief -- --show=calcium/
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { parse } from 'yaml';
import type { z } from 'astro/zod';
import { categoryOf, productSchema } from '../src/categories';
import type { Product } from '../src/categories';
import { settings } from '../src/settings';
import { isAfterDay } from '../src/lib/dates';
import { allPrices, bestPrice } from '../src/lib/pricing';
import { freshness, isCertificationCurrent, isCoaStale } from '../src/lib/staleness';
import type { DatedKind } from '../src/lib/staleness';
import { tierFor } from '../src/lib/tier';
import { usd } from '../src/lib/format';
import { checkEvidence } from '../src/evidence/check';
import { evidencePages } from '../src/evidence';
import { ingredientRules, FLAGS_FILE } from '../src/ingredients/rules';
import { ingredientGrade } from '../src/lib/ingredients';

const args = process.argv.slice(2);
const brief = args.includes('--brief');
const showInFull = args.filter((a) => a.startsWith('--show=')).map((a) => a.slice('--show='.length));
const folderArg = args.find((a) => !a.startsWith('--'));
const PRODUCTS_DIR = folderArg ?? join('src', 'content', 'products');
const today = new Date();

interface FileReport {
  file: string;
  errors: string[];
  warnings: string[];
  summary?: string;
}

// Every dated price, certification and COA, for the "stalest items" list at the end.
interface DatedItem {
  file: string;
  what: string;
  kind: DatedKind;
  date: Date;
}
const dated: DatedItem[] = [];

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

const day = (d: Date) => d.toISOString().slice(0, 10);

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
  if (fileName === 'evidence.yaml') {
    errors.push('"evidence" is taken by the evidence page address. Pick another file name.');
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
  const category = categoryOf(product);

  if (parts.length === 2 && parts[0] !== product.category) {
    errors.push(`File is in the "${parts[0]}" folder but says category: ${product.category}.`);
  }

  // --- Impossible values ---
  // Each category knows its own impossible values (see src/categories/).
  errors.push(...category.impossibleValues(product));
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
  // The same store can sell several sizes; only flag the same store AND size twice.
  const listings = product.prices.map((p) => `${p.retailer.toLowerCase()} (${p.servings} servings)`);
  const duplicates = [...new Set(listings.filter((r, i) => listings.indexOf(r) !== i))];
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
      warnings.push(`STALE COA: coas #${i + 1} (lot ${coa.lot}) was tested ${day(coa.test_date)}, over ${settings.coaStaleAfterMonths} months ago.`);
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

  for (const p of product.prices) dated.push({ file, what: `price at ${p.retailer}`, kind: 'price', date: p.date_checked });
  for (const c of product.certifications) dated.push({ file, what: `${c.program} listing`, kind: 'certification', date: c.date_verified });
  for (const c of product.coas) dated.push({ file, what: `COA lot ${c.lot}`, kind: 'coa', date: c.test_date });

  // Values Claude looked up that you haven't checked yet.
  const unverified = (what: string) =>
    warnings.push(`UNVERIFIED: ${what} was entered by Claude. Check it against its source, then delete its entered_by line.`);
  if (product.entered_by) unverified('the product basics and dose (label info)');
  product.prices.forEach((p, i) => p.entered_by && unverified(`prices #${i + 1} (${p.retailer})`));
  product.certifications.forEach((c, i) => c.entered_by && unverified(`certifications #${i + 1} (${c.program})`));
  product.coas.forEach((c, i) => c.entered_by && unverified(`coas #${i + 1} (lot ${c.lot})`));
  for (const kind of ['product', 'label'] as const) {
    const photo = product.photos?.[kind];
    if (photo?.entered_by) unverified(`photos → ${kind}`);
  }
  if (product.other_ingredients.length === 0 && !product.ingredients_confirmed) {
    warnings.push('NOT GRADED: other_ingredients is empty. Once the label confirms there are none, add "ingredients_confirmed: true".');
  }

  // One-line summary of what the site will show.
  const best = bestPrice(product, today);
  const price = best ? `${usd(best.costPerReferenceDose)} ${category.referenceDose.label}` : 'no price';
  const grade = ingredientGrade(product).grade ?? 'not graded';
  report.summary = `Tier ${tierFor(product, today).tier}, ingredients ${grade}, best ${price}`;
  return report;
}

// --- Run it ---
const reports = listFiles(PRODUCTS_DIR).sort().map(checkFile);
// The evidence page is checked only on a normal run, not when pointed at test files.
if (folderArg === undefined) {
  for (const page of evidencePages) {
    reports.push({ file: join('src', 'evidence', `${page.category}.ts`), ...checkEvidence(page) });
  }
  // The ingredient flag rules (a broken file stops the run before this point).
  reports.push({
    file: FLAGS_FILE,
    errors: [],
    warnings: ingredientRules
      .filter((r) => r.entered_by)
      .map((r) => `UNVERIFIED: rule "${r.id}" was written by Claude. Check its finding against its sources, then delete its entered_by line.`),
  });
}
let errorCount = 0;
let warningCount = 0;

// Warnings that wait on River's review rather than needing action now. Brief mode counts these.
const REVIEW_QUEUE = ['UNVERIFIED', 'NOT GRADED', 'DRAFT'];
const queueKind = (w: string) => REVIEW_QUEUE.find((k) => w.startsWith(`${k}:`));
const hiddenCounts = new Map<string, number>();

console.log(`Checking ${reports.length} file(s) in ${PRODUCTS_DIR} (today is ${day(today)})${brief ? ', brief' : ''}\n`);
for (const r of reports) {
  errorCount += r.errors.length;
  warningCount += r.warnings.length;
  let warnings = r.warnings;
  if (brief && !showInFull.some((s) => r.file.includes(s))) {
    warnings = r.warnings.filter((w) => {
      const kind = queueKind(w);
      if (kind) hiddenCounts.set(kind, (hiddenCounts.get(kind) ?? 0) + 1);
      return !kind;
    });
    if (r.errors.length === 0 && warnings.length === 0) continue;
  }
  const mark = r.errors.length ? '✗' : r.warnings.length ? '⚠' : '✓';
  console.log(`${mark} ${r.file}${r.summary && !r.errors.length ? `  (${r.summary})` : ''}`);
  for (const e of r.errors) console.log(`    ✗ ${e}`);
  for (const w of warnings) console.log(`    ⚠ ${w}`);
}
if (hiddenCounts.size) {
  const counts = [...hiddenCounts].map(([kind, n]) => `${n} ${kind}`).join(', ');
  console.log(`\nReview queue, counted but not listed: ${counts}. Run "npm run validate" to list them.`);
}

// The 10 items closest to (or furthest past) their freshness limit, so you know what to re-check first.
const kindLabel: Record<DatedKind, string> = { price: 'checked', certification: 'verified', coa: 'tested' };
const stalest = dated
  .map((d) => ({ ...d, ...freshness(d.kind, d.date, today) }))
  .sort((a, b) => b.used - a.used)
  .slice(0, 10);
if (stalest.length) {
  console.log('\nStalest 10 items (age as a share of its limit in src/settings.ts; over 100% is stale):');
  for (const s of stalest) {
    const pct = `${Math.round(s.used * 100)}%`.padStart(5);
    console.log(`  ${pct}  ${s.file}: ${s.what}, ${kindLabel[s.kind]} ${day(s.date)} (${s.ageDays} of ${s.limitDays} days)`);
  }
}

console.log(`\n${errorCount} error(s), ${warningCount} warning(s).`);
if (errorCount > 0) {
  console.log('Fix the errors (✗) above before publishing.');
  process.exit(1);
}
console.log(warningCount > 0 ? 'No errors. Look over the warnings (⚠) before publishing.' : 'All good.');
