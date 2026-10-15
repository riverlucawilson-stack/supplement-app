// Pieces of the product file that every category shares
// (creatine, and later fish oil). Category files build on these.
import { z } from 'astro/zod';

// Dates in the YAML files are written like 2026-10-14.
export const date = z.coerce.date();

export const priceSchema = z.strictObject({
  retailer: z.string().min(1),
  price_usd: z.number().positive(),
  // Servings in the container THIS retailer sells (may differ from the label).
  servings: z.number().int().positive(),
  url: z.url(),
  date_checked: date,
});

export const certificationPrograms = [
  'NSF Certified for Sport',
  'Informed Sport',
  'USP Verified',
  'BSCG',
  'Clean Label Project',
] as const;

export const certificationSchema = z.strictObject({
  program: z.enum(certificationPrograms),
  // Link to the product's listing on the certifier's own website.
  listing_url: z.url(),
  date_verified: date,
});

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
  });
}

// Fields every product has, whatever its category.
export const baseProductFields = {
  brand: z.string().min(1),
  name: z.string().min(1),
  form: z.enum(['powder', 'capsule', 'gummy']),
  other_ingredients: z.array(z.string()).default([]),
  prices: z.array(priceSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
  flags: z.array(z.string()).default([]),
  notes: z.string().default(''),
};
