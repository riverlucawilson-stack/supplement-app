// Writes every product's calculated numbers to tests/fixtures/before-migration.json.
// Made once, before moving categories to YAML (Stage B), so a test can prove the
// migration didn't change a single price or tier. Run it with:  npx tsx scripts/snapshot.ts
import { writeFileSync } from 'node:fs';
import { snapshotAll } from '../tests/snapshot-helpers';

writeFileSync('tests/fixtures/before-migration.json', JSON.stringify(snapshotAll(), null, 2) + '\n');
console.log('Wrote tests/fixtures/before-migration.json');
