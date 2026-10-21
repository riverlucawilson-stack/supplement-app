import { test } from 'node:test';
import assert from 'node:assert/strict';
import { allPrices, bestPrice, priceMath } from '../src/lib/pricing';
import { TODAY, makeProduct, price } from './helpers';

const close = (actual: number, expected: number) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} ≠ ${expected}`);

test('cost per 5 g when one serving is 5 g of creatine', () => {
  // $30 for 100 servings × 5 g = 500 g creatine → $0.30 per 5 g
  const p = makeProduct({ prices: [price(30, 100)] });
  const m = priceMath(p, p.prices[0], TODAY);
  close(m.activeAmount, 500);
  close(m.costPerReferenceDose, 0.3);
  close(m.costPer30Days!, 9);
});

test('uses actual creatine per serving, not serving size', () => {
  // Gummies: 12 g serving holds only 3 g creatine. $30 for 30 servings = 90 g creatine.
  const p = makeProduct({
    form: 'gummy',
    dose: { serving_size_g: 12, creatine_per_serving_g: 3, servings_per_container: 30 },
    prices: [price(30, 30)],
  });
  const m = priceMath(p, p.prices[0], TODAY);
  close(m.activeAmount, 90);
  close(m.costPerReferenceDose, 30 / 90 * 5);
  close(m.costPer30Days!, 30 / 90 * 150);
});

test("uses the retailer's own container size", () => {
  const p = makeProduct({ prices: [price(35, 100, '2026-10-19', 'Small'), price(60, 200, '2026-10-19', 'Big')] });
  const [cheapest, other] = allPrices(p, TODAY);
  assert.equal(cheapest.price.retailer, 'Big');
  close(cheapest.costPerReferenceDose, 0.3);
  close(other.costPerReferenceDose, 0.35);
});

test('best price skips stale prices when a fresh one exists', () => {
  const p = makeProduct({ prices: [price(10, 100, '2026-01-01', 'Old cheap'), price(30, 100, '2026-10-19', 'Fresh')] });
  const best = bestPrice(p, TODAY)!;
  assert.equal(best.price.retailer, 'Fresh');
  assert.equal(best.stale, false);
});

test('best price falls back to a stale price, marked stale, when all are stale', () => {
  const p = makeProduct({ prices: [price(40, 100, '2026-01-01', 'A'), price(30, 100, '2026-02-01', 'B')] });
  const best = bestPrice(p, TODAY)!;
  assert.equal(best.price.retailer, 'B');
  assert.equal(best.stale, true);
});

test('no prices means no best price', () => {
  assert.equal(bestPrice(makeProduct(), TODAY), undefined);
});
