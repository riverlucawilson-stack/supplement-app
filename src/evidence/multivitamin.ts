// Multivitamin evidence page: every sentence and citation shown on /multivitamin/evidence/.
//
// HOW THIS WAS WRITTEN: Claude summarized only what the listed sources say (the NIH
// consumer and Health Professional fact sheets, the FDA Daily Value page and the
// 2022 USPSTF recommendation page). Nothing is from memory. The USPSTF page was cut
// off partway, so its Practice Considerations and reference list weren't read.
// River delegated approval on 2026-10-24 ("Work through the evidence todos and
// approve them"), so sections are marked reviewed. Open follow-ups are in ROADMAP.md.
// Citations keep entered_by until someone checks them on PubMed or the source page.
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
      reviewed: true,
      items: [
        {
          title: 'No standard formula',
          text: 'The NIH fact sheet says multivitamin/mineral supplements combine vitamins and minerals, sometimes with other ingredients, and that there is no standard product or standard list of ingredients. That is why this site compares them by cost per daily serving and lists the nutrient count and forms beside it, rather than by one nutrient.',
          cites: ['ods2024'],
        },
        {
          title: 'Reading %DV on the label',
          text: 'The FDA says the %DV is how much one serving contributes to your daily diet, compared with the Daily Value, the recommended amount to eat (or not exceed) each day. As a general guide, 5% DV or less per serving is low and 20% DV or more is high.',
          cites: ['fda2024'],
          facts: [
            { label: 'Low', value: '5% DV or less per serving' },
            { label: 'High', value: '20% DV or more per serving' },
          ],
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
          text: 'The NIH Health Professional fact sheet describes three studies within the COSMOS trial of older adults (mean ages 69 to 73). In COSMOS-Mind (2,262 people, 3 years) a daily multivitamin improved global cognition, most in people with a history of cardiovascular disease. In COSMOS-Web (3,562 people) memory was better at 1 year and across 3 years. In COSMOS-Clinic (573 people) episodic memory improved over 2 years, but executive function and attention did not. A meta-analysis of the three (more than 5,000 people) found improved global cognition and episodic memory. The earlier Physicians’ Health Study II found no effect on cognitive decline.',
          cites: ['odshp2024'],
        },
        {
          title: 'Eye disease (AREDS formula)',
          strength: 'moderate',
          text: 'AREDS is a high-dose eye formula, not a general multivitamin. In 4,757 people aged 55 to 80 followed for about 6.3 years, daily vitamin C (500 mg), vitamin E (400 IU), beta-carotene (15 mg), zinc (80 mg) and copper (2 mg) cut the risk of going from intermediate to advanced age-related macular degeneration by 28% and vision loss by 27%. It did not prevent macular degeneration from starting or change cataract risk. AREDS2 (4,203 people) found adding omega-3s or lutein/zeaxanthin gave no further benefit, and beta-carotene was not a required ingredient.',
          cites: ['odshp2024'],
        },
        {
          title: 'Official recommendation',
          text: 'For healthy, non-pregnant adults, the USPSTF (June 2022) says the evidence is insufficient to weigh the benefits and harms of multivitamins for preventing cardiovascular disease or cancer (an “I” statement). It recommends against beta-carotene and vitamin E supplements for that purpose.',
          cites: ['uspstf2022'],
        },
      ],
    },
    {
      id: 'who',
      heading: 'Who might need specific nutrients',
      reviewed: true,
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
    },
    {
      id: 'safety',
      heading: 'Safety',
      reviewed: true,
      items: [
        {
          title: 'Basic multivitamins and upper limits',
          text: 'The NIH fact sheet says a basic multivitamin is unlikely to harm your health, but adding fortified foods and other supplements can push some nutrients over their upper limits. Products above recommended amounts raise the risk of too much iron, vitamin A, zinc, niacin and folic acid.',
          cites: ['ods2024'],
        },
        {
          title: 'Vitamin A in pregnancy',
          text: 'The Health Professional fact sheet says too much preformed vitamin A (retinol and similar forms, but not beta-carotene) in pregnancy can raise the risk of birth defects. The upper limit in pregnancy is 3,000 mcg a day for women and 2,800 mcg for adolescents. Prenatal supplements generally provide no vitamin A as retinol.',
          cites: ['odshp2024'],
        },
        {
          title: 'Smokers and beta-carotene',
          text: 'The fact sheet says smokers, and perhaps former smokers, should avoid multivitamins with large amounts of beta-carotene or vitamin A. In one trial of 29,133 male smokers, 20 mg of beta-carotene a day was followed by 18% more lung cancer over 5 to 8 years. In another of 18,314 smokers, former smokers and asbestos-exposed workers, beta-carotene with vitamin A raised lung cancer risk by 28% after about 4 years.',
          cites: ['ods2024', 'odshp2024', 'uspstf2022'],
        },
        {
          title: 'Warfarin and vitamin K',
          text: 'The fact sheet says basic multivitamins don’t usually interact with medicines, except that people on warfarin should talk to their provider before taking one with vitamin K.',
          cites: ['ods2024'],
        },
      ],
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
    odshp2024: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Multivitamin/mineral Supplements Fact Sheet for Health Professionals (updated July 17, 2024).',
      journal: 'ods.od.nih.gov',
      year: 2024,
      source_url: 'https://ods.od.nih.gov/factsheets/MVMS-HealthProfessional/',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-24',
      entered_by: 'claude',
    },
    fda2024: {
      authors: 'US Food and Drug Administration',
      title: 'Daily Value on the Nutrition and Supplement Facts Labels (content current as of March 5, 2024).',
      journal: 'fda.gov',
      year: 2024,
      source_url: 'https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-10-24',
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
