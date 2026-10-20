import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tierFor } from '../src/lib/tier';
import { TODAY, cert, coa, makeProduct } from './helpers';

const tier = (o: Record<string, unknown>) => tierFor(makeProduct(o), TODAY);

test('Tier A: current certification + accredited, finished-product, recent COA', () => {
  const r = tier({ certifications: [cert()], coas: [coa()] });
  assert.equal(r.tier, 'A');
  assert.ok(r.checks.every((c) => c.met));
});

test('Tier B: COA lab accreditation unknown', () => {
  const r = tier({ certifications: [cert()], coas: [coa({ iso_17025: 'unknown' })] });
  assert.equal(r.tier, 'B');
  assert.match(r.checks[1].details[0], /accreditation is unconfirmed/);
});

test('Tier B: COA only covers raw material', () => {
  assert.equal(tier({ certifications: [cert()], coas: [coa({ scope: 'raw_material' })] }).tier, 'B');
});

test('Tier B: COA is over 2 years old', () => {
  const r = tier({ certifications: [cert()], coas: [coa({ test_date: '2024-01-01' })] });
  assert.equal(r.tier, 'B');
  assert.match(r.checks[1].details[0], /more than 2 years old/);
});

test('Tier B: good COA but no certification', () => {
  const r = tier({ coas: [coa()] });
  assert.equal(r.tier, 'B');
  assert.deepEqual(r.checks[0].details, ['No certification found.']);
});

test('Tier B: good COA but certification not re-checked in 12 months', () => {
  assert.equal(tier({ certifications: [cert('2025-01-01')], coas: [coa()] }).tier, 'B');
});

test('Tier B: certified but no COA published', () => {
  assert.equal(tier({ certifications: [cert()] }).tier, 'B');
});

test('Tier A when one of several COAs qualifies', () => {
  const r = tier({ certifications: [cert()], coas: [coa({ scope: 'raw_material', lot: 'L0' }), coa()] });
  assert.equal(r.tier, 'A');
  assert.equal(r.checks[1].details.length, 2);
});

test('Tier C: no COA and no certification', () => {
  const r = tier({});
  assert.equal(r.tier, 'C');
  assert.deepEqual(r.checks[1].details, ['No COA found.']);
});
