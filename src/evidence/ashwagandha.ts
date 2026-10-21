// Ashwagandha evidence page: every sentence and citation shown on /ashwagandha/evidence/.
// Filled in from study abstracts once they've been read. See src/evidence/creatine.ts
// for how review works.
import type { EvidencePage } from './types';

export const ashwagandhaEvidence: EvidencePage = {
  category: 'ashwagandha',
  title: 'What the research says about ashwagandha',
  description: 'What ashwagandha does and doesn’t help with, grouped by strength of evidence, the doses studied, and safety, with every claim linked to its study.',
  lede: 'Each point below summarizes specific studies, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',
  sections: [],
  citations: {},
};
