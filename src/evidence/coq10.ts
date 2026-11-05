// CoQ10 evidence page: every sentence and citation for /coq10/evidence/.
//
// HOW THIS WAS DRAFTED (2026-11-05): Claude summarized only text read word for word:
// the NCCIH CoQ10 page (last updated January 2019) and the abstracts of two
// meta-analyses read from Europe PMC (PubMed and PMC pages showed a reCAPTCHA).
// Nothing is from memory. The strength groupings are Claude's suggestion and are
// River's to change. Every section is reviewed: false, so the page stays off the
// site until River approves it (edit here, then run `npm run evidence-drafts`).
import type { EvidencePage } from './types';

export const coq10Evidence: EvidencePage = {
  category: 'coq10',
  title: 'What the research says about CoQ10 supplements',
  description:
    'What CoQ10 supplements do and don’t do according to clinical trial reviews and the NIH, with every point linked to its source.',
  lede: 'Each point below summarizes specific sources, linked by number to the reference list at the bottom. Where the research is thin or the sources disagree, we say so.',

  sections: [
    {
      id: 'what-it-is',
      heading: 'What CoQ10 is',
      reviewed: false,
      items: [
        {
          title: 'A substance the body makes',
          text: 'The NIH’s complementary health center describes CoQ10 as a substance naturally present in the human body, with the highest levels in the heart, liver, kidneys and pancreas, and sold in the US as a dietary supplement.',
          cites: ['nccih'],
        },
      ],
      todo: [
        'Explain ubiquinone vs ubiquinol (the two forms on labels) in your own words with a source; the NCCIH page doesn’t cover it.',
      ],
    },

    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
      intro:
        'Grouped by how much research backs each outcome. The NIH page was last updated in January 2019, so newer trial reviews are listed beside it where they exist, and some of them disagree with it.',
      items: [
        {
          title: 'Heart failure',
          strength: 'limited',
          text: 'A 2024 meta-analysis of 33 randomized trials found lower all-cause death and fewer heart-failure hospitalizations with CoQ10 than without it (both rated moderate-quality evidence), along with improvements in symptom class, a blood marker of heart strain, pumping function and a 6-minute walk test (rated moderate to low quality), without major side effects. The NIH page, written earlier, calls the research on heart failure inconclusive.',
          cites: ['xu2024', 'nccih'],
          facts: [
            { label: 'Trials pooled', value: '33 RCTs' },
            { label: 'All-cause death', value: 'RR 0.64 (0.48–0.85)' },
            { label: 'Heart-failure hospitalization', value: 'RR 0.50 (0.37–0.67)' },
          ],
        },
        {
          title: 'Muscle pain from statins',
          strength: 'limited',
          text: 'A 2025 meta-analysis of 7 randomized trials (389 people taking statins, 100 to 600 mg CoQ10 a day for 30 to 90 days) found less muscle pain overall; four trials found a reduction and three found none, and the authors say more research is needed before making recommendations. The NIH page says the overall evidence does not support CoQ10 reducing statin muscle pain.',
          cites: ['kovacic2025', 'nccih'],
          facts: [
            { label: 'Trials pooled', value: '7 RCTs, 389 people' },
            { label: 'Doses studied', value: '100–600 mg/day' },
          ],
        },
        {
          title: 'Complications of heart surgery',
          strength: 'limited',
          text: 'The NIH page says there is evidence that CoQ10 may reduce the risk of some complications of heart surgery.',
          cites: ['nccih'],
        },
        {
          title: 'Heart damage from one chemotherapy drug',
          strength: 'limited',
          text: 'The NIH page says CoQ10 may reduce the risk of heart damage caused by one type of cancer chemotherapy drug.',
          cites: ['nccih'],
        },
        {
          title: 'Preventing heart disease',
          strength: 'limited',
          text: 'The NIH page says only a few studies have looked at this and their results are inconclusive.',
          cites: ['nccih'],
        },
        {
          title: 'Other conditions',
          strength: 'limited',
          text: 'The NIH page says CoQ10 has been studied for ALS, Down syndrome, Huntington’s disease and male infertility, but the research is too limited for any conclusions.',
          cites: ['nccih'],
        },
        {
          title: 'Blood pressure',
          strength: 'not_supported',
          text: 'The NIH page says the small amount of evidence available suggests CoQ10 probably doesn’t have a meaningful effect on blood pressure.',
          cites: ['nccih'],
        },
        {
          title: 'Parkinson’s disease',
          strength: 'not_supported',
          text: 'The NIH page says a major NIH-funded study found CoQ10, even at higher-than-usual doses, didn’t improve symptoms in early Parkinson’s disease, and a 2017 evaluation of that and smaller studies concluded it isn’t helpful for Parkinson’s symptoms.',
          cites: ['nccih'],
        },
        {
          title: 'Cancer treatment',
          strength: 'not_supported',
          text: 'The NIH page says CoQ10 has not been shown to be of value in treating cancer.',
          cites: ['nccih'],
        },
      ],
      todo: [
        'Check the two meta-analyses’ full texts (not just abstracts) before relying on them, including who funded them and how heavily they draw on small trials.',
        'Migraine: the NCCIH CoQ10 page doesn’t mention it. Read and cite a source before adding anything.',
        'Look for a newer NIH or Cochrane source than the January 2019 NCCIH page.',
        'Confirm or change each strength grouping.',
      ],
    },

    {
      id: 'dosing',
      heading: 'Doses used in research',
      reviewed: false,
      intro: 'These are amounts studied in research, not a personal recommendation. Check with a professional first.',
      items: [
        {
          title: 'Statin muscle pain trials',
          text: 'The trials in the 2025 statin review used 100 to 600 mg of CoQ10 a day for 30 to 90 days.',
          cites: ['kovacic2025'],
          facts: [
            { label: 'Daily dose', value: '100–600 mg' },
            { label: 'Duration', value: '30–90 days' },
          ],
        },
      ],
      todo: [
        'Doses in the heart-failure trials: not in the abstract. Read the full text before adding.',
        'Whether ubiquinone and ubiquinol doses compare: needs a source. The site compares each at its labeled amount.',
      ],
    },

    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Side effects',
          text: 'The NIH page says no serious side effects of CoQ10 have been reported, and mild side effects such as insomnia or digestive upsets may occur. The 2024 heart-failure review reported no major adverse effects.',
          cites: ['nccih', 'xu2024'],
        },
        {
          title: 'Medicine interactions',
          text: 'The NIH page says CoQ10 may interact with the blood thinner warfarin and with insulin, and may not be compatible with some types of cancer treatment.',
          cites: ['nccih'],
        },
      ],
      todo: [
        'Pregnancy and breastfeeding: not on the NCCIH page. Source before adding anything.',
        'Who should talk to a doctor first: your call as the editor.',
      ],
    },
  ],

  citations: {
    nccih: {
      authors: 'National Center for Complementary and Integrative Health (NIH)',
      title: 'Coenzyme Q10.',
      journal: 'nccih.nih.gov',
      year: 2019, // page says "Last Updated: January 2019"
      source_url: 'https://www.nccih.nih.gov/health/coenzyme-q10',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
    xu2024: {
      authors: 'Xu J, et al.',
      title: 'Efficacy and safety of coenzyme Q10 in heart failure: a meta-analysis of randomized controlled trials.',
      journal: 'BMC Cardiovasc Disord 24(1):592',
      year: 2024,
      pmid: '39462324',
      doi: '10.1186/s12872-024-04232-z',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:39462324&resultType=core&format=json',
      read: 'abstract',
      design: 'meta_analysis',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
    kovacic2025: {
      authors: 'Kovacic S, Habicht SD, Eckert GP.',
      title: 'Effects of coenzyme Q10 supplementation on myopathy in statin-treated patients: a systematic review and meta-analysis.',
      journal: 'J Nutr Sci 14:e72',
      year: 2025,
      pmid: '41158831',
      doi: '10.1017/jns.2025.10043',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=PMCID:PMC12554813&resultType=core&format=json',
      read: 'abstract',
      design: 'meta_analysis',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
  },
};
