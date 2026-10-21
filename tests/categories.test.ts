import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadCategoryConfigs } from '../src/categories/config';
import { categoryList } from '../src/categories';

test('categories load in their set order, creatine first', () => {
  assert.deepEqual(categoryList.map((c) => c.id).slice(0, 3), ['creatine', 'ashwagandha', 'vitamin-d']);
});

function loadEdited(edit: (yaml: string) => string) {
  const dir = mkdtempSync(join(tmpdir(), 'cat-'));
  writeFileSync(join(dir, 'creatine.yaml'), edit(readFileSync('categories/creatine.yaml', 'utf8')));
  return () => loadCategoryConfigs(dir);
}

test('a counts_toward field that does not exist is rejected', () => {
  assert.throws(loadEdited((y) => y.replace('counts_toward: [creatine_per_serving_g]', 'counts_toward: [creatin]')), /"creatin" isn't in dose_fields/);
});

test('a misspelled part of a category file is rejected', () => {
  assert.throws(loadEdited((y) => y.replace('coa_tests:', 'coa_test:')), /coa_test/);
});

test('a describe placeholder must be a real field', () => {
  assert.throws(loadEdited((y) => y.replace("'{raw_material}'", "'{raw_materal}'")), /\{raw_materal\} isn't a field/);
});
