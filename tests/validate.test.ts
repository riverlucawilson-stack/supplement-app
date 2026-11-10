// Runs the real validation script on the sample products and on the
// deliberately broken files in tests/fixtures, and checks what it says.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

function validate(...args: string[]) {
  const r = spawnSync('npx', ['tsx', 'scripts/validate.ts', ...args], { encoding: 'utf8' });
  return { code: r.status, out: r.stdout + r.stderr };
}

test('sample products pass (warnings only)', () => {
  const { code, out } = validate();
  assert.equal(code, 0, out);
  assert.match(out, /0 error\(s\)/);
});

test('broken files are rejected with clear messages', () => {
  const { code, out } = validate('tests/fixtures/products');
  assert.equal(code, 1);
  for (const expected of [
    'creatine per serving (5 g) is more than the whole serving (3 g)',
    'is in the future',
    'Unknown field "raw_materal"',
    'Unknown field "creatine_per_servng_g" in dose',
    'dose → creatine_per_serving_g: missing',
    'form: Invalid option',
    'File name must be lowercase',
    'Rename it to ".yaml"',
    "isn't valid YAML",
    'is in the "fish-oil" folder but says category: creatine',
    'STALE PRICE',
    'STALE COA',
    'OLD CERTIFICATION CHECK',
    'which is unusual',
    'listed more than once',
    'Stalest 10 items',
    'UNVERIFIED: prices #2 (Sample Store 1) was entered by Claude',
  ]) {
    assert.ok(out.includes(expected), `expected output to mention: ${expected}\n\n${out}`);
  }
});

test('brief mode fails the same way but only counts review-queue warnings', () => {
  const full = validate('tests/fixtures/products');
  const { code, out } = validate('tests/fixtures/products', '--brief');
  assert.equal(code, 1);
  // Same totals and the same errors and action-now warnings as the full run.
  assert.equal(out.match(/\d+ error\(s\), \d+ warning\(s\)/)?.[0], full.out.match(/\d+ error\(s\), \d+ warning\(s\)/)?.[0]);
  for (const expected of ['is in the future', 'form: Invalid option', 'STALE PRICE', 'STALE COA', 'listed more than once']) {
    assert.ok(out.includes(expected), `expected brief output to mention: ${expected}\n\n${out}`);
  }
  // UNVERIFIED lines are counted, not listed.
  assert.ok(!out.includes('UNVERIFIED: prices #2 (Sample Store 1)'), out);
  assert.match(out, /Review queue, counted but not listed: .*\d+ UNVERIFIED/);
  // --show lists matching files in full again.
  const shown = validate('tests/fixtures/products', '--brief', '--show=creatine/');
  assert.ok(shown.out.includes('UNVERIFIED: prices #2 (Sample Store 1)'), shown.out);
});
