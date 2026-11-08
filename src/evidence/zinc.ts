// Zinc evidence page: every sentence and citation for /zinc/evidence/.
//
// HOW THIS WAS DRAFTED (2026-11-05): Claude summarized only text read word for word
// on the NIH Office of Dietary Supplements Zinc fact sheet for consumers (updated
// October 4, 2022). Nothing is from memory. Strength groupings are Claude's
// suggestion. Every section is reviewed: false, so the page stays off the site until
// River approves it (edit here, then run `npm run evidence-drafts`).
import type { EvidencePage } from './types';

export const zincEvidence: EvidencePage = {
  category: 'zinc',
  title: 'What the research says about zinc supplements',
  description:
    'What zinc supplements do and don’t do according to the NIH fact sheet, including the adult upper limit, effects on copper, and medicine interactions, with every point linked to its source.',
  lede: 'Each point below summarizes the NIH fact sheet on zinc, linked by number to the reference at the bottom. Where the research is thin, we say so.',

  sections: [
    {
      id: 'what-it-is',
      heading: 'What zinc is',
      reviewed: false,
      items: [
        {
          title: 'A mineral found in cells throughout the body',
          text: 'The NIH fact sheet says the immune system uses zinc to fight off bacteria and viruses, and the body uses it to make DNA and proteins, to grow and develop in pregnancy, infancy, childhood and adolescence, to heal wounds, and for the proper sense of taste.',
          cites: ['odsZinc'],
        },
        {
          title: 'Forms in supplements',
          text: 'The NIH fact sheet says supplements use several forms of zinc, such as zinc sulfate, zinc acetate and zinc gluconate, and that it’s not clear whether one form is better than the others. This site compares the elemental zinc on the Supplement Facts panel, whatever the form.',
          cites: ['odsZinc'],
        },
      ],
      todo: ['Recommended daily amounts by age and sex: the fact sheet has a table. Decide whether to show it.'],
    },

    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
      intro: 'Grouped by how much research backs each outcome, as the NIH fact sheet describes it.',
      items: [
        {
          title: 'Advanced age-related macular degeneration (as part of the AREDS formula)',
          strength: 'moderate',
          text: 'The NIH fact sheet says that in large studies of older people at high risk of advanced AMD, those who took a daily supplement for 5 years had a lower risk of developing it. The supplement combined 80 mg zinc with vitamin E, vitamin C, copper, and either beta-carotene or lutein and zeaxanthin, so the result is for the formula, not zinc alone. It says people who have or are developing AMD should talk with their doctor about AREDS or AREDS2.',
          cites: ['odsZinc'],
          facts: [{ label: 'Zinc in the studied formula', value: '80 mg/day' }],
        },
        {
          title: 'Diarrhea in children who lack zinc',
          strength: 'moderate',
          text: 'The NIH fact sheet says studies show zinc supplements shorten diarrhea in children who are often zinc deficient or malnourished, and that the WHO and UNICEF recommend zinc for 10 to 14 days for children with diarrhea. It says it’s not clear whether zinc helps children who get enough zinc, such as most children in the United States.',
          cites: ['odsZinc'],
          facts: [{ label: 'WHO/UNICEF amount', value: '20 mg/day (10 mg under 6 months), 10–14 days' }],
        },
        {
          title: 'The common cold (lozenges or syrup)',
          strength: 'limited',
          text: 'The NIH fact sheet says some studies suggest zinc lozenges or syrup speed recovery from a cold if started at its beginning, but they don’t seem to affect how severe the symptoms are. It says more study is needed on the best dose, form, and how often and how long to take it.',
          cites: ['odsZinc'],
        },
        {
          title: 'Pneumonia in young children',
          strength: 'limited',
          text: 'The NIH fact sheet says some studies in lower-income countries show zinc supplements lower the risk of pneumonia in young children, but zinc doesn’t seem to speed recovery or reduce deaths from pneumonia.',
          cites: ['odsZinc'],
        },
        {
          title: 'HIV',
          strength: 'limited',
          text: 'The NIH fact sheet says some studies show zinc decreases diarrhea and complications of HIV and others don’t, that zinc does not appear to reduce the risk of death in people with HIV, and that more research is needed.',
          cites: ['odsZinc'],
        },
        {
          title: 'Type 2 diabetes',
          strength: 'limited',
          text: 'The NIH fact sheet says some research shows zinc might help lower blood sugar and cholesterol, but more research is needed before it could be recommended for people with type 2 diabetes.',
          cites: ['odsZinc'],
        },
      ],
      todo: [
        'Zinc nasal sprays and loss of smell: the consumer fact sheet doesn’t mention them. Check the Health Professional sheet or an FDA page before saying anything.',
        'Wound healing: the fact sheet only says the body uses zinc to heal wounds and that deficiency can delay healing in older adults; no supplement research. Left out of this list.',
        'Confirm or change each strength grouping.',
      ],
    },

    {
      id: 'safety',
      heading: 'Safety and upper limits',
      reviewed: false,
      items: [
        {
          title: 'Upper limit',
          text: 'The NIH fact sheet sets the adult upper limit at 40 mg of zinc a day from all sources: foods, beverages, supplements and medicines. It says the limits don’t apply to people taking zinc for medical reasons under a doctor’s care. Some products on this site have more than 40 mg in one serving, before counting food.',
          cites: ['odsZinc'],
          facts: [
            { label: 'Adults', value: '40 mg/day (all sources)' },
            { label: 'Teens 14–18', value: '34 mg/day' },
            { label: 'Children 9–13', value: '23 mg/day' },
          ],
        },
        {
          title: 'Too much zinc, and low copper',
          text: 'The NIH fact sheet says signs of too much zinc include nausea, dizziness, headaches, upset stomach, vomiting and loss of appetite. Taking too much for a long time can lower immunity, HDL cholesterol and copper levels, and very high doses can reduce magnesium absorption. It says using far more zinc-containing denture cream than the label recommends could cause copper deficiency with nerve problems.',
          cites: ['odsZinc'],
        },
        {
          title: 'Medicine interactions',
          text: 'The NIH fact sheet says zinc can interfere with quinolone and tetracycline antibiotics (take the antibiotic at least 2 hours before or 4 to 6 hours after zinc) and with penicillamine (take them at least 1 hour apart), and that thiazide diuretics increase the zinc lost in urine.',
          cites: ['odsZinc'],
        },
      ],
      todo: [
        'Decide whether product pages should show a note when one serving is above the 40 mg adult upper limit (the zinc dose field already exists).',
        'Pregnancy and breastfeeding upper limits: the consumer sheet lists age groups only. Check the Health Professional sheet before adding.',
      ],
    },
  ],

  citations: {
    odsZinc: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Zinc: Fact Sheet for Consumers.',
      journal: 'ods.od.nih.gov',
      year: 2022, // page says "Updated: October 4, 2022"
      source_url: 'https://ods.od.nih.gov/factsheets/Zinc-Consumer/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
  },
};
