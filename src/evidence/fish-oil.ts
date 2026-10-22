// Fish oil / omega-3 evidence draft. Not on the site: it's built only once every
// section has reviewed: true. Read it in drafts/evidence/fish-oil.md (npm run evidence-drafts).
//
// HOW THIS WAS DRAFTED: Claude summarized only what the two listed sources say
// (the 2020 Cochrane review's abstract, read on the UEA repository, and the NIH
// consumer fact sheet). Nothing is from memory.
//
// TO REVIEW A SECTION: read each item against its source, rewrite it in your own
// words, then set reviewed: true. TO VERIFY A CITATION: check it on PubMed, then
// delete entered_by.
import type { EvidencePage } from './types';

export const fishOilEvidence: EvidencePage = {
  category: 'fish-oil',
  title: 'What the research says about fish oil and omega-3 supplements',
  description:
    'What EPA and DHA supplements do and don’t do according to randomized trials and their meta-analyses, with every point linked to its source.',
  lede: 'Each point below summarizes specific sources, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'how-it-works',
      heading: 'What EPA and DHA are',
      reviewed: false,
      items: [
        {
          title: 'No set recommended amount for EPA and DHA',
          text: 'The NIH fact sheet says recommended amounts have been set only for ALA (1.6 g a day for men, 1.1 g for women), not for EPA or DHA. Supplements include fish oil, krill oil, cod liver oil and algal oil, in a wide range of doses and forms.',
          cites: ['ods2022'],
        },
      ],
      todo: [
        'Explain what EPA and DHA are and how they differ from ALA, with a source.',
        'TG vs rTG vs EE: find a source on whether the oil form changes how much is absorbed.',
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
          title: 'Death and cardiovascular events: little or no effect',
          strength: 'not_supported',
          text: 'A Cochrane review of randomized trials found that more EPA and DHA (mostly from supplements) made little or no difference to death from any cause (risk ratio 0.98, 39 trials, 92,653 people, high-quality evidence) or to cardiovascular events (0.99, 38 trials, 90,378 people, high-quality evidence). Cardiovascular deaths (0.95), stroke (1.06) and arrhythmia (0.97) also showed no clear change. The authors concluded that earlier suggestions of benefit came from trials with a higher risk of bias.',
          cites: ['abdelhamid2020'],
        },
        {
          title: 'Coronary heart disease events',
          strength: 'limited',
          text: 'The same review found a small drop in coronary heart disease events (risk ratio 0.93, 28 trials, 84,301 people), but it did not hold up in sensitivity analyses, and the authors say EPA and DHA probably make little or no difference to this risk.',
          cites: ['abdelhamid2020'],
        },
        {
          title: 'Triglycerides',
          strength: 'limited',
          text: 'The review says EPA and DHA slightly lowered triglycerides and raised HDL cholesterol. The NIH fact sheet notes higher doses are sometimes used to lower triglycerides, under a healthcare provider’s care.',
          cites: ['abdelhamid2020', 'ods2022'],
        },
      ],
      todo: [
        'Triglycerides: add a meta-analysis with the size of the effect by dose (the abstract read gives no number).',
        'Decide whether to cover other outcomes (depression, joint pain, eye health, pregnancy), each with a meta-analysis.',
        'The strength groupings are Claude’s suggestion based on the review’s own GRADE ratings.',
      ],
    },
    {
      id: 'dosing',
      heading: 'How much EPA and DHA',
      reviewed: false,
      items: [
        {
          title: 'FDA upper amount',
          text: 'The NIH fact sheet says the FDA recommends no more than 3 g a day of EPA and DHA combined, including up to 2 g a day from supplements.',
          cites: ['ods2022'],
          facts: [
            { label: 'EPA + DHA, all sources', value: 'no more than 3 g/day (FDA)' },
            { label: 'From supplements', value: 'up to 2 g/day (FDA)' },
          ],
        },
      ],
      todo: ['Add the American Heart Association’s advice with its own source (the fact sheet mentions about 1 g a day EPA plus DHA for people with heart disease).'],
    },
    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Common side effects',
          text: 'According to the NIH fact sheet, side effects are usually mild: an unpleasant taste, bad breath, heartburn, nausea, stomach discomfort, diarrhea, headache and smelly sweat. The Cochrane review found no evidence that EPA and DHA changed serious adverse events.',
          cites: ['ods2022', 'abdelhamid2020'],
        },
        {
          title: 'Bleeding and blood thinners',
          text: 'The fact sheet says high doses may cause bleeding problems when taken with warfarin or other anticoagulant medicines, and could possibly affect immune function.',
          cites: ['ods2022'],
        },
      ],
      todo: ['Cover fish allergy and oxidation (rancid oil), each with a source.'],
    },
  ],

  citations: {
    abdelhamid2020: {
      authors: 'Abdelhamid AS, et al.',
      title: 'Omega-3 fatty acids for the primary and secondary prevention of cardiovascular disease.',
      journal: 'Cochrane Database of Systematic Reviews 2020(2)',
      year: 2020,
      // Cochrane's own page gives pub5 for the 29 Feb 2020 version; the UEA record lists pub3. Check which is right.
      doi: '10.1002/14651858.CD003177.pub5',
      source_url: 'https://ueaeprints.uea.ac.uk/66982/',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
    ods2022: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Omega-3 Fatty Acids Fact Sheet for Consumers (updated July 18, 2022).',
      journal: 'ods.od.nih.gov',
      year: 2022,
      source_url: 'https://ods.od.nih.gov/pdf/factsheets/omega3fattyacids-consumer.pdf',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
  },
};
