// Reads ingredients/flags.yaml: the added ingredients with negative data, each
// with its level and sources. The grade itself is worked out in src/lib/ingredients.ts.
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { z } from 'astro/zod';

export const FLAGS_FILE = 'ingredients/flags.yaml';

const sourceSchema = z.strictObject({
  title: z.string().min(1),
  publisher: z.string().min(1),
  url: z.url(),
  doi: z.string().optional(),
  pmid: z.string().optional(),
  published: z.coerce.date().optional(),
  date_checked: z.coerce.date(),
});

const levels = ['concern', 'caution', 'limited', 'note'] as const;
export type FlagLevel = (typeof levels)[number];

export const levelLabels: Record<FlagLevel, string> = {
  concern: 'Regulator has acted',
  caution: 'Official advice to limit',
  limited: 'Some studies report harm',
  note: 'Good to know',
};

const ruleSchema = z.strictObject({
  id: z.string().regex(/^[a-z0-9_]+$/),
  name: z.string().min(1),
  level: z.enum(levels),
  patterns: z.array(z.string().min(1)).min(1),
  exclude: z.array(z.string().min(1)).default([]),
  finding: z.string().min(1),
  sources: z.array(sourceSchema).min(1, 'every rule needs at least one source'),
  entered_by: z.literal('claude').optional(),
});

export type IngredientRule = Omit<z.infer<typeof ruleSchema>, 'patterns' | 'exclude'> & {
  patterns: RegExp[];
  exclude: RegExp[];
};

export function loadIngredientRules(file = FLAGS_FILE): IngredientRule[] {
  const result = z.array(ruleSchema).safeParse(parse(readFileSync(file, 'utf8')));
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  ${i.path.join(' → ') || '(whole file)'}: ${i.message}`);
    throw new Error(`${file} has a mistake:\n${issues.join('\n')}`);
  }
  const ids = new Set<string>();
  return result.data.map((r) => {
    if (ids.has(r.id)) throw new Error(`${file}: the id "${r.id}" is used twice`);
    ids.add(r.id);
    const compile = (p: string) => {
      try {
        return new RegExp(p, 'i');
      } catch {
        throw new Error(`${file}: rule "${r.id}" has a pattern that isn't valid: ${p}`);
      }
    };
    return { ...r, patterns: r.patterns.map(compile), exclude: r.exclude.map(compile) };
  });
}

export const ingredientRules = loadIngredientRules();
