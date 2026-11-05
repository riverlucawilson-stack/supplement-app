import { test } from 'node:test';
import assert from 'node:assert/strict';
import { groupedIngredients, ingredientGrade, joinSplitIngredients } from '../src/lib/ingredients';
import { makeProduct } from './helpers';

const grade = (other_ingredients: string[], extra: Record<string, unknown> = {}) =>
  ingredientGrade(makeProduct({ other_ingredients, ...extra }));

test('joins ingredients that were split inside parentheses', () => {
  assert.deepEqual(joinSplitIngredients(['softgel (bovine gelatin', 'glycerin', 'water)', 'olive oil']), [
    'softgel (bovine gelatin, glycerin, water)',
    'olive oil',
  ]);
});

test('splits a "less than 2% of:" entry into its own items', () => {
  assert.deepEqual(joinSplitIngredients(['less than 2% of: talc, titanium dioxide, and zinc oxide']), ['talc', 'titanium dioxide', 'zinc oxide']);
});

test('grade A when nothing is flagged', () => {
  assert.equal(grade(['microcrystalline cellulose', 'magnesium stearate']).grade, 'A');
});

test('not graded when the list is empty and unconfirmed; A once confirmed', () => {
  assert.equal(grade([]).grade, undefined);
  assert.equal(grade([], { ingredients_confirmed: true }).grade, 'A');
});

test('the worst flag decides the grade', () => {
  assert.equal(grade(['xylitol']).grade, 'B');
  assert.equal(grade(['xylitol', 'sucralose']).grade, 'C');
  assert.equal(grade(['cane sugar', 'titanium dioxide']).grade, 'D');
  assert.equal(grade(['FD&C Yellow No. 6']).grade, 'D');
});

test('sugar alcohols, polydextrose and juice colors are not counted as added sugars', () => {
  assert.equal(grade(['maltitol syrup']).grade, 'A');
  assert.equal(grade(['polydextrose']).grade, 'A');
  assert.equal(grade(['fruit juice concentrate (for color)']).grade, 'A');
});

test('label flags are checked too', () => {
  assert.equal(grade(['pectin'], { flags: ['added sugar (4 g per serving)'] }).grade, 'C');
});

test('groups ingredients by role', () => {
  const g = groupedIngredients(makeProduct({ other_ingredients: ['sucralose', 'citric acid', 'gelatin'] }));
  assert.deepEqual(g.map((x) => x.id), ['sweeteners', 'shell', 'acids']);
});
