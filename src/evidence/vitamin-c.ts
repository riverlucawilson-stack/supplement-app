// Vitamin C evidence page: every sentence and citation shown on /vitamin-c/evidence/.
//
// HOW THIS WAS WRITTEN: Claude summarized only what the two NIH fact sheets say
// (consumer and Health Professional, using only text read word for word). Nothing
// is from memory. The cold numbers used to come from a Spanish translation of the
// 2013 Cochrane abstract; the English abstract couldn't be opened, so they were
// replaced with the Health Professional fact sheet's figures. River delegated
// approval on 2026-10-24 ("Work through the evidence todos and approve them"), so
// sections are marked reviewed. Open follow-ups are in ROADMAP.md.
// Citations keep entered_by until someone checks them on the source page.
import type { EvidencePage } from './types';

export const vitaminCEvidence: EvidencePage = {
  category: 'vitamin-c',
  title: 'What the research says about vitamin C supplements',
  description:
    'What vitamin C supplements do and don’t do according to randomized trials, their reviews and official fact sheets, with every point linked to its source.',
  lede: 'Each point below summarizes specific sources, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'how-it-works',
      heading: 'What vitamin C is',
      reviewed: true,
      items: [
        {
          title: 'What it does in the body',
          text: 'The NIH Health Professional fact sheet says vitamin C is needed to make collagen, L-carnitine and some neurotransmitters. It is an important antioxidant, plays a role in immune function, and improves absorption of nonheme iron, the kind in plant foods.',
          cites: ['odshp2026'],
        },
        {
          title: 'Forms of vitamin C',
          text: 'Supplements usually contain ascorbic acid. Some use sodium ascorbate, calcium ascorbate, other mineral ascorbates, ascorbic acid with bioflavonoids, or Ester-C. The Health Professional fact sheet says ascorbic acid has equivalent bioavailability to vitamin C in foods, and that the authors of a review comparing forms concluded simple ascorbic acid is the preferred source. The fact sheet doesn’t discuss liposomal vitamin C.',
          cites: ['ods2021', 'odshp2026'],
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
          title: 'Catching colds: no effect for most people',
          strength: 'not_supported',
          text: 'The Health Professional fact sheet, describing a Cochrane review, says taking vitamin C regularly did not significantly lower the risk of catching a cold in the general population.',
          cites: ['odshp2026', 'ods2021'],
        },
        {
          title: 'Colds under heavy physical stress',
          strength: 'limited',
          text: 'In trials of marathon runners, skiers and soldiers doing exercises in subarctic conditions, regular vitamin C at 250 mg to 1 g a day cut the number of colds by 50%.',
          cites: ['odshp2026'],
        },
        {
          title: 'How long colds last, if taken every day',
          strength: 'moderate',
          text: 'Regular vitamin C modestly shortened colds, by 8% in adults and 14% in children. Starting vitamin C after symptoms began did not change how long colds lasted or how bad they were.',
          cites: ['odshp2026', 'ods2021'],
          facts: [
            { label: 'Adults', value: '8% shorter' },
            { label: 'Children', value: '14% shorter' },
          ],
        },
        {
          title: 'Cancer',
          strength: 'not_supported',
          text: 'The Health Professional fact sheet says most randomized trials found vitamin C, alone or with other nutrients, does not affect cancer risk. For example, 500 mg with vitamin E in the Physicians’ Health Study II (about 8 years, men) didn’t lower prostate or total cancer, and 500 mg a day in the Women’s Antioxidant Cardiovascular Study (9.4 years) had no significant effect on cancer rates or cancer deaths.',
          cites: ['odshp2026'],
        },
        {
          title: 'Heart disease',
          strength: 'not_supported',
          text: 'Some observational studies link more vitamin C with lower heart disease risk, and a 2008 meta-analysis of 14 cohorts found this for vitamin C from food but not from supplements. In randomized trials, 500 mg a day had no overall effect on cardiovascular events in women (9.4 years) or major cardiovascular events in men (about 8 years). The fact sheet concludes that most trials don’t give convincing evidence that vitamin C supplements protect against cardiovascular disease.',
          cites: ['odshp2026'],
        },
      ],
    },
    {
      id: 'dosing',
      heading: 'How much vitamin C',
      reviewed: true,
      items: [
        {
          title: 'Recommended intake',
          text: 'The NIH fact sheets list a Recommended Dietary Allowance of 90 mg a day for adult men and 75 mg for adult women, from all sources; 85 mg in pregnancy and 120 mg while breastfeeding. People who smoke need 35 mg more a day.',
          cites: ['ods2021', 'odshp2026'],
          facts: [
            { label: 'Adult men', value: '90 mg/day' },
            { label: 'Adult women', value: '75 mg/day' },
            { label: 'Smokers', value: 'add 35 mg/day' },
          ],
        },
        {
          title: 'Upper limit',
          text: 'The upper limit for adults is 2,000 mg a day from food, drinks and supplements combined.',
          cites: ['ods2021', 'odshp2026'],
        },
      ],
    },
    {
      id: 'safety',
      heading: 'Safety',
      reviewed: true,
      items: [
        {
          title: 'Too much',
          text: 'According to the NIH fact sheets, high doses can cause diarrhea, nausea and stomach cramps. In people with hemochromatosis, long-term high doses could worsen iron overload and damage tissue.',
          cites: ['ods2021', 'odshp2026'],
        },
        {
          title: 'Kidney stones',
          text: 'The Health Professional fact sheet says high intakes can raise oxalate and uric acid in urine, but studies of 30 mg to 10 g a day have had conflicting results. The best evidence that vitamin C adds to kidney stone formation is in people who already have hyperoxaluria (high urine oxalate).',
          cites: ['odshp2026'],
        },
        {
          title: 'Medicines',
          text: 'The fact sheets say the safety of vitamin C supplements during chemotherapy and radiation is controversial, so patients should ask their oncologist first. Vitamin C with other antioxidants may blunt the rise in HDL cholesterol from niacin taken with simvastatin.',
          cites: ['ods2021', 'odshp2026'],
        },
      ],
    },
  ],

  citations: {
    odshp2026: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Vitamin C Fact Sheet for Health Professionals.',
      journal: 'ods.od.nih.gov',
      year: 2026, // year read; the "Updated" line wasn't in the text read
      source_url: 'https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-24',
      entered_by: 'claude',
    },
    ods2021: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Vitamin C Fact Sheet for Consumers (updated March 22, 2021).',
      journal: 'ods.od.nih.gov',
      year: 2021,
      source_url: 'https://ods.od.nih.gov/factsheets/VitaminC-Consumer/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
  },
};
