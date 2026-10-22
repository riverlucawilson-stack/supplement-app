// Multivitamin evidence draft. Not on the site: it's built only once every
// section has reviewed: true. Read it in drafts/evidence/multivitamin.md (npm run evidence-drafts).
//
// HOW THIS WAS DRAFTED: Claude summarized only what the two listed sources say
// (the NIH consumer fact sheet and the 2022 USPSTF recommendation page). Nothing
// is from memory. The USPSTF page was cut off partway, so its Practice
// Considerations and reference list weren't read.
//
// TO REVIEW A SECTION: read each item against its source, rewrite it in your own
// words, then set reviewed: true. TO VERIFY A CITATION: check it on PubMed, then
// delete entered_by.
import type { EvidencePage } from './types';

export const multivitaminEvidence: EvidencePage = {
  category: 'multivitamin',
  title: 'What the research says about multivitamins',
  description:
    'What multivitamin/mineral supplements do and don’t do according to randomized trials and official reviews, with every point linked to its source.',
  lede: 'Each point below summarizes specific sources, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'how-it-works',
      heading: 'What a multivitamin is',
      reviewed: false,
      items: [
        {
          title: 'No standard formula',
          text: 'The NIH fact sheet says multivitamin/mineral supplements combine vitamins and minerals, sometimes with other ingredients, and that there is no standard product or standard list of ingredients. That is why this site compares them by cost per daily serving and lists the nutrient count and forms beside it, rather than by one nutrient.',
          cites: ['ods2024'],
        },
      ],
      todo: ['Explain what %DV means on a Supplement Facts panel, with an FDA source.'],
    },
    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
      intro:
        'Grouped by how much research backs each outcome. A stronger group means more consistent results across more studies, not a bigger effect.',
      items: [
        {
          title: 'Death, heart disease and stroke: no clear effect',
          strength: 'not_supported',
          text: 'The USPSTF’s 2022 review found no link between multivitamins and death from any cause (odds ratio 0.94, 9 trials, 51,550 people), cardiovascular death (0.94, 4 trials, 37,400 people) or cancer death (0.94, 4 trials). The NIH fact sheet says most placebo-controlled studies found no drop in heart attacks, strokes or cardiovascular deaths.',
          cites: ['uspstf2022', 'ods2024'],
          facts: [
            { label: 'Death, any cause', value: 'OR 0.94 (95% CI 0.87 to 1.01)' },
            { label: 'Cardiovascular death', value: 'OR 0.94 (95% CI 0.83 to 1.06)' },
          ],
        },
        {
          title: 'Getting cancer',
          strength: 'limited',
          text: 'The USPSTF found a small drop in new cancers (odds ratio 0.93, 95% CI 0.87 to 0.99, 4 trials, 48,859 people), but it did not match the cancer death results. It notes the largest trial included only male physicians and another followed people for a median of only 3.6 years. The NIH fact sheet says overall it is unclear whether multivitamins affect cancer risk.',
          cites: ['uspstf2022', 'ods2024'],
        },
        {
          title: 'Memory and thinking in older adults',
          strength: 'limited',
          text: 'The NIH fact sheet says a few studies found that older people who took a multivitamin for 1 to 3 years had better cognitive function and memory. It does not name the studies.',
          cites: ['ods2024'],
        },
        {
          title: 'Official recommendation',
          text: 'For healthy, non-pregnant adults, the USPSTF (June 2022) says the evidence is insufficient to weigh the benefits and harms of multivitamins for preventing cardiovascular disease or cancer (an “I” statement). It recommends against beta-carotene and vitamin E supplements for that purpose.',
          cites: ['uspstf2022'],
        },
      ],
      todo: [
        'Cognition: cite the trials themselves (the fact sheet doesn’t name them).',
        'Decide whether to mention AREDS (an eye formula, not a general multivitamin), with its own source.',
        'The strength groupings are Claude’s suggestion based on the USPSTF’s wording.',
      ],
    },
    {
      id: 'who',
      heading: 'Who might need specific nutrients',
      reviewed: false,
      items: [
        {
          title: 'Pregnancy and folic acid',
          text: 'The USPSTF recommends that anyone planning or able to become pregnant take 400 to 800 mcg of folic acid a day. The NIH fact sheet says a prenatal multivitamin helps cover folic acid, iron, iodine and vitamin D.',
          cites: ['uspstf2022', 'ods2024'],
        },
        {
          title: 'Over 50 and vitamin B12',
          text: 'The NIH fact sheet says people over 50 should get B12 from fortified foods or supplements, because the body might not absorb enough of the B12 in food.',
          cites: ['ods2024'],
        },
        {
          title: 'Restricted diets',
          text: 'The fact sheet says people who don’t get enough nutrients from food, eat very low-calorie diets, have a poor appetite or avoid certain foods (such as vegans) might consider a multivitamin.',
          cites: ['ods2024'],
        },
      ],
      todo: [],
    },
    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Basic multivitamins and upper limits',
          text: 'The NIH fact sheet says a basic multivitamin is unlikely to harm your health, but adding fortified foods and other supplements can push some nutrients over their upper limits. Products above recommended amounts raise the risk of too much iron, vitamin A, zinc, niacin and folic acid.',
          cites: ['ods2024'],
        },
        {
          title: 'Smokers and beta-carotene',
          text: 'The fact sheet says smokers, and perhaps former smokers, should avoid multivitamins with large amounts of beta-carotene or vitamin A. The USPSTF reports two trials in smokers or asbestos-exposed workers where beta-carotene raised lung cancer risk.',
          cites: ['ods2024', 'uspstf2022'],
        },
        {
          title: 'Warfarin and vitamin K',
          text: 'The fact sheet says basic multivitamins don’t usually interact with medicines, except that people on warfarin should talk to their provider before taking one with vitamin K.',
          cites: ['ods2024'],
        },
      ],
      todo: ['Cover high vitamin A in pregnancy with a source beyond the consumer fact sheet.'],
    },
  ],

  citations: {
    uspstf2022: {
      authors: 'US Preventive Services Task Force',
      title: 'Vitamin, Mineral, and Multivitamin Supplementation to Prevent Cardiovascular Disease and Cancer: Final Recommendation Statement (June 21, 2022).',
      journal: 'JAMA', // volume and pages not shown on the page read; add from PubMed
      year: 2022,
      doi: '10.1001/jama.2022.8970',
      source_url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/vitamin-supplementation-to-prevent-cvd-and-cancer-preventive-medication',
      read: 'full_text', // page was cut off before Practice Considerations and references
      design: 'review',
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
    ods2024: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Multivitamin/mineral Supplements Fact Sheet for Consumers (updated February 15, 2024).',
      journal: 'ods.od.nih.gov',
      year: 2024,
      source_url: 'https://ods.od.nih.gov/factsheets/Mvms-Consumer/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-22',
      entered_by: 'claude',
    },
  },
};
