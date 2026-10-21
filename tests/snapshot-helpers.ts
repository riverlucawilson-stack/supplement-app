// Calculates every product's numbers on a fixed date, for the migration check.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { productSchema } from '../src/categories';
import { allPrices, bestPrice } from '../src/lib/pricing';
import { tierFor } from '../src/lib/tier';

// A fixed "today" so stale flags don't change from day to day.
export const SNAPSHOT_DAY = new Date('2026-10-21');
const DIR = join('src', 'content', 'products');
const round = (n: number) => Number(n.toFixed(6));

export function snapshotAll() {
  const out: Record<string, unknown> = {};
  for (const folder of readdirSync(DIR).sort()) {
    for (const file of readdirSync(join(DIR, folder)).sort()) {
      const product = productSchema.parse(parse(readFileSync(join(DIR, folder, file), 'utf8')));
      const best = bestPrice(product, SNAPSHOT_DAY);
      out[`${folder}/${file}`] = {
        tier: tierFor(product, SNAPSHOT_DAY).tier,
        best: best ? { retailer: best.price.retailer, servings: best.price.servings, stale: best.stale } : null,
        prices: allPrices(product, SNAPSHOT_DAY).map((m) => ({
          retailer: m.price.retailer,
          costPerReferenceDose: round(m.costPerReferenceDose),
          costPer30Days: round(m.costPer30Days),
        })),
      };
    }
  }
  return out;
}
