// Curcumin evidence page: every sentence and citation for /curcumin/evidence/.
//
// HOW THIS WAS DRAFTED (2026-11-05): Claude summarized only text read word for word on
// the NCCIH turmeric page (last updated April 2025). Nothing is from memory. Strength
// groupings are Claude's suggestion, following the page's own certainty words. Every
// section is reviewed: false, so the page stays off the site until River approves it
// (edit here, then run `npm run evidence-drafts`).
import type { EvidencePage } from './types';

export const curcuminEvidence: EvidencePage = {
  category: 'curcumin',
  title: 'What the research says about curcumin and turmeric supplements',
  description:
    'What turmeric and curcumin supplements do and don’t do according to the NIH’s complementary health center, including liver injury reports with high-absorption products, with every point linked to its source.',
  lede: 'Each point below summarizes the NIH page on turmeric, linked by number to the reference at the bottom. The research so far is early, and the page says so.',

  sections: [
    {
      id: 'what-it-is',
      heading: 'What turmeric and curcumin are',
      reviewed: false,
      items: [
        {
          title: 'A spice, and the compounds in it',
          text: 'The NIH page describes turmeric as a plant in the ginger family whose underground stem is used as a spice. Curcumin gives it its yellow color, and the effects attributed to turmeric are usually credited to curcuminoids, which include curcumin.',
          cites: ['nccih'],
        },
        {
          title: 'Why products are hard to compare',
          text: 'The NIH page says oral curcumin products vary in how much curcumin they actually contain, and often add substances from other plants, such as piperine from black pepper, which is one way to raise how much curcumin the body absorbs. This site compares products by the curcuminoids stated on the label and doesn’t adjust for absorption.',
          cites: ['nccih'],
        },
      ],
    },

    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
      intro:
        'The NIH page says we don’t know enough to conclude definitively that turmeric or curcumin is beneficial for any health purpose. Grouped by how it describes each result.',
      items: [
        {
          title: 'Knee osteoarthritis (taken by mouth)',
          strength: 'limited',
          text: 'The NIH page says several meta-analyses have looked at oral turmeric or curcumin for knee pain, stiffness and joint function, and the initial evidence is positive, but higher-quality evidence is needed for definite conclusions, and more research is needed on how absorption affects the results. It says it’s unclear whether curcumin ointment on the skin helps knee pain.',
          cites: ['nccih'],
        },
        {
          title: 'Nonalcoholic fatty liver disease',
          strength: 'limited',
          text: 'The NIH page says initial research suggests oral turmeric or curcumin might improve some measures of fatty liver disease, but it’s unclear which measures improve consistently.',
          cites: ['nccih'],
        },
        {
          title: 'Mouth sores from cancer treatment',
          strength: 'limited',
          text: 'The NIH page says initial research suggests turmeric or curcumin taken by mouth or as a mouthwash might improve oral mucositis caused by cancer treatment.',
          cites: ['nccih'],
        },
        {
          title: 'Other conditions',
          strength: 'not_supported',
          text: 'The NIH page says there isn’t enough evidence to conclude whether oral turmeric or curcumin helps other health conditions. It lists depression, allergies, itching and high cholesterol among the uses turmeric is promoted for, without a finding for them.',
          cites: ['nccih'],
        },
      ],
      todo: [
        'Add a recent meta-analysis on knee osteoarthritis (read via Europe PMC) if River wants more than the NIH summary.',
        'Confirm or change each strength grouping. "Other conditions" may read better as "not enough evidence" than "not supported".',
      ],
    },

    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Liver injury with high-absorption products',
          text: 'The NIH page says highly bioavailable curcumin formulations may harm the liver, and liver damage has been reported in some people who took them. It says to stop and talk with a health care provider at signs such as fatigue, nausea, poor appetite, dark urine or yellowing skin. Each product on this site shows its formulation.',
          cites: ['nccih'],
        },
        {
          title: 'Ordinary products and side effects',
          text: 'The NIH page says conventionally formulated oral turmeric or curcumin is likely safe in recommended amounts for up to 2 or 3 months, and can cause nausea, vomiting, acid reflux, stomach upset, diarrhea or constipation.',
          cites: ['nccih'],
        },
        {
          title: 'Pregnancy, breastfeeding and medicines',
          text: 'The NIH page says turmeric supplements may be unsafe during pregnancy, little is known about amounts above food levels while breastfeeding, and anyone taking medicine should talk with a health care provider first because some herbs and medicines interact.',
          cites: ['nccih'],
        },
      ],
      todo: [
        'The NIH page doesn’t say whether piperine products count as "highly bioavailable". Don’t label any product as such without a source.',
        'Halegoua-DeMarzio 2023 (Am J Med 136(2):200–206, DILIN liver injury cases) is cited by the NIH page; read it before citing directly.',
      ],
    },
  ],

  citations: {
    nccih: {
      authors: 'National Center for Complementary and Integrative Health (NIH)',
      title: 'Turmeric.',
      journal: 'nccih.nih.gov',
      year: 2025, // page says "Last Updated: April 2025"
      source_url: 'https://www.nccih.nih.gov/health/turmeric',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
  },
};
