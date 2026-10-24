// Turns an evidence page into the review draft at drafts/evidence/<category>.md,
// with every point filed under River's evidence levels (best study it cites).
// The draft is made from src/evidence/<category>.ts by `npm run evidence-drafts`;
// edit the .ts file, not the .md.
import { designLabels, designLevel, strengthLabels, type EvidencePage, type Item } from './types';

const levelHeadings = {
  1: 'Level 1: human meta-analyses and RCTs',
  2: 'Level 2: observational studies',
  3: 'Level 3: mechanistic and animal studies',
  none: 'Outside the three levels: reviews, position stands, case reports, or design unclear',
} as const;

export function isApproved(page: EvidencePage): boolean {
  return page.sections.every((s) => s.reviewed);
}

export function evidenceMarkdown(page: EvidencePage): string {
  const order: string[] = [];
  for (const s of page.sections) for (const i of s.items) for (const c of i.cites) if (!order.includes(c)) order.push(c);
  const ref = (id: string) => order.indexOf(id) + 1;
  const levelOf = (id: string) => (page.citations[id] ? designLevel[page.citations[id].design] : undefined);
  const bestLevel = (item: Item) => {
    const levels = item.cites.map(levelOf).filter((l): l is 1 | 2 | 3 => l !== undefined);
    return levels.length ? Math.min(...levels) : undefined;
  };

  const out: string[] = [
    `# ${page.title}`,
    '',
    '**NEEDS RIVER REVIEW.** This draft is not on the published site.',
    '',
    `Drafted by Claude from the papers listed, nothing from memory. Each point is filed under the best level of`,
    `evidence among the studies it cites. Study designs were read from paper titles, so check them too.`,
    `Generated from \`src/evidence/${page.category}.ts\`: make edits there, then run \`npm run evidence-drafts\`.`,
    `The page goes live only once every section in that file has \`reviewed: true\`.`,
    '',
    `Sections reviewed: ${page.sections.filter((s) => s.reviewed).length} of ${page.sections.length}.`,
  ];

  for (const level of [1, 2, 3, undefined] as const) {
    out.push('', `## ${levelHeadings[level ?? 'none']}`, '');
    let any = false;
    for (const s of page.sections) {
      for (const item of s.items.filter((i) => bestLevel(i) === level)) {
        any = true;
        const tags = [`section: ${s.heading}`, s.reviewed ? 'reviewed' : 'not reviewed'];
        if (item.strength) tags.push(strengthLabels[item.strength].toLowerCase());
        out.push(`### ${item.title}`, '', `_${tags.join(' · ')}_`, '', item.text);
        for (const f of item.facts ?? []) out.push(`- ${f.label}: ${f.value}`);
        out.push('', `Sources: ${item.cites.map((c) => `[${ref(c)}]`).join(' ')}`, '');
      }
    }
    if (!any) out.push('_Nothing here yet._', '');
  }

  const todos = page.sections.flatMap((s) => (s.reviewed ? [] : (s.todo ?? []).map((t) => `- ${s.heading}: ${t}`)));
  if (todos.length) out.push('## Still to write', '', ...todos, '');

  out.push('## References', '');
  for (const id of order) {
    const c = page.citations[id];
    if (!c) continue;
    const link = c.pmid ? `PMID ${c.pmid}` : c.doi ? `doi:${c.doi}` : c.design === 'government' ? 'official page' : 'no PMID or DOI';
    const flags = [designLabels[c.design], c.read === 'abstract' ? 'abstract read' : 'full text read', `checked ${c.date_checked}`];
    if (c.entered_by) flags.push('UNVERIFIED, entered by Claude');
    out.push(`${ref(id)}. ${c.authors}. ${c.title} ${c.journal}. ${c.year}. ${link}. ${c.source_url} (${flags.join('; ')})`);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}
