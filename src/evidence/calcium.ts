// Calcium evidence page: every sentence and citation for /calcium/evidence/.
//
// HOW THIS WAS DRAFTED (2026-11-05): Claude summarized only text read word for word on
// the NIH Office of Dietary Supplements Calcium fact sheet for consumers (updated
// September 14, 2023). Nothing is from memory. Strength groupings are Claude's
// suggestion, following the sheet's own wording. Every section is reviewed: false, so
// the page stays off the site until River approves it (edit here, then run
// `npm run evidence-drafts`).
import type { EvidencePage } from './types';

export const calciumEvidence: EvidencePage = {
  category: 'calcium',
  title: 'What the research says about calcium supplements',
  description:
    'What calcium supplements do and don’t do according to the NIH fact sheet, how carbonate and citrate differ, upper limits, and medicine interactions, with every point linked to its source.',
  lede: 'Each point below summarizes the NIH fact sheet on calcium, linked by number to the reference at the bottom. Where the studies disagree, we say so.',

  sections: [
    {
      id: 'what-it-is',
      heading: 'What calcium is, and the forms in supplements',
      reviewed: false,
      items: [
        {
          title: 'A mineral stored in bones and teeth',
          text: 'The NIH fact sheet says calcium is the most abundant mineral in the body, almost all of it stored in bones and teeth, and the body also needs it for muscles to move and nerves to carry messages. Vitamin D helps the body absorb calcium.',
          cites: ['odsCalcium'],
        },
        {
          title: 'Carbonate and citrate',
          text: 'The NIH fact sheet says the two main forms in supplements are calcium carbonate, absorbed best when taken with food, and calcium citrate, absorbed well with or without food. It says people with low stomach acid, most common in older people, absorb citrate more easily than carbonate.',
          cites: ['odsCalcium'],
        },
        {
          title: '500 mg or less at a time',
          text: 'The NIH fact sheet says calcium is absorbed best in doses of 500 mg or less, so 1,000 mg a day from supplements is better split into two doses. Each product page shows how much calcium one serving holds.',
          cites: ['odsCalcium'],
          facts: [{ label: 'Best absorbed per dose', value: '500 mg or less' }],
        },
      ],
    },

    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
      intro: 'Grouped by how the NIH fact sheet describes each result.',
      items: [
        {
          title: 'Preeclampsia in pregnant women with low calcium intake',
          strength: 'moderate',
          text: 'The NIH fact sheet says calcium supplements might reduce the risk of preeclampsia in some pregnant women who get too little calcium, and many experts recommend them during pregnancy for women with low intakes.',
          cites: ['odsCalcium'],
        },
        {
          title: 'Bone density and fractures in older adults',
          strength: 'limited',
          text: 'The NIH fact sheet says some studies found calcium supplements, with or without vitamin D, increase bone density in older adults and others didn’t, and it’s not clear whether they help prevent fractures. More research is needed.',
          cites: ['odsCalcium'],
        },
        {
          title: 'Colon and rectal cancer',
          strength: 'limited',
          text: 'The NIH fact sheet says some research links high calcium intake from food and supplements to a lower risk of colorectal cancer and other studies don’t, and that for most other cancers calcium doesn’t appear to affect risk.',
          cites: ['odsCalcium'],
        },
        {
          title: 'Metabolic syndrome',
          strength: 'limited',
          text: 'The NIH fact sheet says some research suggests higher calcium intake might lower the risk of metabolic syndrome in women but not men, and more studies are needed.',
          cites: ['odsCalcium'],
        },
        {
          title: 'Weight loss',
          strength: 'not_supported',
          text: 'The NIH fact sheet says research hasn’t clearly shown whether calcium from dairy or supplements helps with weight loss or prevents weight gain.',
          cites: ['odsCalcium'],
        },
        {
          title: 'Heart disease',
          strength: 'not_supported',
          text: 'The NIH fact sheet says experts believe calcium, with or without vitamin D, doesn’t affect the risk of heart disease or of dying from it, though some studies suggest supplements might increase that risk (see Safety).',
          cites: ['odsCalcium'],
        },
      ],
      todo: ['Confirm or change each strength grouping. Preeclampsia rests on "might" plus expert recommendation; moderate is Claude’s suggestion.'],
    },

    {
      id: 'safety',
      heading: 'Safety and upper limits',
      reviewed: false,
      items: [
        {
          title: 'Upper limits',
          text: 'The NIH fact sheet sets the upper limit from all sources (food, drinks and supplements) at 2,500 mg a day for adults 19 to 50 and 2,000 mg a day from age 51.',
          cites: ['odsCalcium'],
          facts: [
            { label: 'Adults 19–50', value: '2,500 mg/day (all sources)' },
            { label: 'Adults 51+', value: '2,000 mg/day (all sources)' },
          ],
        },
        {
          title: 'Possible risks of high intakes',
          text: 'The NIH fact sheet says some research suggests high calcium intakes might increase the risk of heart disease and prostate cancer. It says supplements can cause gas, bloating and constipation in some people, and suggests spreading the dose out, taking it with meals, or switching forms.',
          cites: ['odsCalcium'],
        },
        {
          title: 'Medicine interactions',
          text: 'The NIH fact sheet names interactions with dolutegravir (take it 2 hours before or 6 hours after calcium), levothyroxine (poorly absorbed within 4 hours of calcium carbonate), lithium (risk of high blood calcium), and quinolone antibiotics (poorly absorbed within 2 hours of calcium).',
          cites: ['odsCalcium'],
        },
      ],
      todo: ['Kidney stones: not on the consumer sheet. Check the Health Professional sheet before adding anything.'],
    },
  ],

  citations: {
    odsCalcium: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Calcium: Fact Sheet for Consumers.',
      journal: 'ods.od.nih.gov',
      year: 2023, // page says "Updated: September 14, 2023"
      source_url: 'https://ods.od.nih.gov/factsheets/Calcium-Consumer/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
  },
};
