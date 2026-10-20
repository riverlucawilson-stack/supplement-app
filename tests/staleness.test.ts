import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isCertificationCurrent, isCoaStale, isPriceStale } from '../src/lib/staleness';

const d = (s: string) => new Date(s);
const TODAY = d('2026-10-20');

test('price: 14 days old is fine, 15 days old is stale', () => {
  assert.equal(isPriceStale(d('2026-10-06'), TODAY), false);
  assert.equal(isPriceStale(d('2026-10-05'), TODAY), true);
  assert.equal(isPriceStale(d('2026-10-20'), TODAY), false);
});

test('COA: exactly 2 years old is fine, one day more is stale', () => {
  assert.equal(isCoaStale(d('2024-10-20'), TODAY), false);
  assert.equal(isCoaStale(d('2024-10-19'), TODAY), true);
});

test('certification: current within 12 months of verifying', () => {
  assert.equal(isCertificationCurrent(d('2025-10-20'), TODAY), true);
  assert.equal(isCertificationCurrent(d('2025-10-19'), TODAY), false);
});

test('month math handles short months (Feb 29 + 2 years)', () => {
  // 2024-02-29 + 24 months = 2026-02-28
  assert.equal(isCoaStale(d('2024-02-29'), d('2026-02-28')), false);
  assert.equal(isCoaStale(d('2024-02-29'), d('2026-03-01')), true);
});
