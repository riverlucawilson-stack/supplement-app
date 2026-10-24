// Magnesium evidence page: every sentence and citation shown on /magnesium/evidence/.
//
// HOW THIS WAS WRITTEN: Claude summarized only what the listed sources say (a
// PubMed abstract and the NIH Health Professional fact sheet, read in full).
// Nothing is from memory. River delegated approval on 2026-10-24 ("Work through
// the evidence todos and approve them"), so sections are marked reviewed.
// Citations keep entered_by until someone checks them on PubMed or the source page.
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
      reviewed: true,
      items: [
        {
          title: 'What it does in the body',
          text: 'The NIH fact sheet describes magnesium as a cofactor in more than 300 enzyme systems, including ones for protein synthesis, muscle and nerve function, blood sugar control and blood pressure. It is also needed for energy production, bone structure, and making DNA and RNA.',
          cites: ['odshp2026'],
        },
        {
          title: 'Forms and absorption',
          text: 'According to the fact sheet, small studies found magnesium aspartate, citrate, lactate and chloride are absorbed more completely than magnesium oxide and sulfate. The fact sheet doesn’t discuss glycinate. This site compares products by the elemental magnesium on the Supplement Facts panel, not the weight of the whole compound.',
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
          title: 'Blood pressure: a small drop',
          strength: 'limited',
          text: 'The NIH fact sheet says trials suggest magnesium only marginally lowers blood pressure. A Cochrane review of 12 trials (545 people with high blood pressure) found diastolic pressure fell by 2.2 mmHg. A meta-analysis of 22 studies (1,173 adults) found systolic pressure fell 3 to 4 mmHg and diastolic 2 to 3 mmHg. The FDA calls the evidence for a blood pressure claim inconsistent and inconclusive.',
          cites: ['odshp2026'],
          facts: [
            { label: 'Systolic', value: '3–4 mmHg lower (22 studies)' },
            { label: 'Diastolic', value: '2–3 mmHg lower (22 studies)' },
          ],
        },
        {
          title: 'Migraine prevention',
          strength: 'limited',
          text: 'Three of four small, short placebo-controlled trials found modest reductions in how often migraines happened with up to 600 mg of magnesium a day. A guideline cited by the fact sheet says magnesium is probably effective for preventing migraine.',
          cites: ['odshp2026'],
        },
        {
          title: 'Sleep in older adults with insomnia',
          strength: 'limited',
          text: 'A meta-analysis found 3 randomized trials comparing oral magnesium with placebo in 151 older adults. People taking magnesium fell asleep 17.36 minutes faster than with placebo. Total sleep time rose by 16.06 minutes, but that was not statistically significant. The authors rated the trials at moderate-to-high risk of bias, called the evidence low to very low quality, and said it is not good enough for doctors to make well-informed recommendations.',
          cites: ['mah2021'],
        },
        {
          title: 'Blood sugar in diabetes',
          strength: 'not_supported',
          text: 'Trial results are mixed, and the fact sheet reports the American Diabetes Association’s view that there isn’t enough evidence to support routine magnesium for blood sugar control in people with diabetes.',
          cites: ['odshp2026'],
        },
      ],
    },
    {
      id: 'dosing',
      heading: 'How much magnesium',
      reviewed: true,
      items: [
        {
          title: 'Recommended intake',
          text: 'The NIH fact sheet lists a Recommended Dietary Allowance of 400 to 420 mg a day for adult men and 310 to 320 mg for adult women, from all sources combined.',
          cites: ['odshp2026'],
          facts: [
            { label: 'Adult men', value: '400–420 mg/day' },
            { label: 'Adult women', value: '310–320 mg/day' },
          ],
        },
        {
          title: 'Upper limit for supplements',
          text: 'The upper limit for adults is 350 mg a day of magnesium from supplements and medications. It does not include magnesium in food. Above it, supplements can cause diarrhea, nausea and abdominal cramping.',
          cites: ['odshp2026'],
        },
      ],
    },
    {
      id: 'safety',
      heading: 'Safety',
      reviewed: true,
      items: [
        {
          title: 'Too much, and kidney problems',
          text: 'The fact sheet says very high doses can cause magnesium toxicity, with low blood pressure, vomiting, trouble breathing, irregular heartbeat and, rarely, cardiac arrest. The risk rises with reduced kidney function or kidney failure, because the body can’t clear the extra magnesium. Toxicity has been linked to laxative or antacid doses, typically over 5,000 mg a day.',
          cites: ['odshp2026'],
        },
        {
          title: 'Medicines',
          text: 'The fact sheet lists interactions with osteoporosis drugs (bisphosphonates) and some antibiotics (tetracyclines and quinolones), which should be taken hours apart from magnesium; diuretics, which can raise or lower magnesium; and long-term use of acid-reducing proton pump inhibitors, which can cause low magnesium.',
          cites: ['odshp2026'],
        },
      ],
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
    odshp2026: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Magnesium Fact Sheet for Health Professionals (updated January 6, 2026).',
      journal: 'ods.od.nih.gov',
      year: 2026,
      source_url: 'https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-24',
      entered_by: 'claude',
    },
  },
};
