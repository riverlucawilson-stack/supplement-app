// Vitamin D evidence page: every sentence and citation shown on /vitamin-d/evidence/.
//
// HOW THIS WAS WRITTEN: Claude summarized only what the listed sources say (two
// papers' abstracts and the NIH Health Professional fact sheet, read word for word
// except the steroid and thiazide interaction details, which weren't returned and
// are left out). Nothing is from memory. River delegated approval on 2026-10-24
// ("Work through the evidence todos and approve them"), so sections are marked
// reviewed. Open follow-ups are in ROADMAP.md.
// Citations keep entered_by until someone checks them on PubMed or the source page.
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
      reviewed: true,
      items: [
        {
          title: 'Made in skin, activated in liver and kidney',
          text: 'The NIH Health Professional fact sheet says the body makes vitamin D when UV rays from sunlight hit the skin. The liver turns it into 25-hydroxyvitamin D (calcidiol), and the kidney turns that into the active form, 1,25-dihydroxyvitamin D (calcitriol).',
          cites: ['odshp2026'],
        },
        {
          title: 'The blood test',
          text: 'Blood 25-hydroxyvitamin D is the main marker of vitamin D status. The active form isn’t a good marker because it lasts only hours. The fact sheet says 50 nmol/L (20 ng/mL) or more is enough for most people, and people below 30 nmol/L (12 ng/mL) are at risk of deficiency.',
          cites: ['odshp2026'],
          facts: [
            { label: 'Enough for most people', value: '50 nmol/L (20 ng/mL) or more' },
            { label: 'Risk of deficiency', value: 'under 30 nmol/L (12 ng/mL)' },
          ],
        },
        {
          title: 'D3 vs D2',
          text: 'Both forms raise 25-hydroxyvitamin D and seem equally able to cure rickets. The fact sheet says most evidence shows D3 raises blood levels more than D2 and keeps them higher for longer.',
          cites: ['odshp2026'],
        },
      ],
    },
    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: true,
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
        {
          title: 'What official reviews say about falls and fractures',
          strength: 'limited',
          text: 'The NIH fact sheet says it is not clear whether vitamin D and calcium reduce falls and fractures. In the VITAL trial (25,871 people, 2,000 IU a day, median 5.3 years), vitamin D did not lower total, hip or nonvertebral fractures. The USPSTF found the evidence insufficient for preventing fractures, recommends against 400 IU or less of vitamin D with 1,000 mg or less of calcium for that purpose, and concluded with moderate certainty that vitamin D does not reduce falls in people 65 and older.',
          cites: ['odshp2026'],
        },
        {
          title: 'Cancer and heart disease (VITAL trial)',
          strength: 'not_supported',
          text: 'VITAL gave 25,871 adults (men 50 and older, women 55 and older) 2,000 IU of vitamin D3 a day or placebo for a median of 5.3 years. Rates of breast, prostate and colorectal cancer did not differ, and vitamin D did not significantly lower heart attacks, strokes or cardiovascular deaths.',
          cites: ['odshp2026'],
          facts: [
            { label: 'People', value: '25,871' },
            { label: 'Dose', value: '2,000 IU (50 mcg) D3 a day' },
          ],
        },
        {
          title: 'Cancer deaths',
          strength: 'limited',
          text: 'The fact sheet says three meta-analyses of trials found vitamin D doesn’t change how many people get cancer but lowers cancer deaths by 12% to 13%. The most recent (10 trials, 6,537 cancer cases, including VITAL) found a 13% drop, mostly with daily dosing.',
          cites: ['odshp2026'],
        },
      ],
    },
    {
      id: 'dosing',
      heading: 'Doses used in research',
      reviewed: true,
      items: [
        {
          title: 'Daily or weekly, not large single doses',
          text: 'In the respiratory infection analysis, trials gave daily, weekly, or bolus doses (at least 30,000 IU at once, monthly to every three months). Only daily or weekly dosing showed a benefit.',
          cites: ['martineau2017'],
          facts: [
            { label: 'Daily-equivalent dose groups compared', value: 'under 800 IU, 800 to 1,999 IU, 2,000 IU or more' },
          ],
        },
        {
          title: 'Recommended intake and upper limit',
          text: 'The NIH fact sheet lists a Recommended Dietary Allowance of 600 IU (15 mcg) a day for adults up to 70 and 800 IU (20 mcg) over 70. The upper limit for adults is 4,000 IU (100 mcg) a day. 1 mcg equals 40 IU.',
          cites: ['odshp2026'],
          facts: [
            { label: 'Adults 19–70', value: '600 IU (15 mcg)/day' },
            { label: 'Over 70', value: '800 IU (20 mcg)/day' },
            { label: 'Upper limit', value: '4,000 IU (100 mcg)/day' },
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
          title: 'Serious side effects in trials',
          text: 'Across the 25 trials in the respiratory infection analysis, vitamin D did not change the share of people who had at least one serious adverse event (adjusted odds ratio 0.98).',
          cites: ['martineau2017'],
        },
        {
          title: 'Too much vitamin D',
          text: 'The NIH fact sheet says toxicity is almost always from supplements, not sun. It causes high blood and urine calcium and, in extreme cases, kidney failure, soft-tissue calcification, irregular heartbeat and death. Symptoms include nausea, vomiting, muscle weakness, confusion, pain, loss of appetite, dehydration, excess urination and thirst, and kidney stones. Blood 25-hydroxyvitamin D is usually above 150 ng/mL. The Food and Nutrition Board says toxicity is unlikely below 10,000 IU a day, but advised against blood levels above about 50 to 60 ng/mL.',
          cites: ['odshp2026'],
        },
        {
          title: 'Medicines',
          text: 'The fact sheet says orlistat (Xenical, alli) can reduce vitamin D absorption, and high vitamin D intake might reduce the potency of atorvastatin, lovastatin and simvastatin because they compete for the same enzyme. It also lists steroids and thiazide diuretics as interacting.',
          cites: ['odshp2026'],
        },
      ],
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
    odshp2026: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Vitamin D Fact Sheet for Health Professionals.',
      journal: 'ods.od.nih.gov',
      year: 2026, // year read; no "Updated" line was shown on the page read
      source_url: 'https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-24',
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
