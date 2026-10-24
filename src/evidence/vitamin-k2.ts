// Vitamin K2 evidence page: every sentence and citation shown on /vitamin-k2/evidence/.
//
// HOW THIS WAS WRITTEN: Claude summarized only what the NIH Health Professional
// fact sheet says, using only text read word for word on ods.od.nih.gov (the page
// was cut off partway; points that appeared only in a summary of the rest, such as
// the upper limit and other drug interactions, were left out). Nothing is from
// memory. River delegated approval on 2026-10-24 ("Work through the evidence todos
// and approve them"), so sections are marked reviewed. Open follow-ups are in ROADMAP.md.
// Citations keep entered_by until someone checks them on PubMed or the source page.
import type { EvidencePage } from './types';

export const vitaminK2Evidence: EvidencePage = {
  category: 'vitamin-k2',
  title: 'What the research says about vitamin K2 supplements',
  description:
    'What vitamin K2 (MK-7 and MK-4) supplements do and don’t do according to clinical trials and official fact sheets, with every point linked to its source.',
  lede: 'Each point below summarizes specific sources, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'how-it-works',
      heading: 'What vitamin K2 is',
      reviewed: true,
      items: [
        {
          title: 'K1, K2, MK-4 and MK-7',
          text: 'The NIH fact sheet says vitamin K is a family of compounds: phylloquinone (K1), the main form in food, and a series of menaquinones (K2), of which MK-4, MK-7 and MK-9 are the best studied. Supplements contain K1 or K2 as MK-4 or MK-7. It notes bioavailability data are limited, and one study found both K1 and MK-7 supplements well absorbed, with MK-7 lasting longer in the body.',
          cites: ['ods'],
        },
        {
          title: 'What it does in the body',
          text: 'The NIH fact sheet says vitamin K is needed to make proteins involved in blood clotting and in bone.',
          cites: ['ods'],
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
          title: 'Bone density and fractures',
          strength: 'limited',
          text: 'The NIH fact sheet says it is not clear whether vitamin K supplements affect osteoporosis risk. It describes a 2006 meta-analysis in which fracture trials all used MK-4 at 15 or 45 mg a day (milligrams, not micrograms) and found fewer fractures; a 3-year trial of 180 mcg MK-7 a day in postmenopausal women that found better bone strength; and a 12-month trial of 381 postmenopausal women that found no difference in bone density. It calls the trial results mixed.',
          cites: ['ods'],
          facts: [
            { label: 'MK-4 dose in fracture trials', value: '15 or 45 mg/day' },
            { label: 'MK-7 dose in the 3-year trial', value: '180 mcg/day' },
          ],
        },
        {
          title: 'The 2006 meta-analysis in more detail',
          strength: 'limited',
          text: 'The fact sheet describes a 2006 systematic review and meta-analysis by Cockayne and colleagues. Of 13 trials, 12 found that vitamin K1 or MK-4 improved bone mineral density. Seven trials reported fractures, and in those MK-4 significantly lowered hip, vertebral and all nonvertebral fractures. These were the high milligram MK-4 doses above, not the microgram MK-7 doses in most K2 supplements.',
          cites: ['ods'],
        },
        {
          title: 'Heart disease and artery calcification',
          strength: 'limited',
          text: 'The fact sheet says clinical trial results are inconclusive. In observational studies of Dutch adults, people who ate more menaquinones had less artery calcification (564 postmenopausal women) and, in 4,807 adults aged 55 and older, a 27% to 57% lower rate of death from coronary heart disease in the higher intake groups. Phylloquinone (K1) intake showed no such link. These studies can’t show cause and effect, and few trials have tested K2 supplements for this.',
          cites: ['ods'],
        },
      ],
    },
    {
      id: 'dosing',
      heading: 'How much vitamin K',
      reviewed: true,
      items: [
        {
          title: 'Adequate Intake',
          text: 'The NIH fact sheet lists an Adequate Intake for total vitamin K of 120 mcg a day for adult men and 90 mcg for adult women, including in pregnancy and breastfeeding. There is no separate amount for K2.',
          cites: ['ods'],
          facts: [
            { label: 'Adult men', value: '120 mcg/day' },
            { label: 'Adult women', value: '90 mcg/day' },
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
          title: 'Warfarin and other blood thinners',
          text: 'The NIH fact sheet says warfarin (Coumadin) and some other anticoagulants work against vitamin K, so people taking them need to keep their vitamin K intake consistent.',
          cites: ['ods'],
        },
      ],
    },
  ],

  citations: {
    ods: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Vitamin K Fact Sheet for Health Professionals.',
      journal: 'ods.od.nih.gov',
      year: 2026, // year read; the "Updated" line wasn't in the text read
      source_url: 'https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/',
      read: 'full_text', // page was cut off partway through
      design: 'government',
      date_checked: '2026-10-24',
      entered_by: 'claude',
    },
  },
};
