import { test } from 'node:test';
import assert from 'node:assert/strict';
import { freshness, isCertificationCurrent, isCoaStale, isPriceStale } from '../src/lib/staleness';
import { settings } from '../src/settings';

const d = (s: string) => new Date(s);
const TODAY = d('2026-10-20');

test('price: 30 days old is fine, 31 days old is stale', () => {
  assert.equal(isPriceStale(d('2026-09-20'), TODAY), false);
  assert.equal(isPriceStale(d('2026-09-19'), TODAY), true);
  assert.equal(isPriceStale(d('2026-10-20'), TODAY), false);
});

test('COA: exactly 12 months old is fine, one day more is stale', () => {
  assert.equal(isCoaStale(d('2025-10-20'), TODAY), false);
  assert.equal(isCoaStale(d('2025-10-19'), TODAY), true);
});

test('certification: current within 12 months of verifying', () => {
  assert.equal(isCertificationCurrent(d('2025-10-20'), TODAY), true);
  assert.equal(isCertificationCurrent(d('2025-10-19'), TODAY), false);
});

test('month math handles short months (Feb 29 + 12 months)', () => {
  // 2024-02-29 + 12 months = 2025-02-28
  assert.equal(isCoaStale(d('2024-02-29'), d('2025-02-28')), false);
  assert.equal(isCoaStale(d('2024-02-29'), d('2025-03-01')), true);
});

test('freshness ranks items by how much of their limit they have used', () => {
  const today = new Date('2026-10-24');
  const price = freshness('price', new Date('2026-10-17'), today);
  assert.equal(price.ageDays, 7);
  assert.equal(price.limitDays, settings.priceStaleAfterDays);
  const coa = freshness('coa', new Date('2026-04-24'), today);
  assert.ok(coa.used > 0.45 && coa.used < 0.55, `COA six months into a ${settings.coaStaleAfterMonths}-month limit, got ${coa.used}`);
});
