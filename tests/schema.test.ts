import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeProduct, price } from './helpers';

test('a star rating between 0 and 5 with a review count is accepted', () => {
  const p = makeProduct({ prices: [{ ...price(30, 100), rating: { stars: 4.7, count: 1234 } }] });
  assert.equal(p.prices[0].rating?.stars, 4.7);
});

test('a star rating above 5 is rejected', () => {
  assert.throws(() => makeProduct({ prices: [{ ...price(30, 100), rating: { stars: 47, count: 10 } }] }));
});

test('a rating needs a whole-number review count', () => {
  assert.throws(() => makeProduct({ prices: [{ ...price(30, 100), rating: { stars: 4.5, count: 10.5 } }] }));
});
