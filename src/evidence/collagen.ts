// Collagen evidence page: every sentence and citation for /collagen/evidence/.
//
// HOW THIS WAS DRAFTED (2026-11-05): Claude summarized only text read word for word
// from two abstracts on Europe PMC (PubMed showed a reCAPTCHA): a 2026 umbrella review
// and a 2024 osteoarthritis meta-analysis. No NIH fact sheet on collagen was found.
// Nothing is from memory. Strength groupings are Claude's suggestion. Every section is
// reviewed: false, so the page stays off the site until River approves it (edit here,
// then run `npm run evidence-drafts`).
import type { EvidencePage } from './types';

export const collagenEvidence: EvidencePage = {
  category: 'collagen',
  title: 'What the research says about collagen supplements',
  description:
    'What collagen peptide supplements do and don’t do according to recent reviews of clinical trials, with every point linked to its source.',
  lede: 'Each point below summarizes specific sources, linked by number to the reference list at the bottom. Only abstracts have been read so far, and we say where the research is thin or mixed.',

  sections: [
    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
      intro: 'Grouped by how much research backs each outcome. Both sources are reviews that pool many smaller trials.',
      items: [
        {
          title: 'Osteoarthritis pain and function',
          strength: 'moderate',
          text: 'A 2024 meta-analysis of randomized trials (25 trials and 2,856 patients in its main analysis) found collagen derivatives had small-to-moderate effects on osteoarthritis pain (rated moderate certainty) and function (rated high certainty) compared with control. Its abstract groups all “collagen derivatives” together, which may include undenatured type II collagen, a different product not compared on this site. A 2026 umbrella review of 16 systematic reviews also found favorable results for osteoarthritis.',
          cites: ['liang2024', 'ravindran2026'],
          facts: [
            { label: 'Pain', value: 'SMD −0.35 (−0.48 to −0.22)' },
            { label: 'Function', value: 'SMD −0.31 (−0.41 to −0.22)' },
          ],
        },
        {
          title: 'Skin elasticity and hydration',
          strength: 'limited',
          text: 'A 2026 umbrella review of 16 systematic reviews (113 randomized trials, 7,983 people) reported that collagen was consistently associated with favorable skin outcomes. Grouped as limited until the full paper’s certainty ratings have been read.',
          cites: ['ravindran2026'],
        },
        {
          title: 'Bone and muscle',
          strength: 'limited',
          text: 'The same umbrella review concluded collagen showed benefits for bone and muscle health. The abstract doesn’t give how certain those results are.',
          cites: ['ravindran2026'],
        },
        {
          title: 'Oral health and cardiometabolic outcomes',
          strength: 'limited',
          text: 'The umbrella review describes the results for oral health and cardiometabolic outcomes as mixed.',
          cites: ['ravindran2026'],
        },
      ],
      todo: [
        'Read the umbrella review’s full text (open access, PMC12968778): GRADE ratings per outcome, doses, and which reviews it pooled.',
        'Exercise recovery, soreness and tendon properties: the university press release says the review found no meaningful improvement, but the abstract read doesn’t say so. Confirm in the full text before adding.',
        'Osteoarthritis meta-analysis (not open access): check which collagen products it pooled, and whether peptides alone show the same effect.',
        'Look for an NIH or other .gov page on collagen supplements.',
        'Confirm or change each strength grouping.',
      ],
    },

    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Side effects in trials',
          text: 'The 2024 osteoarthritis meta-analysis found collagen derivatives did not increase withdrawals or adverse events compared with control.',
          cites: ['liang2024'],
        },
      ],
      todo: [
        'Allergens: marine collagen is made from fish and some multi-source products include egg. Find a source to cite, or point readers to each product’s label flags.',
        'Pregnancy, breastfeeding, medicine interactions: none found in the sources read. Source before adding anything.',
      ],
    },
  ],

  citations: {
    ravindran2026: {
      authors: 'Ravindran R, Pizzol D, López-Gil JF, et al.',
      title:
        'Collagen Supplementation for Skin and Musculoskeletal Health: An Umbrella Review of Meta-Analyses on Elasticity, Hydration, and Structural Outcomes.',
      journal: 'Aesthet Surg J Open Forum 8:ojag018',
      year: 2026,
      pmid: '41809116',
      doi: '10.1093/asjof/ojag018',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1093/asjof/ojag018&resultType=core&format=json',
      read: 'abstract',
      design: 'meta_analysis',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
    liang2024: {
      authors: 'Liang CW, Cheng HY, Lee YH, Liao CD, Huang SW.',
      title: 'Efficacy and safety of collagen derivatives for osteoarthritis: A trial sequential meta-analysis.',
      journal: 'Osteoarthritis Cartilage 32(5):574–584',
      year: 2024,
      pmid: '38218227',
      doi: '10.1016/j.joca.2023.12.010',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:38218227&resultType=core&format=json',
      read: 'abstract',
      design: 'meta_analysis',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
  },
};
