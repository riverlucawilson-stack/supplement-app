import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkEvidence } from '../src/evidence/check';
import { creatineEvidence } from '../src/evidence/creatine';
import type { EvidencePage } from '../src/evidence/types';

const cite = { authors: 'A', title: 'T', journal: 'J', year: 2020, pmid: '1', source_url: 'https://x.test', read: 'abstract' as const, date_checked: '2026-10-20' };

test('the creatine evidence page has no broken references', () => {
  assert.deepEqual(checkEvidence(creatineEvidence).errors, []);
});

test('catches a missing source, an unknown citation, and a citation with no PMID or DOI', () => {
  const page: EvidencePage = {
    category: 'x', title: 't', description: 'd', lede: 'l',
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
    category: 'x', title: 't', description: 'd', lede: 'l',
    sections: [{ id: 's', heading: 'S', reviewed: false, items: [{ title: 'Ok', text: '.', cites: ['c'] }] }],
    citations: { c: { ...cite, entered_by: 'claude' } },
  };
  const { errors, warnings } = checkEvidence(page);
  assert.deepEqual(errors, []);
  assert.ok(warnings.some((w) => w.startsWith('DRAFT')));
  assert.ok(warnings.some((w) => w.startsWith('UNVERIFIED')));
});
