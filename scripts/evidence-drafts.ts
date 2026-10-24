// Writes drafts/evidence/<category>.md from each src/evidence/<category>.ts.
// Run it with:  npm run evidence-drafts
import { mkdirSync, writeFileSync } from 'node:fs';
import { evidencePages } from '../src/evidence';
import { evidenceMarkdown } from '../src/evidence/markdown';

mkdirSync('drafts/evidence', { recursive: true });
for (const page of evidencePages) {
  writeFileSync(`drafts/evidence/${page.category}.md`, evidenceMarkdown(page));
  console.log(`Wrote drafts/evidence/${page.category}.md`);
}
