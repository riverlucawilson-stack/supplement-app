// Vitamin C evidence draft. Not on the site: it's built only once every
// section has reviewed: true. Read it in drafts/evidence/vitamin-c.md (npm run evidence-drafts).
//
// HOW THIS WAS DRAFTED: Claude summarized only what the two listed sources say
// (the NIH consumer fact sheet and the 2013 Cochrane review's abstract). Nothing
// is from memory. The Cochrane abstract that could be opened was the Spanish
// translation on the first author's university page, so the numbers below were
// read from it and the wording was translated: check them against the English abstract.
//
// TO REVIEW A SECTION: read each item against its source, rewrite it in your own
// words, then set reviewed: true. TO VERIFY A CITATION: check it on PubMed, then
// delete entered_by.
import type { EvidencePage } from './types';

export const vitaminCEvidence: EvidencePage = {
  category: 'vitamin-c',
  title: 'What the research says about vitamin C supplements',
  description:
    'What vitamin C supplements do and don’t do according to randomized trials and their meta-analyses, with every point linked to its source.',
  lede: 'Each point below summarizes specific sources, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'how-it-works',
      heading: 'What vitamin C is',
      reviewed: false,
      items: [
        {
          title: 'Forms of vitamin C',
          text: 'The NIH fact sheet says vitamin C in supplements is usually ascorbic acid, and some products use sodium ascorbate, calcium ascorbate, other mineral ascorbates, or ascorbic acid with bioflavonoids. It says research has not shown that any form is better than the others.',
          cites: ['ods2021'],
        },
      ],
      todo: [
        'Explain what vitamin C does in the body (the fact sheet mentions collagen, iron absorption from plant foods, and antioxidant activity), in your own words.',
        'Liposomal vitamin C: find a source before saying anything about it.',
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
          title: 'Catching colds: no effect for most people',
          strength: 'not_supported',
          text: 'In a Cochrane review, taking vitamin C every day did not reduce how often people in the general community caught colds (risk ratio 0.97, 95% CI 0.94 to 1.00, 10,708 participants). The NIH fact sheet says the same for most people.',
          cites: ['hemila2013', 'ods2021'],
        },
        {
          title: 'Colds under heavy physical stress',
          strength: 'limited',
          text: 'In five trials with 598 marathon runners, skiers and soldiers in subarctic exercises, daily vitamin C roughly halved the risk of a cold (risk ratio 0.48, 95% CI 0.35 to 0.64).',
          cites: ['hemila2013'],
        },
        {
          title: 'How long colds last, if taken every day',
          strength: 'moderate',
          text: 'People who took vitamin C regularly had slightly shorter colds: 8% shorter in adults (3% to 12%) and 14% shorter in children (7% to 21%), across 31 comparisons and 9,745 cold episodes. Starting vitamin C after symptoms began showed no consistent effect in 7 comparisons.',
          cites: ['hemila2013', 'ods2021'],
          facts: [
            { label: 'Adults', value: '8% shorter (95% CI 3% to 12%)' },
            { label: 'Children', value: '14% shorter (95% CI 7% to 21%)' },
          ],
        },
        {
          title: 'Cancer and heart disease',
          strength: 'not_supported',
          text: 'The NIH fact sheet says vitamin C supplements, with or without other antioxidants, don’t seem to protect people from getting cancer, and that scientists aren’t sure whether vitamin C helps protect against cardiovascular disease.',
          cites: ['ods2021'],
        },
      ],
      todo: [
        'Cancer and heart disease: cite a meta-analysis of randomized trials rather than the consumer fact sheet alone.',
        'The strength groupings are Claude’s suggestion; the abstract read gives no certainty ratings.',
      ],
    },
    {
      id: 'dosing',
      heading: 'How much vitamin C',
      reviewed: false,
      items: [
        {
          title: 'Recommended intake',
          text: 'The NIH fact sheet lists a Recommended Dietary Allowance of 90 mg a day for adult men and 75 mg for adult women, from all sources. People who smoke need 35 mg more a day.',
          cites: ['ods2021'],
          facts: [
            { label: 'Adult men', value: '90 mg/day' },
            { label: 'Adult women', value: '75 mg/day' },
            { label: 'Smokers', value: 'add 35 mg/day' },
          ],
        },
        {
          title: 'Upper limit',
          text: 'The upper limit for adults is 2,000 mg a day from food, drinks and supplements combined.',
          cites: ['ods2021'],
        },
      ],
      todo: [],
    },
    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Too much',
          text: 'According to the NIH fact sheet, too much vitamin C can cause diarrhea, nausea and stomach cramps. In people with hemochromatosis, high doses could worsen iron overload.',
          cites: ['ods2021'],
        },
        {
          title: 'Medicines',
          text: 'The fact sheet says vitamin C supplements might interact with chemotherapy and radiation therapy, and that in one study vitamin C with other antioxidants reduced the heart-protective effects of a statin taken with niacin.',
          cites: ['ods2021'],
        },
      ],
      todo: ['Kidney stones: find a source before mentioning them (the consumer fact sheet read here does not).'],
    },
  ],

  citations: {
    hemila2013: {
      authors: 'Hemilä H, Chalker E.',
      title: 'Vitamin C for preventing and treating the common cold.',
      journal: 'Cochrane Database of Systematic Reviews 2013(1):CD000980',
      year: 2013,
      doi: '10.1002/14651858.CD000980.pub4',
      source_url: 'https://www.mv.helsinki.fi/home/hemila/CD000980_es_abstract.pdf',
      read: 'abstract', // Spanish translation of the abstract; check the English one
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
    ods2021: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Vitamin C Fact Sheet for Consumers (updated March 22, 2021).',
      journal: 'ods.od.nih.gov',
      year: 2021,
      source_url: 'https://ods.od.nih.gov/factsheets/VitaminC-Consumer/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
  },
};
