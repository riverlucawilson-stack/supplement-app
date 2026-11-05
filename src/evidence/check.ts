// Checks an evidence page for broken references and lists what still needs review.
// Used by `npm run validate`.
import type { EvidencePage } from './types';

export function checkEvidence(page: EvidencePage): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const used = new Set<string>();

  for (const s of page.sections) {
    for (const item of s.items) {
      if (item.cites.length === 0) errors.push(`"${item.title}" (${s.heading}) has no source. Every point needs one.`);
      for (const id of item.cites) {
        used.add(id);
        if (!page.citations[id]) errors.push(`"${item.title}" cites "${id}", which isn't in the citations list.`);
      }
    }
    if (!s.reviewed) {
      const todo = s.todo?.length ? ` (${s.todo.length} to-do item${s.todo.length > 1 ? 's' : ''})` : '';
      warnings.push(`DRAFT: section "${s.heading}" isn't reviewed yet${todo}. Set reviewed: true once you've checked it.`);
    }
  }

  for (const [id, c] of Object.entries(page.citations)) {
    if (c.design === 'government') {
      if (!/^https:\/\/[^/]+\.gov\//.test(c.source_url)) errors.push(`Citation "${id}" is a government fact sheet, so its source_url must be a .gov page.`);
    } else if (!c.pmid && !c.doi) errors.push(`Citation "${id}" needs a PMID or DOI.`);
    if (!used.has(id)) warnings.push(`Citation "${id}" isn't used by any point. Remove it or cite it.`);
    if (c.entered_by) warnings.push(`UNVERIFIED: citation "${id}" was entered by Claude. Check it on PubMed, then delete its entered_by line.`);
  }
  return { errors, warnings };
}
