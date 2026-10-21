// Every category's evidence page text. Add a category's file here once it exists.
import type { EvidencePage } from './types';
import { creatineEvidence } from './creatine';
import { ashwagandhaEvidence } from './ashwagandha';

export const evidencePages: EvidencePage[] = [creatineEvidence, ashwagandhaEvidence];

export function evidenceFor(categoryId: string): EvidencePage | undefined {
  return evidencePages.find((p) => p.category === categoryId);
}
