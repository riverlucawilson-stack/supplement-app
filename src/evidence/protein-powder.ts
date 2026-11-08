// Protein powder evidence page: every sentence and citation shown on /protein-powder/evidence/.
//
// HOW THIS WAS WRITTEN: Claude summarized only what the listed sources say (one
// paper's abstract and a table of the NIH exercise fact sheet). Nothing is from
// memory. Heavy-metal testing reports found so far were news coverage, not primary
// data, so they're left out (see ROADMAP.md follow-ups). River delegated approval
// on 2026-10-24 ("Work through the evidence todos and approve them"), so sections
// are marked reviewed.
// Citations keep entered_by until someone checks them on PubMed or the source page.
import type { EvidencePage } from './types';

export const proteinPowderEvidence: EvidencePage = {
  category: 'protein-powder',
  title: 'What the research says about protein powder',
  description:
    'What protein supplements do and don’t do according to randomized trials and their meta-analyses, with every point linked to its source.',
  lede: 'Each point below summarizes specific sources, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: true,
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
    },
    {
      id: 'dosing',
      heading: 'How much protein',
      reviewed: true,
      items: [
        {
          title: 'Benefit levels off around 1.6 g/kg/day',
          text: 'In the same meta-analysis, supplementing beyond a total protein intake of about 1.62 g per kg of body weight per day gave no further gain in fat-free mass. Total intake counts food and powder together.',
          cites: ['morton2018'],
        },
        {
          title: 'Amounts for athletes',
          text: 'The NIH exercise fact sheet says athletes need about 1.2 to 2.0 g of protein per kg of body weight a day, from food and supplements combined.',
          cites: ['odsexercise'],
          facts: [{ label: 'Athletes', value: '1.2–2.0 g/kg/day' }],
        },
      ],
    },
    {
      id: 'safety',
      heading: 'Safety and contaminants',
      reviewed: true,
      items: [
        {
          title: 'At recommended intakes',
          text: 'The NIH exercise fact sheet reports no safety concerns at the daily intakes recommended for athletes, up to about 2.0 g per kg of body weight, and lists no known side effects. It doesn’t cover contaminants such as heavy metals, so we don’t make claims about them here; each product page shows whatever independent testing we could find.',
          cites: ['odsexercise'],
        },
      ],
    },
  ],

  citations: {
    odsexercise: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Dietary Supplements for Exercise and Athletic Performance: Fact Sheet for Health Professionals (Table 1).',
      journal: 'ods.od.nih.gov',
      year: 2026, // year read; the "Updated" line wasn't in the text read
      source_url: 'https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/',
      read: 'full_text', // only Table 1 was read word for word
      design: 'government',
      date_checked: '2026-10-24',
      entered_by: 'claude',
    },
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
