// The list of product categories on the site.
// To add a category: create its file next to creatine.ts,
// then add it to the two lists below.
import { z } from 'astro/zod';
import { ashwagandha, ashwagandhaProductSchema } from './ashwagandha';
import { creatine, creatineProductSchema } from './creatine';

export const categories = { creatine, ashwagandha } as const;
export type CategoryId = keyof typeof categories;

// A product file must match one category's shape, picked by its "category" field.
export const productSchema = z.discriminatedUnion('category', [creatineProductSchema, ashwagandhaProductSchema]);
export type Product = z.infer<typeof productSchema>;

// The settings every category provides, written so code can use any category
// without knowing which one it is.
export interface CategoryInfo {
  id: CategoryId;
  name: string;
  /** Where the category's comparison table lives. */
  path: string;
  evidencePath: string;
  /** Where product pages live, e.g. /creatine/ for /creatine/<product>/. Leave out if the category has none yet. */
  productBase?: string;
  referenceDose: { grams: number; label: string; short: string };
  dailyGrams: number;
  dailyLabel: string;
  plausibleCostPerReferenceDose: { min: number; max: number };
  coaTestLabels: Record<string, string>;
  activeGramsPerServing(p: Product): number;
  describe(p: Product): string;
  /** Label facts for the "Dose" box on a product page, e.g. creatine per serving. */
  doseFacts?(p: Product): { label: string; value: string }[];
  impossibleValues(p: Product): string[];
}

export const categoryList = Object.values(categories) as unknown as CategoryInfo[];

export function categoryOf(product: Product): CategoryInfo {
  return categories[product.category] as unknown as CategoryInfo;
}

export function categoryById(id: CategoryId): CategoryInfo {
  return categories[id] as unknown as CategoryInfo;
}

/** The page address for one product, or undefined if its category has no product pages yet. */
export function productPath(entryId: string, product: Product): string | undefined {
  const base = categoryOf(product).productBase;
  return base ? `${base}${productSlug(entryId)}/` : undefined;
}

/** "creatine/thorne-creatine" (the file's id) becomes "thorne-creatine". */
export function productSlug(entryId: string): string {
  return entryId.split('/').pop()!;
}
