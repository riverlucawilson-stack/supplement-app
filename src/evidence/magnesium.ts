// Magnesium evidence draft. Not on the site: it's built only once every section
// has reviewed: true. Read it in drafts/evidence/magnesium.md (npm run evidence-drafts).
//
// HOW THIS WAS DRAFTED: Claude summarized only what the two listed sources say
// (a PubMed abstract and the NIH consumer fact sheet). Nothing is from memory.
// The blood pressure meta-analyses (PMID 27402922 and PMC12529988) couldn't be
// opened from here: PubMed showed a bot check and PMC was refused. They're to-dos.
//
// TO REVIEW A SECTION: read each item against its source, rewrite it in your own
// words, then set reviewed: true. TO VERIFY A CITATION: check it on PubMed, then
// delete entered_by.
import type { EvidencePage } from './types';

export const magnesiumEvidence: EvidencePage = {
  category: 'magnesium',
  title: 'What the research says about magnesium supplements',
  description:
    'What magnesium supplements do and don’t do according to randomized trials and their meta-analyses, with every point linked to its source.',
  lede: 'Each point below summarizes specific sources, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'how-it-works',
      heading: 'What magnesium is',
      reviewed: false,
      items: [
        {
          title: 'Elemental magnesium vs compound weight',
          text: 'The NIH fact sheet says the forms of magnesium in supplements that the body absorbs more easily are magnesium aspartate, citrate, lactate and chloride. This site compares products by the elemental magnesium on the Supplement Facts panel, not the weight of the whole compound.',
          cites: ['ods2020'],
        },
      ],
      todo: [
        'Explain magnesium’s roles in the body, with a source.',
        'Find a source comparing absorption of oxide vs glycinate and other chelates (the fact sheet read here does not mention oxide or glycinate).',
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
          title: 'Sleep in older adults with insomnia',
          strength: 'limited',
          text: 'A meta-analysis found 3 randomized trials comparing oral magnesium with placebo in 151 older adults. People taking magnesium fell asleep 17.36 minutes faster than with placebo. Total sleep time rose by 16.06 minutes, but that was not statistically significant. The authors rated the trials at moderate-to-high risk of bias, called the evidence low to very low quality, and said it is not good enough for doctors to make well-informed recommendations.',
          cites: ['mah2021'],
        },
      ],
      todo: [
        'Blood pressure: cite a meta-analysis of randomized trials (Zhang 2016, PMID 27402922, and a 2025 review, PMC12529988, could not be opened from here).',
        'Decide whether other outcomes (migraine, muscle cramps, blood sugar) belong here, each with a meta-analysis.',
        'The "limited" grouping for sleep is Claude’s suggestion, based on the authors’ own quality rating.',
      ],
    },
    {
      id: 'dosing',
      heading: 'How much magnesium',
      reviewed: false,
      items: [
        {
          title: 'Recommended intake',
          text: 'The NIH fact sheet lists a Recommended Dietary Allowance of 400–420 mg a day for adult men and 310–320 mg for adult women, from all sources combined.',
          cites: ['ods2020'],
          facts: [
            { label: 'Adult men', value: '400–420 mg/day' },
            { label: 'Adult women', value: '310–320 mg/day' },
          ],
        },
        {
          title: 'Upper limit for supplements',
          text: 'The upper limit for adults is 350 mg a day of magnesium from supplements and medications. It does not include magnesium in food, which the fact sheet says does not need to be limited.',
          cites: ['ods2020'],
        },
      ],
      todo: ['Note that the fact sheet read is the consumer version dated March 24, 2020; check the current Health Professional version.'],
    },
    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Too much from supplements',
          text: 'According to the NIH fact sheet, high intakes from supplements and medications can cause diarrhea, nausea and abdominal cramping, and extremely high intakes can lead to irregular heartbeat and cardiac arrest. In healthy people the kidneys get rid of excess magnesium in the urine.',
          cites: ['ods2020'],
        },
      ],
      todo: ['Cover people with reduced kidney function and medication interactions, with a source (the fact sheet read here does not).'],
    },
  ],

  citations: {
    mah2021: {
      authors: 'Authors not shown on the page read (add from PubMed)',
      title: 'Oral magnesium supplementation for insomnia in older adults: a Systematic Review & Meta-Analysis.',
      journal: 'BMC Complement Med Ther 21(1):125',
      year: 2021,
      pmid: '33865376',
      doi: '10.1186/s12906-021-03297-z',
      source_url: 'https://pubmed.ncbi.nlm.nih.gov/33865376/',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
    ods2020: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Magnesium Fact Sheet for Consumers (updated March 24, 2020).',
      journal: 'ods.od.nih.gov',
      year: 2020,
      source_url: 'https://ods.od.nih.gov/pdf/factsheets/Magnesium',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
  },
};
