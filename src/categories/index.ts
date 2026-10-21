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
  referenceDose: { grams: number; label: string; short: string };
  dailyGrams: number;
  dailyLabel: string;
  plausibleCostPerReferenceDose: { min: number; max: number };
  coaTestLabels: Record<string, string>;
  activeGramsPerServing(p: Product): number;
  describe(p: Product): string;
  impossibleValues(p: Product): string[];
}

export const categoryList = Object.values(categories) as unknown as CategoryInfo[];

export function categoryOf(product: Product): CategoryInfo {
  return categories[product.category] as unknown as CategoryInfo;
}

export function categoryById(id: CategoryId): CategoryInfo {
  return categories[id] as unknown as CategoryInfo;
}
