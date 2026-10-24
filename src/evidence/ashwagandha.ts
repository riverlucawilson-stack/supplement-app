// Ashwagandha evidence page: every sentence and citation shown on /ashwagandha/evidence/.
//
// HOW THIS WAS WRITTEN: Claude summarized only what the listed sources say (papers'
// abstracts read from Europe PMC on 2026-10-21, and the NIH Health Professional fact
// sheet read in full on 2026-10-24). Nothing is from memory. The "strength of
// evidence" groupings are Claude's suggestion. River delegated approval on 2026-10-24
// ("Work through the evidence todos and approve them"), so sections are marked
// reviewed. Open follow-ups are in ROADMAP.md. Delete `entered_by` once you've
// checked a citation.
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
      reviewed: true,
      items: [
        {
          title: 'The plant',
          text: 'The NIH fact sheet describes ashwagandha (Withania somnifera) as an evergreen shrub. Its root and leaf have different makeups. Most supplements contain root extract, and some contain root and leaf. Withanolides, a type of steroidal lactone, are thought to be among its active compounds, though other components may also play a role.',
          cites: ['odshp2025'],
        },
        {
          title: 'Branded extracts differ',
          text: 'The fact sheet says KSM-66 is a root extract (more than 5% withanolides in a 300 mg capsule), while Sensoril and Shoden use root and leaf (Shoden has 21 mg of withanolide glycosides per 60 mg capsule). Because products differ so much, it says it is difficult to identify specific extracts or recommended amounts.',
          cites: ['odshp2025'],
        },
      ],
    },

    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: true,
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
        {
          title: 'Sleep',
          strength: 'limited',
          text: 'The NIH fact sheet describes a 2021 meta-analysis of 5 studies (372 adults) that found a small but significant improvement in sleep, larger at 600 mg a day or more, after 8 weeks or more, and in people with insomnia. In one trial of 150 adults using Shoden, sleep quality improved in 72% of the ashwagandha group vs 29% on placebo.',
          cites: ['odshp2025'],
        },
        {
          title: 'The NIH summary',
          text: 'The fact sheet concludes ashwagandha may help reduce anxiety and stress and improve sleep, but the trials are fairly small and short. A guideline taskforce (WFSBP/CANMAT, 2022) provisionally recommended 300 to 600 mg of root extract (5% withanolides) for generalized anxiety disorder and said more research is needed.',
          cites: ['odshp2025'],
        },
      ],
    },

    {
      id: 'dosing',
      heading: 'Doses used in research',
      reviewed: true,
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
        {
          title: 'Extract vs whole root',
          text: 'In a review of 7 stress trials (491 adults, 6 to 8 weeks) described by the NIH fact sheet, doses were 240 to 1,250 mg a day of extract, or 12,000 mg a day of whole root granules (about 6,000 mg of root powder). Benefits appeared greater at 500 to 600 mg a day. This site compares products by the amount on the label, so check whether a product lists an extract or whole root powder.',
          cites: ['odshp2025'],
          facts: [
            { label: 'Extract doses studied', value: '240–1,250 mg/day' },
            { label: 'Whole root granules', value: '12,000 mg/day' },
          ],
        },
      ],
    },

    {
      id: 'safety',
      heading: 'Safety',
      reviewed: true,
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
        {
          title: 'Warning signs of liver injury',
          text: 'The NIH fact sheet lists signs reported in liver injury cases: jaundice (yellow skin or eyes), itching, nausea, tiredness, abdominal discomfort and high bilirubin.',
          cites: ['odshp2025'],
        },
        {
          title: 'Short-term use and side effects',
          text: 'The fact sheet says ashwagandha appears well tolerated for up to about 3 months, but its long-term safety is not known. Mild side effects include loose stools, nausea and drowsiness.',
          cites: ['odshp2025'],
        },
        {
          title: 'Thyroid',
          text: 'Ashwagandha has raised thyroid hormone (T4) levels in studies. In people with subclinical hypothyroidism it lowered TSH and raised T3 and T4. Three cases of thyrotoxicosis (an overactive thyroid), one at 1,950 mg a day, resolved after stopping. The fact sheet says it might interact with thyroid hormone medicines.',
          cites: ['odshp2025'],
        },
        {
          title: 'Pregnancy and hormone-sensitive conditions',
          text: 'The fact sheet says some experts advise against ashwagandha in pregnancy because of reports of miscarriage. Denmark banned ashwagandha products in 2023, and France’s food safety agency (ANSES, 2024) advises against it during pregnancy and breastfeeding and for people with endocrine disorders. It might not be safe for people with hormone-sensitive prostate cancer.',
          cites: ['odshp2025'],
        },
        {
          title: 'Medicines',
          text: 'The fact sheet says ashwagandha might interact with diabetes medicines, blood pressure medicines, immunosuppressants and sedatives, as well as thyroid hormone medicines.',
          cites: ['odshp2025'],
        },
      ],
    },

    {
      id: 'myths',
      heading: 'Common myths',
      reviewed: true,
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
    odshp2025: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Ashwagandha Fact Sheet for Health Professionals (updated May 2, 2025).',
      journal: 'ods.od.nih.gov',
      year: 2025,
      source_url: 'https://ods.od.nih.gov/factsheets/Ashwagandha-HealthProfessional/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-24',
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
