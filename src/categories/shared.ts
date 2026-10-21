// Pieces of the product file that every category shares. src/categories/index.ts
// adds each category's own fields, read from categories/<slug>.yaml.
import { z } from 'astro/zod';

// Dates in the YAML files are written like 2026-10-14.
export const date = z.coerce.date();

// Marks a value Claude looked up rather than you. Delete the line once you've
// checked it against its source; the validation script warns until you do.
export const enteredBy = z.literal('claude').optional();

// The store's own review summary for this listing, read on date_checked.
// Only the average and count, never review text.
export const ratingSchema = z.strictObject({
  stars: z.number().min(0).max(5),
  count: z.number().int().nonnegative(),
  // Where shoppers can read the reviews. Defaults to the price's url.
  url: z.url().optional(),
});

export const priceSchema = z.strictObject({
  retailer: z.string().min(1),
  price_usd: z.number().positive(),
  // Servings in the container THIS retailer sells (may differ from the label).
  servings: z.number().int().positive(),
  url: z.url(),
  date_checked: date,
  rating: ratingSchema.optional(),
  entered_by: enteredBy,
});

// Which programs count is set per category (certifications: in its YAML file).
export function certificationSchema<T extends readonly [string, ...string[]]>(programs: T) {
  return z.strictObject({
  program: z.enum(programs),
  // Link to the product's listing on the certifier's own website.
  listing_url: z.url(),
  date_verified: date,
  entered_by: enteredBy,
  });
}

// A COA schema needs the category's own list of test names,
// so each category calls this with its list.
export function coaSchema<T extends readonly [string, ...string[]]>(testNames: T) {
  return z.strictObject({
    url: z.url(),
    lab: z.string().min(1),
    iso_17025: z.enum(['yes', 'no', 'unknown']),
    lot: z.string().min(1),
    test_date: date,
    scope: z.enum(['finished_product', 'raw_material']),
    tests: z.array(z.enum(testNames)).default([]),
    entered_by: enteredBy,
  });
}

// Fields every product has, whatever its category.
export const baseProductFields = {
  // Covers the basics and dose info (brand, name, ingredients, dose...).
  entered_by: enteredBy,
  brand: z.string().min(1),
  name: z.string().min(1),
  form: z.enum(['powder', 'capsule', 'softgel', 'tablet', 'gummy', 'liquid']),
  other_ingredients: z.array(z.string()).default([]),
  prices: z.array(priceSchema).default([]),
  flags: z.array(z.string()).default([]),
  notes: z.string().default(''),
};

// The parts of a product every category has, as the code sees them after checking.
const baseShape = z.object({
  category: z.string(),
  ...baseProductFields,
  certifications: z.array(certificationSchema(['' as string] as [string])),
  dose: z.object({ servings_per_container: z.number() }).catchall(z.number().optional()),
  coas: z.array(coaSchema(['' as string] as [string])),
});
export type BaseProduct = z.infer<typeof baseShape>;

// How each form is written on the site.
export const formLabels: Record<string, string> = {
  powder: 'Powder',
  capsule: 'Capsules',
  softgel: 'Softgels',
  tablet: 'Tablets',
  gummy: 'Gummies',
  liquid: 'Liquid',
};
