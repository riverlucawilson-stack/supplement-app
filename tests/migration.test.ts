// Proves the Stage B move to YAML category files changed no numbers:
// every price, 30-day cost, best price and tier must match the snapshot
// taken before the move (tests/fixtures/before-migration.json).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { snapshotAll } from './snapshot-helpers';

test('every product has the same numbers as before the migration', () => {
  const before = JSON.parse(readFileSync('tests/fixtures/before-migration.json', 'utf8'));
  assert.deepEqual(snapshotAll(), before);
});
