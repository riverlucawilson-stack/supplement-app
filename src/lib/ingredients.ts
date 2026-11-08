// Turns a product's "other ingredients" into something easier to read, and
// grades them against the sourced rules in ingredients/flags.yaml.
//
// The grade is about added (non-active) ingredients only. Like the transparency
// tier, it is shown on its own and never changes the order of the comparison table.
import type { Product } from '../categories';
import { ingredientRules, type IngredientRule, type FlagLevel } from '../ingredients/rules';

// Some lists were split on commas inside parentheses when they were typed in,
// e.g. "softgel (bovine gelatin" + "glycerin" + "water)". This joins those
// pieces back together so each ingredient shows as one item.
// A "less than 2% of: a, b, c" entry is also split into its own items.
export function joinSplitIngredients(list: string[]): string[] {
  const out: string[] = [];
  let open = 0;
  for (const raw of list) {
    const item = raw.trim();
    if (!item) continue;
    if (open > 0 && out.length) out[out.length - 1] += `, ${item}`;
    else out.push(item);
    open += (item.match(/\(/g) ?? []).length - (item.match(/\)/g) ?? []).length;
    if (open < 0) open = 0;
  }
  return out.flatMap((item) => {
    const m = item.match(/^(?:contains )?less than \d+% of:?\s*(.+)$/i);
    if (!m || !m[1].includes(',')) return [item];
    return splitTopLevel(m[1]).map((x) => x.replace(/^and\s+/i, ''));
  });
}

