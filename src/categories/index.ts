// The product categories on the site, built from the files in categories/.
// To add a category, add a categories/<slug>.yaml file and a matching
// src/content/products/<slug>/ folder. No code changes are needed.
import { z } from 'astro/zod';
import { loadCategoryConfigs, massUnits, placeholders, type CategoryConfig } from './config';
import { baseProductFields, certificationSchema, coaSchema, type BaseProduct } from './shared';

export type CategoryId = string;

/** A product file after it's been checked. Category-specific fields (like creatine_type) are looked up by name. */
export type Product = BaseProduct & Record<string, unknown>;

// Everything the pages, price math and validation need from one category.
export interface CategoryInfo {
  id: CategoryId;
  name: string;
  published: boolean;
  page: CategoryConfig['page'];
  /** The comparison table, e.g. /creatine/. */
  path: string;
  evidencePath: string;
  /** Product pages live at productBase + file name + /. */
  productBase: string;
  /** What prices are compared on, e.g. 5 g. */
  referenceDose: { amount: number; unit: string; label: string; short: string };
  /** Amount per day for "cost per 30 days"; undefined hides that column. */
  daily?: { amount: number; label: string };
  plausibleCostPerReferenceDose: { min: number; max: number };
  coaTestLabels: Record<string, string>;
  /** Amount of the compared ingredient(s) in one serving, in the comparison's unit. */
  activePerServing(p: Product): number;
  describe(p: Product): string;
  /** Label facts for the "Dose" box on a product page. */
  doseFacts(p: Product): { label: string; value: string }[];
  impossibleValues(p: Product): string[];
}

const formatNumber = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 3 });
const withUnit = (n: number, unit?: string) => (unit ? (unit === '%' ? `${formatNumber(n)}%` : `${formatNumber(n)} ${unit}`) : formatNumber(n));

/** Converts an amount between g, mg and mcg (IU stays IU). */
function convert(amount: number, from: string, to: string): number {
  if (from === to) return amount;
  return (amount * massUnits[from as keyof typeof massUnits]) / massUnits[to as keyof typeof massUnits];
}

function buildSchema(c: CategoryConfig) {
  const dose: Record<string, z.ZodType> = { servings_per_container: z.number().int().positive() };
  for (const [name, f] of Object.entries(c.dose_fields)) {
    let n = f.whole_number ? z.number().int().positive() : z.number().positive();
    if (f.unit === '%') n = n.max(100);
    dose[name] = f.optional ? n.optional() : n;
  }
  const extras = Object.fromEntries(Object.keys(c.extra_fields).map((k) => [k, z.string().optional()]));
  const testNames = Object.keys(c.coa_tests) as [string, ...string[]];
  return z.strictObject({
    category: z.literal(c.slug),
    ...baseProductFields,
    certifications: z.array(certificationSchema(c.certifications as [string, ...string[]])).default([]),
    [c.type.field]: z.enum(Object.keys(c.type.options) as [string, ...string[]]),
    ...extras,
    dose: z.strictObject(dose),
    coas: z.array(coaSchema(testNames)).default([]),
  });
}

function buildInfo(c: CategoryConfig): CategoryInfo {
  const doseOf = (p: Product) => p.dose as Record<string, number | undefined>;
  const valueOf = (p: Product, field: string): string | undefined => {
    if (field === c.type.field) return c.type.options[p[field] as string];
    if (field in c.dose_fields) {
      const n = doseOf(p)[field];
      return n === undefined ? undefined : formatNumber(n);
    }
    const v = p[field];
    return typeof v === 'string' && v !== '' ? v : undefined;
  };
  return {
    id: c.slug,
    name: c.name,
    published: c.status === 'published',
    page: c.page,
    path: `/${c.slug}/`,
    evidencePath: `/${c.slug}/evidence/`,
    productBase: `/${c.slug}/`,
    referenceDose: { amount: c.comparison.amount, unit: c.comparison.unit, label: c.comparison.label, short: c.comparison.short },
    daily: c.comparison.daily_amount !== undefined ? { amount: c.comparison.daily_amount, label: c.comparison.daily_label! } : undefined,
    plausibleCostPerReferenceDose: c.comparison.plausible_cost,
    coaTestLabels: c.coa_tests,
    activePerServing: (p) =>
      c.comparison.counts_toward.reduce(
        (sum, f) => sum + convert(doseOf(p)[f] ?? 0, c.dose_fields[f].unit!, c.comparison.unit),
        0,
      ),
    describe: (p) =>
      c.describe
        .filter((part) => placeholders(part).every((f) => valueOf(p, f) !== undefined))
        .map((part) => part.replace(/\{([a-z0-9_]+)\}/g, (_, f) => valueOf(p, f)!))
        .join(' · '),
    doseFacts: (p) => [
      ...Object.entries(c.dose_fields)
        .filter(([name]) => doseOf(p)[name] !== undefined)
        .map(([name, f]) => ({ label: f.label, value: withUnit(doseOf(p)[name]!, f.unit) })),
      { label: 'Servings per container (label)', value: formatNumber(doseOf(p).servings_per_container!) },
    ],
    impossibleValues: (p) => {
      const errors: string[] = [];
      const dose = doseOf(p);
      for (const [name, f] of Object.entries(c.dose_fields)) {
        const v = dose[name];
        if (v !== undefined && f.max !== undefined && f.unit !== '%' && v > f.max) {
          errors.push((f.max_message ?? `dose: ${name} is {value}, more than the most possible (${f.max}).`).replace('{value}', String(v)));
        }
      }
      // An ingredient measured by weight can't weigh more than the whole serving.
      const size = dose.serving_size_g;
      if (size !== undefined) {
        for (const name of c.comparison.counts_toward) {
          const f = c.dose_fields[name];
          const v = dose[name];
          if (v === undefined || !(f.unit! in massUnits)) continue;
          if (convert(v, f.unit!, 'g') > size) {
            errors.push(`dose: ${f.label.toLowerCase()} (${withUnit(v, f.unit)}) is more than the whole serving (${withUnit(size, 'g')}).`);
          }
        }
      }
      return errors;
    },
  };
}

const configs = loadCategoryConfigs();
const schemas = configs.map(buildSchema);

export const categoryList: CategoryInfo[] = configs.map(buildInfo);
export const categories: Record<CategoryId, CategoryInfo> = Object.fromEntries(categoryList.map((c) => [c.id, c]));

// A product file must match one category's shape, picked by its "category" field.
export const productSchema = z.discriminatedUnion('category', schemas as unknown as [(typeof schemas)[number], ...typeof schemas]) as unknown as z.ZodType<Product>;

export function categoryOf(product: Product): CategoryInfo {
  return categories[product.category];
}

export function categoryById(id: CategoryId): CategoryInfo {
  const c = categories[id];
  if (!c) throw new Error(`No category "${id}". Add categories/${id}.yaml.`);
  return c;
}

/** The page address for one product. */
export function productPath(entryId: string, product: Product): string {
  return `${categoryOf(product).productBase}${productSlug(entryId)}/`;
}

/** "creatine/thorne-creatine" (the file's id) becomes "thorne-creatine". */
export function productSlug(entryId: string): string {
  return entryId.split('/').pop()!;
}
