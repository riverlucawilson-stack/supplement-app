// Protein powder evidence draft. Not on the site: it's built only once every
// section has reviewed: true. Read it in drafts/evidence/protein-powder.md (npm run evidence-drafts).
//
// HOW THIS WAS DRAFTED: Claude summarized only what the one listed paper's
// abstract says (read on the AUT and McMaster repository pages). Nothing is
// from memory. Heavy-metal testing reports found so far were news coverage,
// not primary data, so they're a to-do.
//
// TO REVIEW A SECTION: read each item against its source, rewrite it in your own
// words, then set reviewed: true. TO VERIFY A CITATION: check it on PubMed, then
// delete entered_by.
import type { EvidencePage } from './types';

export const proteinPowderEvidence: EvidencePage = {
  category: 'protein-powder',
  title: 'What the research says about protein powder',
  description:
    'What protein supplements do and don’t do according to randomized trials and their meta-analyses, with every point linked to its source.',
  lede: 'Each point below summarizes specific sources, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'how-it-works',
      heading: 'Protein powder vs protein from food',
      reviewed: false,
      items: [],
      todo: [
        'Explain that protein powder is a convenient source of dietary protein, with a source.',
        'Protein sources (whey, casein, plant blends): find a meta-analysis comparing them.',
      ],
    },
    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
      intro:
        'Grouped by how much research backs each outcome. A stronger group means more consistent results across more studies, not a bigger effect.',
      items: [
        {
          title: 'Muscle and strength gains with resistance training',
          strength: 'moderate',
          text: 'A meta-analysis of 49 randomized trials (1,863 healthy adults doing resistance training for at least 6 weeks) found protein supplements added small extra gains: 2.49 kg more on a one-rep max, 0.30 kg more fat-free mass, and larger muscle fibers. The extra gain in fat-free mass was smaller in older people and larger in people already trained.',
          cites: ['morton2018'],
          facts: [
            { label: 'One-rep max', value: '+2.49 kg (95% CI 0.64 to 4.33)' },
            { label: 'Fat-free mass', value: '+0.30 kg (95% CI 0.09 to 0.52)' },
          ],
        },
      ],
      todo: [
        'Decide whether to cover older adults, weight loss or satiety, each with a meta-analysis.',
        'The "moderate" grouping is Claude’s suggestion; the abstract gives no certainty rating.',
      ],
    },
    {
      id: 'dosing',
      heading: 'How much protein',
      reviewed: false,
      items: [
        {
          title: 'Benefit levels off around 1.6 g/kg/day',
          text: 'In the same meta-analysis, supplementing beyond a total protein intake of about 1.62 g per kg of body weight per day gave no further gain in fat-free mass. Total intake counts food and powder together.',
          cites: ['morton2018'],
        },
      ],
      todo: ['Add the general adult protein recommendation (RDA) with an official source.'],
    },
    {
      id: 'safety',
      heading: 'Safety and contaminants',
      reviewed: false,
      items: [],
      todo: [
        'Heavy metals (lead, cadmium) in protein powders: cite a primary testing report or peer-reviewed study, not news coverage.',
        'Cover kidney disease and milk/soy allergy, each with a source.',
      ],
    },
  ],

  citations: {
    morton2018: {
      authors: 'Morton RW, et al.',
      title: 'A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults.',
      journal: 'Br J Sports Med 52(6):376-384',
      year: 2018,
      doi: '10.1136/bjsports-2017-097608',
      source_url: 'https://experts.mcmaster.ca/scholarly-works/763612',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
  },
};
