// The shape of an evidence page. Each category (creatine, later fish oil)
// gets one file in this folder that fills in these fields.
//
// Two review switches, both checked by `npm run validate`:
//   - `reviewed: false` on a section shows a "DRAFT - NEEDS REVIEW" banner on it.
//     Set it to true once you've read the section and agree with every sentence.
//   - `entered_by: 'claude'` on a citation means Claude read the paper's abstract
//     and typed the details. Check them on PubMed, then delete that line.

export type Strength = 'strong' | 'moderate' | 'limited' | 'not_supported';

export const strengthLabels: Record<Strength, string> = {
  strong: 'Strong evidence',
  moderate: 'Moderate evidence',
  limited: 'Limited or early evidence',
  not_supported: 'Not supported',
};

// What kind of study a citation is. River's evidence levels:
//   1 = human meta-analyses and RCTs, 2 = observational studies,
//   3 = mechanistic and animal studies. Reviews, position stands, case reports
//   and studies whose design isn't clear sit outside the three levels.
//   `government` is an official fact sheet (e.g. NIH Office of Dietary Supplements):
//   it has no PMID or DOI, so it must link to a .gov page instead.
export type Design = 'meta_analysis' | 'rct' | 'observational' | 'mechanistic_or_animal' | 'review' | 'case_report' | 'government' | 'unclear';

export const designLevel: Record<Design, 1 | 2 | 3 | undefined> = {
  meta_analysis: 1,
  rct: 1,
  observational: 2,
  mechanistic_or_animal: 3,
  review: undefined,
  case_report: undefined,
  government: undefined,
  unclear: undefined,
};

export const designLabels: Record<Design, string> = {
  meta_analysis: 'Systematic review / meta-analysis',
  rct: 'Randomized controlled trial',
  observational: 'Observational study',
  mechanistic_or_animal: 'Mechanistic or animal study',
  review: 'Review or position stand',
  case_report: 'Case report',
  government: 'Government fact sheet',
  unclear: 'Design not clear from the title (check the paper)',
};

export interface Citation {
  authors: string; // first author, then "et al." if more
  title: string;
  journal: string;
  year: number;
  pmid?: string;
  doi?: string;
  /** The page the details were read from. */
  source_url: string;
  /** What was read: the abstract only, or the full paper. */
  read: 'abstract' | 'full_text';
  date_checked: string; // YYYY-MM-DD
  /** Study design, read from the title. Decides which evidence level its points are filed under. */
  design: Design;
  entered_by?: 'claude';
}

export interface Item {
  title: string;
  text: string;
  /** Ids from the page's `citations` list. Every item needs at least one. */
  cites: string[];
  strength?: Strength;
  /** Short label/value pairs shown as a small table, e.g. dose and duration. */
  facts?: { label: string; value: string }[];
}

export interface Section {
  id: string; // used in the page address, e.g. #dosing
  heading: string;
  reviewed: boolean;
  intro?: string;
  items: Item[];
  /** Things still to write or source before this section is done. Shown only while it's a draft. */
  todo?: string[];
}

export interface EvidencePage {
  category: string;
  title: string;
  description: string;
  lede: string;
  sections: Section[];
  citations: Record<string, Citation>;
}
