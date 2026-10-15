// Tells Astro where the product files are and what shape they must have.
// If a file doesn't match, the build stops and names the file and field.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { productSchema } from './categories';

const products = defineCollection({
  // Every .yaml file under src/content/products/, e.g. creatine/sample-brand-a.yaml
  loader: glob({ pattern: '**/*.yaml', base: './src/content/products' }),
  schema: productSchema,
});

export const collections = { products };
