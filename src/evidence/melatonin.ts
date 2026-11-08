// Melatonin evidence page: every sentence and citation for /melatonin/evidence/.
//
// HOW THIS WAS DRAFTED (2026-11-05): Claude summarized only text read word for word on
// the NCCIH page "Melatonin: What You Need To Know" (last updated May 2024). Studies it
// cites are described as the NIH page describes them; none were read directly. Nothing is
// from memory. Strength groupings are Claude's suggestion. Every section is reviewed:
// false, so the page stays off the site until River approves it (edit here, then run
// `npm run evidence-drafts`).
import type { EvidencePage } from './types';

export const melatoninEvidence: EvidencePage = {
  category: 'melatonin',
  title: 'What the research says about melatonin supplements',
  description:
    'What melatonin supplements do and don’t do according to the NIH’s complementary health center, how often labels are inaccurate, and safety notes for children, with every point linked to its source.',
  lede: 'Each point below summarizes the NIH page on melatonin, linked by number to the reference at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'what-it-is',
      heading: 'What melatonin is',
      reviewed: false,
      items: [
        {
          title: 'A hormone the brain makes in the dark',
          text: 'The NIH page says melatonin is a hormone the brain produces in response to darkness that helps time the body’s 24-hour clock and sleep, and that light at night can block it. Supplements are most often made synthetically.',
          cites: ['nccih'],
        },
        {
          title: 'Labels aren’t always accurate',
          text: 'The NIH page says a 2017 study of 31 melatonin supplements found that for most, the melatonin content didn’t match the label, and 26 percent contained serotonin. It says a 2023 study found 22 of 25 melatonin gummies were inaccurately labeled: one had no detectable melatonin, and the rest ranged from 74 to 347 percent of the labeled amount, mostly more than labeled. This is why a lab report on the actual melatonin content counts in each product’s testing grade.',
          cites: ['nccih'],
          facts: [
            { label: 'Gummies off-label (2023)', value: '22 of 25' },
            { label: 'Range found', value: '74–347% of label' },
          ],
        },
      ],
      todo: ['"This is why a lab report… counts in each product’s testing grade" is Claude’s sentence about the site. Keep, reword or cut.'],
    },

    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
      intro: 'Grouped by how the NIH page describes each result.',
      items: [
        {
          title: 'Anxiety before surgery',
          strength: 'moderate',
          text: 'The NIH page says a 2015 Cochrane review of 12 studies (774 people) found strong evidence that melatonin is better than placebo at reducing anxiety before surgery, and it may work as well as midazolam. Results for anxiety after surgery were mixed.',
          cites: ['nccih'],
        },
        {
          title: 'Delayed sleep-wake phase disorder',
          strength: 'limited',
          text: 'The NIH page says melatonin appears to help people with this disorder fall asleep sooner (about 22 minutes on average in a 2016 review; 34 minutes earlier in a 2018 trial of 307 people), but it’s uncertain whether the benefits outweigh possible harms, and a 2015 guideline’s recommendation was weak.',
          cites: ['nccih'],
        },
        {
          title: 'Jet lag',
          strength: 'limited',
          text: 'The NIH page says reviews from 2010 and 2014 suggest melatonin may reduce jet lag symptoms after eastward and westward flights, with low-quality evidence that it may improve sleep quality after eastward flights.',
          cites: ['nccih'],
        },
        {
          title: 'Sleep problems in children',
          strength: 'limited',
          text: 'The NIH page says a 2019 review of 18 small, brief studies (1,021 children, some with autism, ADHD or eczema) found melatonin better than placebo for falling asleep sooner and sleeping longer, with unclear effects on behavior and daytime functioning. It says there are no overall guidelines and parents should talk with a health care provider first.',
          cites: ['nccih'],
        },
        {
          title: 'Shift work',
          strength: 'limited',
          text: 'The NIH page says two 2014 reviews found studies in shift workers were generally small or inconclusive; one found low-quality evidence of about 24 minutes more daytime sleep.',
          cites: ['nccih'],
        },
        {
          title: 'Chronic insomnia',
          strength: 'not_supported',
          text: 'The NIH page says guidelines from the American Academy of Sleep Medicine (2017) and the American College of Physicians (2016) found not enough strong evidence on melatonin’s effectiveness or safety for chronic insomnia to recommend it.',
          cites: ['nccih'],
        },
      ],
      todo: ['Confirm or change each strength grouping. Anxiety before surgery is "moderate" only because the evidence is from one review, though the NIH page calls it strong.'],
    },

    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Short term looks safe for most; long term is unknown',
          text: 'The NIH page says short-term use appears safe for most people, with mild side effects such as headache, dizziness, nausea and sleepiness reported, but information on long-term safety is lacking, especially at doses higher than the body makes.',
          cites: ['nccih'],
        },
        {
          title: 'Children and accidental ingestion',
          text: 'The NIH page says poison control reports about people 19 and younger who took melatonin rose from 8,337 in 2012 to 52,563 in 2021, most for children 5 and under who got into it at home, and a CDC report estimated about 11,000 emergency visits from 2019 to 2022 for unsupervised ingestion by young children. It stresses keeping supplements out of children’s reach and sight.',
          cites: ['nccih'],
        },
        {
          title: 'Who should check first',
          text: 'The NIH page says people taking medicine should talk with a health care provider first, and people with epilepsy or on blood thinners need medical supervision. It notes a lack of research in pregnancy and breastfeeding, a guideline against use in people with dementia, and that melatonin may cause daytime drowsiness in older people.',
          cites: ['nccih'],
        },
      ],
    },
  ],

  citations: {
    nccih: {
      authors: 'National Center for Complementary and Integrative Health (NIH)',
      title: 'Melatonin: What You Need To Know.',
      journal: 'nccih.nih.gov',
      year: 2024, // page says "Last Updated: May 2024"
      source_url: 'https://www.nccih.nih.gov/health/melatonin-what-you-need-to-know',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
  },
};
