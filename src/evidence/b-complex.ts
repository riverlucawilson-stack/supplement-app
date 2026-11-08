// B-complex evidence page: every sentence and citation for /b-complex/evidence/.
//
// HOW THIS WAS DRAFTED (2026-11-05): Claude summarized only text read word for word
// on the NIH Office of Dietary Supplements consumer fact sheets for folate (updated
// November 1, 2022) and vitamin B6 (updated June 16, 2023). For vitamin B12, see the
// approved B12 evidence page. Nothing is from memory. Strength groupings are Claude's
// suggestion. Every section is reviewed: false, so the page stays off the site until
// River approves it (edit here, then run `npm run evidence-drafts`).
import type { EvidencePage } from './types';

export const bComplexEvidence: EvidencePage = {
  category: 'b-complex',
  title: 'What the research says about B-complex supplements',
  description:
    'What the B vitamins in B-complex supplements do and don’t do according to NIH fact sheets, including upper limits for folic acid and vitamin B6, with every point linked to its source.',
  lede: 'A B-complex combines several B vitamins, and most research looks at them one at a time. Each point below says which vitamin it’s about and links to its source.',

  sections: [
    {
      id: 'what-it-is',
      heading: 'What’s in a B-complex',
      reviewed: false,
      items: [
        {
          title: 'Folate and folic acid',
          text: 'The NIH fact sheet says the body needs folate to make DNA and for cells to divide. Supplements, including B-complexes, usually contain folic acid, though methylfolate (5-MTHF) is also used. Labels give folate in mcg DFE because the body absorbs more folic acid than food folate: 240 mcg of folic acid equals 400 mcg DFE.',
          cites: ['odsFolate'],
        },
        {
          title: 'Vitamin B6',
          text: 'The NIH fact sheet says the body needs vitamin B6 for more than 100 enzyme reactions in metabolism. In supplements it is usually pyridoxine.',
          cites: ['odsB6'],
        },
      ],
      todo: ['Add thiamin, riboflavin, niacin, biotin and pantothenic acid, each from its NIH fact sheet, or decide to leave them out.'],
    },

    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
      intro: 'Grouped by how much research backs each outcome, as the NIH fact sheets describe it.',
      items: [
        {
          title: 'Neural tube defects (folic acid before and in early pregnancy)',
          strength: 'strong',
          text: 'The NIH fact sheet says taking folic acid before and during early pregnancy helps prevent neural tube defects, and that all women and teen girls who could become pregnant should get 400 mcg of folic acid daily from supplements, fortified foods or both. It specifies folic acid rather than 5-MTHF for this, even for people with the MTHFR C677T gene variant.',
          cites: ['odsFolate'],
          facts: [{ label: 'Amount advised', value: '400 mcg folic acid/day' }],
        },
        {
          title: 'Nausea and vomiting in pregnancy (vitamin B6)',
          strength: 'moderate',
          text: 'The NIH fact sheet says that, based on several studies, the American College of Obstetricians and Gynecologists recommends vitamin B6 supplements under a doctor’s care for nausea and vomiting during pregnancy.',
          cites: ['odsB6'],
        },
        {
          title: 'Stroke (folic acid with other B vitamins)',
          strength: 'limited',
          text: 'The folate fact sheet says some studies have shown that folic acid combined with other B vitamins helps prevent stroke. The B6 fact sheet says B vitamin supplements lower blood homocysteine but do not reduce the risk or severity of heart disease or stroke. The two sheets don’t fully agree.',
          cites: ['odsFolate', 'odsB6'],
        },
        {
          title: 'PMS (vitamin B6)',
          strength: 'limited',
          text: 'The NIH fact sheet says scientists aren’t yet certain, but some studies show vitamin B6 supplements could reduce PMS symptoms.',
          cites: ['odsB6'],
        },
        {
          title: 'Depression (folate)',
          strength: 'limited',
          text: 'The NIH fact sheet says folate supplements, particularly with 5-MTHF, might make antidepressants more effective, but whether they help people with normal folate levels isn’t clear.',
          cites: ['odsFolate'],
        },
        {
          title: 'Heart disease',
          strength: 'not_supported',
          text: 'Both NIH fact sheets say the supplements lower homocysteine but don’t directly reduce the risk of heart disease.',
          cites: ['odsFolate', 'odsB6'],
        },
        {
          title: 'Memory and dementia',
          strength: 'not_supported',
          text: 'The NIH fact sheets say folic acid with or without other B vitamins doesn’t seem to improve cognitive function or prevent dementia, and vitamin B6 (alone or with B12 and/or folic acid) doesn’t seem to improve cognitive function or mood in healthy people or people with dementia.',
          cites: ['odsFolate', 'odsB6'],
        },
        {
          title: 'Cancer prevention (vitamin B6)',
          strength: 'not_supported',
          text: 'The NIH fact sheet says studies have not shown that vitamin B6 supplements help prevent cancer.',
          cites: ['odsB6'],
        },
      ],
      todo: ['Energy: B-complexes are often sold for it. Find a source before saying anything either way.', 'Confirm or change each strength grouping.'],
    },

    {
      id: 'safety',
      heading: 'Safety and upper limits',
      reviewed: false,
      items: [
        {
          title: 'Vitamin B6: nerve damage at high doses',
          text: 'The NIH fact sheet says taking high amounts of vitamin B6 from supplements for a year or longer can cause severe nerve damage, with loss of control of bodily movements, which usually stops when the supplements stop. The US adult upper limit is 100 mg a day from all sources. It notes that in 2023 the European Food Safety Authority set a lower adult limit of 12 mg a day.',
          cites: ['odsB6'],
          facts: [
            { label: 'US adult upper limit', value: '100 mg/day (all sources)' },
            { label: 'EU adult upper limit (2023)', value: '12 mg/day' },
          ],
        },
        {
          title: 'Folic acid: upper limit and hiding B12 deficiency',
          text: 'The NIH fact sheet sets the adult upper limit for folate from supplements and fortified foods at 1,000 mcg a day. It says large amounts might hide a vitamin B12 deficiency by correcting its anemia but not its nerve damage, and high doses might increase the risk of colorectal and possibly other cancers in some people.',
          cites: ['odsFolate'],
          facts: [{ label: 'Adult upper limit', value: '1,000 mcg/day (supplements and fortified foods)' }],
        },
        {
          title: 'Medicine interactions',
          text: 'The NIH fact sheets name interactions between folate and methotrexate, some anti-seizure medicines (phenytoin, carbamazepine, valproate) and sulfasalazine, and between vitamin B6 and cycloserine, some epilepsy drugs and theophylline.',
          cites: ['odsFolate', 'odsB6'],
        },
      ],
      todo: [
        'Decide whether product pages should show each product’s vitamin B6 amount next to the 100 mg upper limit (needs a B6 dose field).',
        'The consumer fact sheet doesn’t say whether the 1,000 mcg folate limit is in mcg of folic acid or mcg DFE (labels use DFE). Confirm on the Health Professional sheet before comparing it with products.',
      ],
    },
  ],

  citations: {
    odsFolate: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Folate: Fact Sheet for Consumers.',
      journal: 'ods.od.nih.gov',
      year: 2022, // page says "Updated: November 1, 2022"
      source_url: 'https://ods.od.nih.gov/factsheets/Folate-Consumer/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
    odsB6: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Vitamin B6: Fact Sheet for Consumers.',
      journal: 'ods.od.nih.gov',
      year: 2023, // page says "Updated: June 16, 2023"
      source_url: 'https://ods.od.nih.gov/factsheets/VitaminB6-Consumer/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
  },
};
