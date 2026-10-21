import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkEvidence } from '../src/evidence/check';
import { creatineEvidence } from '../src/evidence/creatine';
import type { EvidencePage } from '../src/evidence/types';

const cite = { authors: 'A', title: 'T', journal: 'J', year: 2020, pmid: '1', source_url: 'https://x.test', read: 'abstract' as const, date_checked: '2026-10-20', design: 'rct' as const };

test('the creatine evidence page has no broken references', () => {
  assert.deepEqual(checkEvidence(creatineEvidence).errors, []);
});

test('catches a missing source, an unknown citation, and a citation with no PMID or DOI', () => {
  const page: EvidencePage = {
    category: 'creatine', title: 't', description: 'd', lede: 'l',
    sections: [{ id: 's', heading: 'S', reviewed: true, items: [
      { title: 'No source', text: '.', cites: [] },
      { title: 'Typo', text: '.', cites: ['nope'] },
      { title: 'Ok', text: '.', cites: ['bare'] },
    ] }],
    citations: { bare: { ...cite, pmid: undefined } },
  };
  const { errors } = checkEvidence(page);
  assert.equal(errors.length, 3);
});

test('warns about draft sections and Claude-entered citations', () => {
  const page: EvidencePage = {
    category: 'creatine', title: 't', description: 'd', lede: 'l',
    sections: [{ id: 's', heading: 'S', reviewed: false, items: [{ title: 'Ok', text: '.', cites: ['c'] }] }],
    citations: { c: { ...cite, entered_by: 'claude' } },
  };
  const { errors, warnings } = checkEvidence(page);
  assert.deepEqual(errors, []);
  assert.ok(warnings.some((w) => w.startsWith('DRAFT')));
  assert.ok(warnings.some((w) => w.startsWith('UNVERIFIED')));
});

test('the evidence drafts in drafts/evidence/ are up to date (run npm run evidence-drafts if not)', async () => {
  const { readFileSync } = await import('node:fs');
  const { evidencePages } = await import('../src/evidence');
  const { evidenceMarkdown } = await import('../src/evidence/markdown');
  for (const page of evidencePages) {
    assert.equal(readFileSync(`drafts/evidence/${page.category}.md`, 'utf8'), evidenceMarkdown(page), page.category);
  }
});

test('unreviewed evidence pages stay off the site', async () => {
  const { publishedEvidence, evidencePages } = await import('../src/evidence');
  for (const page of evidencePages) {
    assert.equal(publishedEvidence.includes(page), page.sections.every((s) => s.reviewed), page.category);
  }
});
