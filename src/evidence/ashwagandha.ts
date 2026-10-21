// Ashwagandha evidence page: every sentence and citation shown on /ashwagandha/evidence/.
//
// HOW THIS WAS DRAFTED: Claude summarized only what the listed papers' abstracts
// say, read from Europe PMC on 2026-10-21. Nothing is from memory. The
// "strength of evidence" groupings are Claude's suggestion and are yours to change.
// Review works the same as src/evidence/creatine.ts: edit the wording, set
// `reviewed: true` per section, and delete `entered_by` once you've checked a citation.
import type { EvidencePage } from './types';

export const ashwagandhaEvidence: EvidencePage = {
  category: 'ashwagandha',
  title: 'What the research says about ashwagandha',
  description:
    'What ashwagandha does and doesn’t help with grouped by strength of evidence, the doses studied, and safety including liver injury reports, with every claim linked to its study.',
  lede: 'Each point below summarizes specific studies, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'what-it-is',
      heading: 'What ashwagandha is',
      reviewed: false,
      items: [],
      todo: [
        'Describe the plant (Withania somnifera), which parts are used, and what withanolides are, in your own words with a source.',
        'Explain how branded extracts differ (e.g. KSM-66 is root-only; Sensoril and Shoden use root and leaf) with a source for each.',
      ],
    },

    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
      intro:
        'Grouped by how much research backs each outcome. Most ashwagandha studies are small, and reviews often find large differences between trials.',
      items: [
        {
          title: 'Stress, anxiety and low mood',
          strength: 'moderate',
          text: 'A 2026 review of 22 trials found ashwagandha improved stress, anxiety and depression scores compared with placebo. The authors call the results promising but say better trials are still needed to settle the best dose and length of use.',
          cites: ['alsanie2026'],
        },
        {
          title: 'Endurance exercise',
          strength: 'moderate',
          text: 'Pooling 13 randomized trials (599 people), a 2026 review found an overall improvement in exercise performance, most consistent for aerobic endurance. Results varied enough between trials that some settings may show no benefit.',
          cites: ['li2026'],
        },
        {
          title: 'Memory and attention',
          strength: 'limited',
          text: 'A 2026 review of 20 studies (1,249 adults) found improvements in memory, attention and processing speed, and executive function.',
          cites: ['zhu2026'],
        },
        {
          title: 'Strength alongside resistance training',
          strength: 'limited',
          text: 'One review found strength improved, most in physically active people. A second, stricter review of 3 trials (161 people) found the gains became non-significant under a more cautious analysis, each depended on a single trial, and the certainty was low.',
          cites: ['zhu2026', 'lee2026'],
        },
        {
          title: 'Testosterone',
          strength: 'limited',
          text: 'The same 2026 review of 20 studies found a small rise in blood testosterone.',
          cites: ['zhu2026'],
        },
        {
          title: 'Blood sugar',
          strength: 'limited',
          text: 'Across 11 trials (667 people), fasting blood sugar fell by about 3 mg/dL on average. The effect on HbA1c was unclear, and the authors rated the certainty very low and advise against clinical recommendations.',
          cites: ['farrin2026'],
        },
        {
          title: 'Weight and body fat',
          strength: 'not_supported',
          text: 'Two 2026 reviews found no effect on body weight or body fat percentage.',
          cites: ['zhu2026', 'lee2026'],
        },
      ],
      todo: [
        'Sleep: read and cite a sleep trial or review before adding anything (the lookup was rate-limited).',
        'Consider the 2025 BJPsych Open review (PMID 41140145) and the 2025 cortisol meta-analysis (PMID 40746175), not yet read in full.',
        'Confirm or change each strength grouping.',
      ],
    },

    {
      id: 'dosing',
      heading: 'Doses used in research',
      reviewed: false,
      intro:
        'These are amounts studied in research, not a personal recommendation. Check with a professional first.',
      items: [
        {
          title: 'Most-studied range for exercise',
          text: 'In the exercise review, 500 to 600 mg of extract a day was the range with the most supporting evidence. The authors describe their dose findings as a starting point for future trials, not a conclusion.',
          cites: ['li2026'],
          facts: [{ label: 'Extract dose', value: '500–600 mg/day' }],
        },
        {
          title: 'No proven best dose yet',
          text: 'The mental-health review found dose was linked to the size of the stress effect but says the most effective dose and length of use still need to be established. The blood-sugar review found no advantage for any dose or duration.',
          cites: ['alsanie2026', 'farrin2026'],
        },
      ],
      todo: [
        'Add the doses and extracts used in key individual trials (e.g. KSM-66 at 300 mg twice a day; Sensoril at 125–250 mg), each with its own source.',
        'Explain why 600 mg of root powder and 600 mg of a concentrated extract are not equivalent, with a source.',
      ],
    },

    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Liver injury',
          text: 'A 2026 review of published cases found 25 people with liver injury blamed on ashwagandha, usually after weeks of use, often with jaundice and itching. Most recovered after stopping. One needed a liver transplant, and three people who already had cirrhosis died.',
          cites: ['mcintyre2026'],
        },
        {
          title: 'It can happen quickly',
          text: 'In one reported case, a healthy 27-year-old developed jaundice and itching after three days of ashwagandha, rated a probable cause of the liver injury.',
          cites: ['perezperez2026'],
        },
      ],
      todo: [
        'Thyroid effects: read and cite before adding.',
        'Pregnancy, breastfeeding, autoimmune conditions and medication interactions (e.g. sedatives, thyroid medicine, immunosuppressants): source each before adding.',
        'Who should talk to a doctor first, and the warning signs of liver injury to watch for: your call as the editor.',
      ],
    },

    {
      id: 'myths',
      heading: 'Common myths',
      reviewed: false,
      items: [
        {
          title: '“It’s natural, so it’s harmless”',
          text: 'Liver injury from ashwagandha is documented in published case reports, including severe cases.',
          cites: ['mcintyre2026'],
        },
        {
          title: '“It helps you lose fat”',
          text: 'Reviews of the trials found no effect on body weight or body fat.',
          cites: ['zhu2026', 'lee2026'],
        },
      ],
    },
  ],

  citations: {
    alsanie2026: {
      authors: 'Alsanie SA, et al.',
      title: 'Effects of ashwagandha (Withania somnifera) on mental health in adults: A systematic review and dose-response meta-analysis of randomized controlled trials.',
      journal: 'Complement Ther Med 97:103325',
      year: 2026,
      pmid: '41644067',
      doi: '10.1016/j.ctim.2026.103325',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:ashwagandha%20AND%20TITLE:meta-analysis&resultType=core&format=json&pageSize=8',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-21',
      entered_by: 'claude',
    },
    li2026: {
      authors: 'Li X, et al.',
      title: 'Effects of Withania somnifera (Ashwagandha) Supplementation on Exercise Performance: A Systematic Review and Three-Level Meta-Analysis.',
      journal: 'Nutrients 18(12):1915',
      year: 2026,
      pmid: '42356302',
      doi: '10.3390/nu18121915',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:ashwagandha%20AND%20TITLE:meta-analysis&resultType=core&format=json&pageSize=8',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-21',
      entered_by: 'claude',
    },
    zhu2026: {
      authors: 'Zhu X, et al.',
      title: 'Effects of Withania somnifera (L.) Dunal (Ashwagandha) on cognitive and physical function in adults: a systematic review and meta-analysis.',
      journal: 'Front Pharmacol 17',
      year: 2026,
      pmid: '42199854',
      doi: '10.3389/fphar.2026.1799467',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:ashwagandha%20AND%20TITLE:meta-analysis&resultType=core&format=json&pageSize=8',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-21',
      entered_by: 'claude',
    },
    lee2026: {
      authors: 'Lee JC, Heo AS.',
      title: 'Adjunctive Ashwagandha (Withania somnifera) Supplementation and Resistance-Training Adaptations in Healthy Adults: A Systematic Review and Random-Effects Meta-Analysis of Muscular Strength, Chest Circumference, and Body Composition.',
      journal: 'Nutrients 18(17):2815',
      year: 2026,
      pmid: '42738987',
      doi: '10.3390/nu18172815',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:ashwagandha%20AND%20TITLE:meta-analysis&resultType=core&format=json&pageSize=8',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-21',
      entered_by: 'claude',
    },
    farrin2026: {
      authors: 'Farrin N, et al.',
      title: 'The effects of Ashwagandha (Withania somnifera) supplementation on fasting blood glucose and HbA1c: a systematic review and dose-response meta-analysis of randomized controlled trials.',
      journal: 'Diabetes Res Clin Pract 241:113529',
      year: 2026,
      pmid: '42641800',
      doi: '10.1016/j.diabres.2026.113529',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:ashwagandha%20AND%20TITLE:meta-analysis&resultType=core&format=json&pageSize=8',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-21',
      entered_by: 'claude',
    },
    mcintyre2026: {
      authors: 'McIntyre D, et al.',
      title: 'Ashwagandha (Withania somnifera)-Associated Liver Injury: A Scoping Review of Clinical Characteristics and Safety Considerations.',
      journal: 'Cureus',
      year: 2026,
      pmid: '42367407',
      doi: '10.7759/cureus.109764',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:ashwagandha%20AND%20TITLE:liver&resultType=core&format=json&pageSize=5',
      read: 'abstract',
      design: 'review', // Claude's reading of the title; check it
      date_checked: '2026-10-21',
      entered_by: 'claude',
    },
    perezperez2026: {
      authors: 'Pérez Pérez S, et al.',
      title: 'Ashwagandha-Induced Herb-Induced Liver Injury Assessed With the Updated 2016 RUCAM.',
      journal: 'Case Reports Hepatol',
      year: 2026,
      pmid: '42529606',
      doi: '10.1155/crhe/8417352',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:ashwagandha%20AND%20TITLE:liver&resultType=core&format=json&pageSize=5',
      read: 'abstract',
      design: 'case_report', // Claude's reading of the title; check it
      date_checked: '2026-10-21',
      entered_by: 'claude',
    },
  },
};