/** Splits on commas that aren't inside parentheses. */
function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of text) {
    if (ch === '(') depth++;
    if (ch === ')') depth = Math.max(0, depth - 1);
    if (ch === ',' && depth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = '';
    } else current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

// What role an ingredient plays, for grouping the list on the product page.
// These are plain descriptions of what the ingredient is, not judgements.
export const groups = [
  { id: 'sugars', label: 'Sugars and syrups', test: /\b(sugar|sucrose|dextrose|fructose|glucose|syrup|cane juice|juice concentrate|date puree|apple puree)\b/i, not: /maltitol|sugar alcohol|color/i },
  { id: 'sweeteners', label: 'Sweeteners', test: /sucralose|acesulfame|aspartame|stevia|steviol|rebaudioside|\breb[ -]?[am]\b|monk fruit|luo han|allulose|erythritol|xylitol|maltitol|isomalt|mannitol|sorbitol|katemfe|thaumat/i },
  { id: 'colors', label: 'Colors', test: /colou?r|carmine|titanium dioxide|yellow \d|red \d|blue \d|\blake\b|caramel|spirulina|phycocyanin|beta-carotene/i },
  { id: 'flavors', label: 'Flavors', test: /flavou?r|cocoa|vanilla|orange oil|lemon oil/i },
  { id: 'shell', label: 'Capsule, softgel or coating', test: /capsule|softgel|soft gel|gelatin|hypromellose|hpmc|(?<!carboxy)methylcellulose|pullulan|coating|carnauba|beeswax|shellac|plantgel/i },
  { id: 'oils', label: 'Oils and carriers', test: /\boil\b|triglyceride|\bmct\b|lecithin|glycerin|glycerol(?! mono)/i },
  { id: 'preservatives', label: 'Preservatives and antioxidants', test: /tocopher|rosemary|ascorbyl palmitate|\bbht\b|sorbate|benzoate|vitamin e/i },
  { id: 'acids', label: 'Acids, salts and pH adjusters', test: /\bacid\b|citrate|\bsalt\b|chloride|phosphate|carbonate/i, not: /amino|ascorbic acid|folic/i },
  { id: 'thickeners', label: 'Gums, thickeners and fibers', test: /pectin|\bgum\b|xanthan|guar|acacia|carrageenan|starch|inulin|fiber|polydextrose|dextrin|maltodextrin|carboxymethylcellulose|cellulose gel/i },
  { id: 'fillers', label: 'Fillers, binders and flow agents', test: /cellulose|silic|stearate|stearic|talc|rice (flour|hull|bran|extract|fiber|concentrate)|flow agent|croscarmellose|crospovidone|povidone|calcium laurate|polyethylene glycol|polysorbate|polyvinyl|monostearate/i },
  { id: 'water', label: 'Water', test: /\bwater\b/i },
] as const;

export type GroupId = (typeof groups)[number]['id'] | 'other';

export interface IngredientItem {
  name: string;
  group: GroupId;
  /** Rules from ingredients/flags.yaml that this ingredient matches. */
  flags: IngredientRule[];
}

function groupOf(name: string): GroupId {
  for (const g of groups) {
    if (g.test.test(name) && !('not' in g && g.not.test(name))) return g.id;
  }
  return 'other';
}

export function rulesMatching(name: string): IngredientRule[] {
  return ingredientRules.filter((r) => r.patterns.some((p) => p.test(name)) && !r.exclude.some((p) => p.test(name)));
}

export function ingredientItems(p: Product): IngredientItem[] {
  return joinSplitIngredients(p.other_ingredients).map((name) => ({ name, group: groupOf(name), flags: rulesMatching(name) }));
}

export function groupedIngredients(p: Product): { id: GroupId; label: string; items: IngredientItem[] }[] {
  const items = ingredientItems(p);
  const all = [...groups.map((g) => ({ id: g.id as GroupId, label: g.label as string })), { id: 'other' as GroupId, label: 'Other' }];
  return all.map((g) => ({ ...g, items: items.filter((i) => i.group === g.id) })).filter((g) => g.items.length > 0);
}

export type IngredientGrade = 'A' | 'B' | 'C' | 'D';

export interface GradeResult {
  /** undefined when the ingredient list hasn't been confirmed yet. */
  grade?: IngredientGrade;
  /** One line on why, e.g. "Contains sucralose (non-sugar sweetener)". */
  reason: string;
  /** Each flagged rule once, with the ingredients that matched it. */
  flagged: { rule: IngredientRule; ingredients: string[] }[];
}

// Most serious level first. "note" is shown but never changes the grade.
export const levelOrder: FlagLevel[] = ['concern', 'caution', 'limited', 'note'];
// River's call (2026-11-08): every flag gives a B, whatever its level. The level still says
// what kind of source backs the flag (a regulator, official advice, or individual studies).
// C and D are kept in the type so the scale can be split again later.
export const gradeForLevel: Record<Exclude<FlagLevel, 'note'>, IngredientGrade> = { concern: 'B', caution: 'B', limited: 'B' };

export function ingredientGrade(p: Product): GradeResult {
  const items = ingredientItems(p);
  const byRule = new Map<string, { rule: IngredientRule; ingredients: string[] }>();
  // The product's label flags (e.g. "added sugar (4 g per serving)") are checked too,
  // since some sweeteners and sugars were recorded there rather than in the list.
  const texts = [...items.map((i) => ({ name: i.name, flags: i.flags })), ...p.flags.map((f) => ({ name: f, flags: rulesMatching(f) }))];
  for (const t of texts) {
    for (const rule of t.flags) {
      const entry = byRule.get(rule.id) ?? { rule, ingredients: [] };
      if (!entry.ingredients.includes(t.name)) entry.ingredients.push(t.name);
      byRule.set(rule.id, entry);
    }
  }
  const flagged = [...byRule.values()].sort((a, b) => levelOrder.indexOf(a.rule.level) - levelOrder.indexOf(b.rule.level));

  if (items.length === 0 && !p.ingredients_confirmed) {
    return { reason: 'Not graded yet: we haven’t confirmed this product’s full ingredient list.', flagged };
  }
  const worst = flagged.map((f) => f.rule.level).find((l) => l !== 'note') as Exclude<FlagLevel, 'note'> | undefined;
  if (!worst) {
    return {
      grade: 'A',
      reason: items.length === 0 ? 'No added ingredients on the label.' : 'None of its added ingredients are on our flag list.',
      flagged,
    };
  }
  const top = flagged.filter((f) => f.rule.level !== 'note').map((f) => f.rule.name.toLowerCase());
  return { grade: gradeForLevel[worst], reason: `Contains ${top.join(', ')}.`, flagged };
}
