// Vitamin D evidence draft. Not on the site: it's built only once every section
// has reviewed: true. Read it in drafts/evidence/vitamin-d.md (npm run evidence-drafts).
//
// HOW THIS WAS DRAFTED: Claude summarized only what the two listed papers'
// abstracts say. Nothing is from memory. Other papers (D2 vs D3, the VITAL trial,
// cancer and mortality meta-analyses) couldn't be opened from here: PMC pages
// returned a bot check and Europe PMC was refused. They're listed as to-dos.
//
// TO REVIEW A SECTION: read each item against its source, rewrite it in your own
// words, then set reviewed: true. TO VERIFY A CITATION: check it on PubMed, then
// delete entered_by.
import type { EvidencePage } from './types';

export const vitaminDEvidence: EvidencePage = {
  category: 'vitamin-d',
  title: 'What the research says about vitamin D supplements',
  description:
    'What vitamin D supplements do and don’t do according to randomized trials and their meta-analyses, with every point linked to its study.',
  lede: 'Each point below summarizes specific studies, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'how-it-works',
      heading: 'How vitamin D works',
      reviewed: false,
      items: [],
      todo: [
        'Explain how vitamin D is made in skin and converted to 25-hydroxyvitamin D (the blood marker), with a source.',
        'D3 vs D2: find and cite a meta-analysis comparing how much each raises 25-hydroxyvitamin D (Tripkovic 2012, PMCID PMC3349454, could not be opened from here).',
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
          title: 'Respiratory infections',
          strength: 'moderate',
          text: 'Pooled individual data from 25 randomized, placebo-controlled trials (10,933 people) found vitamin D lowered the odds of at least one acute respiratory infection (adjusted odds ratio 0.88). The benefit showed up with daily or weekly doses (0.81) but not with large bolus doses (0.97), and was largest in people who started very low (25-hydroxyvitamin D under 25 nmol/L).',
          cites: ['martineau2017'],
        },
        {
          title: 'Falls in older adults',
          strength: 'limited',
          text: 'A meta-analysis of 47 randomized trials (58,424 people) found a small drop in falls with vitamin D (relative risk 0.95). The drop was larger when vitamin D was taken with calcium (0.88).',
          cites: ['thanapluetiwong2020'],
        },
        {
          title: 'Fractures',
          strength: 'limited',
          text: 'In the same meta-analysis, 24 trials (40,102 people) reported fractures. Vitamin D alone did not lower fracture risk (relative risk 0.95, not significant). Vitamin D with calcium did (0.86, just reaching significance).',
          cites: ['thanapluetiwong2020'],
        },
      ],
      todo: [
        'Cancer and heart disease: cite the VITAL trial (Manson 2019) and a recent meta-analysis; neither could be opened from here.',
        'Mortality: cite a meta-analysis of randomized trials.',
        'Decide whether "Falls" and "Fractures" belong under limited or moderate evidence. That grouping is Claude’s suggestion.',
      ],
    },
    {
      id: 'dosing',
      heading: 'Doses used in research',
      reviewed: false,
      items: [
        {
          title: 'Daily or weekly, not large single doses',
          text: 'In the respiratory infection analysis, trials gave daily, weekly, or bolus doses (at least 30,000 IU at once, monthly to every three months). Only daily or weekly dosing showed a benefit.',
          cites: ['martineau2017'],
          facts: [
            { label: 'Daily-equivalent dose groups compared', value: 'under 800 IU, 800 to 1,999 IU, 2,000 IU or more' },
          ],
        },
      ],
      todo: ['Add the official intake recommendations and upper limit, with a source (e.g. NIH Office of Dietary Supplements).'],
    },
    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Serious side effects in trials',
          text: 'Across the 25 trials in the respiratory infection analysis, vitamin D did not change the share of people who had at least one serious adverse event (adjusted odds ratio 0.98).',
          cites: ['martineau2017'],
        },
      ],
      todo: ['Cover too much vitamin D (high blood calcium) and the upper limit, with a source.'],
    },
  ],

  citations: {
    martineau2017: {
      authors: 'Martineau AR, et al.',
      title: 'Vitamin D supplementation to prevent acute respiratory tract infections: systematic review and meta-analysis of individual participant data.',
      journal: 'BMJ 356:i6583',
      year: 2017,
      pmid: '28202713',
      doi: '10.1136/bmj.i6583',
      source_url: 'https://www.bmj.com/content/356/bmj.i6583',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-21',
      entered_by: 'claude',
    },
    thanapluetiwong2020: {
      authors: 'Thanapluetiwong S, et al.',
      title: 'Vitamin D supplement on prevention of fall and fracture: A Meta-analysis of Randomized Controlled Trials.',
      journal: 'Medicine (Baltimore) 99(34):e21506',
      year: 2020,
      pmid: '32846760',
      doi: '10.1097/MD.0000000000021506',
      source_url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7447507/',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-21',
      entered_by: 'claude',
    },
  },
};
