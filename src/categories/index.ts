// The list of product categories on the site.
// To add fish oil later: create fish-oil.ts next to creatine.ts,
// then add it to the two lists below.
import { z } from 'astro/zod';
import { creatine, creatineProductSchema } from './creatine';

export const categories = { creatine } as const;
export type CategoryId = keyof typeof categories;

// A product file must match one category's shape, picked by its "category" field.
export const productSchema = z.discriminatedUnion('category', [creatineProductSchema]);
export type Product = z.infer<typeof productSchema>;
