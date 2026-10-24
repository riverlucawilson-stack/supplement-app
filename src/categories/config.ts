// Reads the category files in categories/<slug>.yaml and checks they make sense.
// A category file sets everything specific to one category: what it's compared
// on, which dose numbers a product records, its type choices, which
// certifications count and which COA tests are listed. See categories/README.md.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { z } from 'astro/zod';

export const CATEGORIES_DIR = 'categories';

// Units an amount can be written in. Mass units convert to each other;
// IU only compares with IU, since IU per mcg differs by nutrient.
export const massUnits = { g: 1, mg: 1e-3, mcg: 1e-6 } as const;
const amountUnit = z.enum(['g', 'mg', 'mcg', 'IU']);

const doseField = z.strictObject({
  label: z.string().min(1),
  unit: z.union([amountUnit, z.literal('%')]).optional(),
  // Counts like capsules per serving.
  whole_number: z.boolean().optional(),
  optional: z.boolean().optional(),
  // Larger values are reported as errors by the validation script.
  max: z.number().positive().optional(),
  // The error text for max; {value} is replaced with the product's number.
  max_message: z.string().optional(),
});

const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'lowercase letters and numbers joined by dashes');
const key = z.string().regex(/^[a-z0-9_]+$/, 'lowercase letters, numbers and underscores');

export const categoryConfigSchema = z.strictObject({
  slug,
  name: z.string().min(1),
  // draft: built for preview, but left out of the menu, home page and sitemap.
  status: z.enum(['published', 'draft']),
  // Position in the menu and on the home page, lowest first.
  order: z.number().int(),
  page: z.strictObject({
    title: z.string().min(1),
    description: z.string().min(1),
    heading: z.string().min(1),
    // Plain text; wrap words in **double stars** to make them bold.
    intro: z.string().min(1),
  }),
  comparison: z.strictObject({
    amount: z.number().positive(),
    // "serving" compares on cost per label serving (e.g. multivitamins), with no counts_toward.
    unit: z.union([amountUnit, z.literal('serving')]),
    counts_toward: z.array(key).default([]),
    label: z.string().min(1),
    short: z.string().min(1),
    // Leave both out to hide the "cost per 30 days" column.
    daily_amount: z.number().positive().optional(),
    daily_label: z.string().min(1).optional(),
    plausible_cost: z.strictObject({ min: z.number().nonnegative(), max: z.number().positive() }),
  }),
  dose_fields: z.record(key, doseField),
  type: z.strictObject({
    field: key,
    label: z.string().min(1),
    options: z.record(key, z.string().min(1)),
  }),
  extra_fields: z.record(key, z.string().min(1)).default({}),
  describe: z.array(z.string().min(1)).default([]),
  certifications: z.array(z.string().min(1)).min(1),
  coa_tests: z.record(key, z.string().min(1)),
});

export type CategoryConfig = z.infer<typeof categoryConfigSchema>;

/** Placeholders like {creatine_type} in a describe part. */
export function placeholders(template: string): string[] {
  return [...template.matchAll(/\{([a-z0-9_]+)\}/g)].map((m) => m[1]);
}

/** Problems that the shape check alone can't catch, e.g. a counts_toward field that doesn't exist. */
export function configProblems(c: CategoryConfig, fileName: string): string[] {
  const problems: string[] = [];
  if (fileName !== `${c.slug}.yaml`) problems.push(`file name should be ${c.slug}.yaml to match its slug`);
  if (Object.keys(c.type.options).length === 0) problems.push('type.options: list at least one choice');
  if (Object.keys(c.coa_tests).length === 0) problems.push('coa_tests: list at least one test');
  if ((c.comparison.daily_amount === undefined) !== (c.comparison.daily_label === undefined)) {
    problems.push('comparison: give daily_amount and daily_label together, or leave both out');
  }
  if (c.comparison.unit === 'serving') {
    if (c.comparison.amount !== 1) problems.push('comparison: with unit "serving", amount must be 1');
    if (c.comparison.counts_toward.length) problems.push('comparison: with unit "serving", leave counts_toward out');
  } else if (c.comparison.counts_toward.length === 0) {
    problems.push('comparison.counts_toward: list at least one dose field');
  }
  for (const f of c.comparison.counts_toward) {
    const field = c.dose_fields[f];
    if (!field) {
      problems.push(`comparison.counts_toward: "${f}" isn't in dose_fields`);
    } else if (field.unit === undefined || field.unit === '%') {
      problems.push(`comparison.counts_toward: "${f}" needs an amount unit (g, mg, mcg or IU)`);
    } else if ((field.unit === 'IU') !== (c.comparison.unit === 'IU')) {
      problems.push(`comparison.counts_toward: "${f}" is in ${field.unit} but the comparison is in ${c.comparison.unit}`);
    }
  }
  if ('servings_per_container' in c.dose_fields) {
    problems.push('dose_fields: servings_per_container is always included, so leave it out');
  }
  const known = new Set([c.type.field, ...Object.keys(c.extra_fields), ...Object.keys(c.dose_fields)]);
  for (const part of c.describe) {
    for (const p of placeholders(part)) if (!known.has(p)) problems.push(`describe: {${p}} isn't a field of this category`);
  }
  return problems;
}

/** Reads and checks every categories/*.yaml file. Throws with a plain message if one is wrong. */
export function loadCategoryConfigs(dir = CATEGORIES_DIR): CategoryConfig[] {
  const files = readdirSync(dir).filter((f) => f.endsWith('.yaml')).sort();
  const configs = files.map((file) => {
    const where = join(dir, file);
    const result = categoryConfigSchema.safeParse(parse(readFileSync(where, 'utf8')));
    if (!result.success) {
      const issues = result.error.issues.map((i) => `  ${i.path.join(' → ') || '(whole file)'}: ${i.message}`);
      throw new Error(`Category file ${where} has a mistake:\n${issues.join('\n')}`);
    }
    const problems = configProblems(result.data, file);
    if (problems.length) throw new Error(`Category file ${where} has a mistake:\n${problems.map((p) => `  ${p}`).join('\n')}`);
    return result.data;
  });
  return configs.sort((a, b) => a.order - b.order);
}
