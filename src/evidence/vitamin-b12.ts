// Vitamin B12 evidence draft. Not on the site: it's built only once every
// section has reviewed: true. Read it in drafts/evidence/vitamin-b12.md (npm run evidence-drafts).
//
// HOW THIS WAS DRAFTED: Claude summarized only what the two listed sources say
// (the NIH consumer fact sheet and the 2018 Cochrane review's abstract, read on
// cochranelibrary.com). Nothing is from memory.
//
// TO REVIEW A SECTION: read each item against its source, rewrite it in your own
// words, then set reviewed: true. TO VERIFY A CITATION: check it on PubMed, then
// delete entered_by.
import type { EvidencePage } from './types';

export const vitaminB12Evidence: EvidencePage = {
  category: 'vitamin-b12',
  title: 'What the research says about vitamin B12 supplements',
  description:
    'What vitamin B12 supplements do and don’t do according to randomized trials, their meta-analyses and official fact sheets, with every point linked to its source.',
  lede: 'Each point below summarizes specific sources, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'how-it-works',
      heading: 'What vitamin B12 is',
      reviewed: false,
      items: [
        {
          title: 'Forms of B12',
          text: 'The NIH fact sheet says B12 in supplements is usually cyanocobalamin, and other common forms are adenosylcobalamin, methylcobalamin and hydroxocobalamin. It says research has not shown that any form is better than the others.',
          cites: ['ods2021'],
        },
        {
          title: 'High doses and absorption',
          text: 'The fact sheet notes many supplements give far more B12 than the recommended amount, but the body absorbs only a small percentage of it.',
          cites: ['ods2021'],
        },
      ],
      todo: [
        'Explain what B12 does (the fact sheet mentions blood and nerve cells, DNA, and preventing megaloblastic anemia), in your own words.',
        'Sublingual vs swallowed: find a source before comparing them (the fact sheet read here doesn’t).',
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
          title: 'Oral B12 vs injections for people with a deficiency',
          strength: 'limited',
          text: 'A Cochrane review found 3 randomized trials (153 people) comparing B12 by mouth with injections for 3 to 4 months. At 1,000 mcg a day, oral B12 raised blood levels about as well as injections; at 2,000 mcg a day, oral B12 raised them more. The authors rated this low-quality evidence and found oral treatment cost less. No trial reported on symptoms of deficiency.',
          cites: ['wang2018'],
          facts: [
            { label: 'Trials', value: '3 RCTs, 153 people' },
            { label: 'Oral doses tested', value: '1,000 or 2,000 mcg/day' },
          ],
        },
        {
          title: 'Heart disease, memory and energy',
          strength: 'not_supported',
          text: 'The NIH fact sheet says B vitamin supplements lower homocysteine but don’t reduce the risk of heart disease or stroke, that most studies show low B12 levels don’t affect cognitive decline in older people, and that B12 doesn’t boost energy or endurance in people who already get enough from their diet.',
          cites: ['ods2021'],
        },
      ],
      todo: [
        'Heart disease, cognition and energy: cite meta-analyses of randomized trials rather than the consumer fact sheet alone.',
        'The strength groupings are Claude’s suggestion; "limited" follows the review’s own low-quality rating.',
      ],
    },
    {
      id: 'who',
      heading: 'Who is more likely to be low',
      reviewed: false,
      items: [
        {
          title: 'Groups the fact sheet names',
          text: 'The NIH fact sheet lists older adults (who may make less stomach acid), people with pernicious anemia, people who have had stomach or intestinal surgery including weight-loss surgery, people with celiac or Crohn’s disease, and vegetarians and vegans. It says adults over 50 should get most of their B12 from fortified foods or supplements.',
          cites: ['ods2021'],
        },
      ],
      todo: [],
    },
    {
      id: 'dosing',
      heading: 'How much B12',
      reviewed: false,
      items: [
        {
          title: 'Recommended intake',
          text: 'The NIH fact sheet lists a Recommended Dietary Allowance of 2.4 mcg a day for adults, 2.6 mcg in pregnancy and 2.8 mcg while breastfeeding.',
          cites: ['ods2021'],
          facts: [
            { label: 'Adults', value: '2.4 mcg/day' },
            { label: 'Pregnancy', value: '2.6 mcg/day' },
            { label: 'Breastfeeding', value: '2.8 mcg/day' },
          ],
        },
      ],
      todo: ['The fact sheet gives no upper limit; check the Health Professional fact sheet for the reason.'],
    },
    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'High doses',
          text: 'The NIH fact sheet says B12 has not been shown to cause harm, even at high doses.',
          cites: ['ods2021'],
        },
        {
          title: 'Medicines that lower B12',
          text: 'The fact sheet says acid-reducing medicines (such as omeprazole and lansoprazole) can lead to B12 deficiency, and metformin might reduce B12 absorption.',
          cites: ['ods2021'],
        },
      ],
      todo: [],
    },
  ],

  citations: {
    wang2018: {
      authors: 'Wang H, Li L, Qin LL, Song Y, Vidal-Alaball J, Liu TH.',
      title: 'Oral vitamin B12 versus intramuscular vitamin B12 for vitamin B12 deficiency.',
      journal: 'Cochrane Database of Systematic Reviews 2018(3):CD004655',
      year: 2018,
      // PMID not shown on the page read; a search result suggests 29543316. Check on PubMed.
      doi: '10.1002/14651858.CD004655.pub3',
      source_url: 'https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004655.pub3/pdf/CDSR/CD004655/CD004655_abstract.pdf',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
    ods2021: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Vitamin B12 Fact Sheet for Consumers (updated July 7, 2021).',
      journal: 'ods.od.nih.gov',
      year: 2021,
      source_url: 'https://ods.od.nih.gov/pdf/factsheets/vitaminb12-consumer.pdf',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
  },
};
