// Vitamin K2 evidence draft. Not on the site: it's built only once every
// section has reviewed: true. Read it in drafts/evidence/vitamin-k2.md (npm run evidence-drafts).
//
// HOW THIS WAS DRAFTED: Claude summarized only what the NIH Health Professional
// fact sheet says (read on ods.od.nih.gov; the page was cut off partway, so the
// safety and interaction points came from a summary of the rest of the page and
// need checking against it). Nothing is from memory. The studies the fact sheet
// describes (Cockayne 2006 and others) weren't opened, and a 2022 K2 meta-analysis
// (Frontiers in Public Health, doi 10.3389/fpubh.2022.979649) couldn't be fetched.
//
// TO REVIEW A SECTION: read each item against its source, rewrite it in your own
// words, then set reviewed: true. TO VERIFY A CITATION: check it on PubMed, then
// delete entered_by.
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
      reviewed: false,
      items: [
        {
          title: 'K1, K2, MK-4 and MK-7',
          text: 'The NIH fact sheet says vitamin K is a family of compounds: phylloquinone (K1), the main form in food, and a series of menaquinones (K2), of which MK-4, MK-7 and MK-9 are the best studied. Supplements contain K1 or K2 as MK-4 or MK-7. It notes bioavailability data are limited, and one study found both K1 and MK-7 supplements well absorbed, with MK-7 lasting longer in the body.',
          cites: ['ods'],
        },
      ],
      todo: ['Explain what vitamin K does (the fact sheet mentions blood clotting and bone proteins), in your own words.'],
    },
    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
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
          title: 'Heart disease and artery calcification',
          strength: 'limited',
          text: 'The fact sheet says clinical trial results are inconclusive. In observational studies of Dutch adults, people who ate more menaquinones had less artery calcification and lower heart disease death rates, but these studies can’t show cause and effect, and few trials have tested K2 supplements for this.',
          cites: ['ods'],
        },
      ],
      todo: [
        'Bone: cite the 2006 Cockayne meta-analysis and a recent K2-specific meta-analysis directly (doi 10.3389/fpubh.2022.979649 couldn’t be opened here).',
        'Heart: find a randomized trial of K2 supplements on artery calcification.',
        'The strength groupings are Claude’s suggestion based on the fact sheet’s wording ("not clear", "mixed", "inconclusive").',
      ],
    },
    {
      id: 'dosing',
      heading: 'How much vitamin K',
      reviewed: false,
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
      todo: ['Upper limit: the fact sheet reportedly says there is none because toxicity potential is low; confirm on the page (it was cut off before that section).'],
    },
    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Warfarin and other blood thinners',
          text: 'The NIH fact sheet says warfarin (Coumadin) and some other anticoagulants work against vitamin K, so people taking them need to keep their vitamin K intake consistent.',
          cites: ['ods'],
        },
      ],
      todo: [
        'Other interactions (antibiotics, bile acid sequestrants, orlistat) came from a summary of the cut-off part of the page; confirm before adding.',
      ],
    },
  ],

  citations: {
    ods: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Vitamin K Fact Sheet for Health Professionals (updated date not confirmed on the page read).',
      journal: 'ods.od.nih.gov',
      year: 2026, // year the page was read; replace with the page's "Updated" year
      source_url: 'https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/',
      read: 'full_text', // page was cut off partway through
      design: 'government',
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
  },
};
