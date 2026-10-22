// Every category's evidence page text. Add a category's file here once it exists.
import type { EvidencePage } from './types';
import { isApproved } from './markdown';
import { creatineEvidence } from './creatine';
import { ashwagandhaEvidence } from './ashwagandha';
import { vitaminDEvidence } from './vitamin-d';
import { magnesiumEvidence } from './magnesium';
import { fishOilEvidence } from './fish-oil';
import { proteinPowderEvidence } from './protein-powder';
import { multivitaminEvidence } from './multivitamin';

export const evidencePages: EvidencePage[] = [creatineEvidence, ashwagandhaEvidence, vitaminDEvidence, magnesiumEvidence, fishOilEvidence, proteinPowderEvidence, multivitaminEvidence];

// Only pages River has fully reviewed (every section reviewed: true) go on the site.
// Until then the text lives in drafts/evidence/<category>.md for review.
export const publishedEvidence = evidencePages.filter(isApproved);

/** The category's evidence page, if it's approved for the site. */
export function evidenceFor(categoryId: string): EvidencePage | undefined {
  return publishedEvidence.find((p) => p.category === categoryId);
}
