// Creatine evidence page: every sentence and citation shown on /creatine/evidence/.
//
// HOW THIS WAS WRITTEN: Claude summarized only what the listed sources actually
// say (abstracts; the full text of Antonio 2021 and the first half of Kreider 2017;
// a table of the NIH exercise fact sheet). Nothing is from memory. The "strength
// of evidence" groupings are Claude's suggestion. River delegated approval on
// 2026-10-24 ("Work through the evidence todos and approve them"), so sections are
// marked reviewed. Open follow-ups are in ROADMAP.md.
// TO VERIFY A CITATION: check its details on PubMed, then delete `entered_by`.
// `npm run validate` lists everything still waiting.
import type { EvidencePage } from './types';

export const creatineEvidence: EvidencePage = {
  category: 'creatine',
  title: 'What the research says about creatine',
  description:
    'How creatine works, what it does and doesn’t help with grouped by strength of evidence, research-based doses, and safety, with every claim linked to its study.',
  lede: 'Each point below summarizes specific studies, linked by number to the reference list at the bottom. Where the research is thin or mixed, we say so.',

  sections: [
    {
      id: 'how-it-works',
      heading: 'How creatine works',
      reviewed: true,
      items: [
        {
          title: 'Energy for short, hard efforts',
          text: 'The NIH exercise fact sheet says creatine helps supply muscles with energy for short, mostly anaerobic activity. It may help high-intensity, intermittent activity, but is of little value for endurance sports.',
          cites: ['odsexercise'],
        },
        {
          title: 'It raises the creatine stored in muscle',
          text: 'Taking 5 g of creatine monohydrate 4 to 6 times a day for 2 or more days raised total creatine in the thigh muscle of 17 people. The rise was biggest in those who started lowest, up to 50% in some. At least 20% of the creatine taken up was stored as phosphocreatine.',
          cites: ['harris1992'],
        },
        {
          title: 'Food only partly fills those stores',
          text: 'A normal diet with 1 to 2 g of creatine a day leaves muscle stores about 60 to 80% full. Supplementing raises muscle creatine and phosphocreatine by 20 to 40%.',
          cites: ['kreider2017'],
        },
        {
          title: 'Fuller stores help short, hard efforts',
          text: 'After loading, performance in high-intensity or repeated efforts generally improves by 10 to 20%, depending on how much phosphocreatine rises.',
          cites: ['kreider2017'],
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
          title: 'High-intensity and repeated efforts',
          strength: 'strong',
          text: 'The ISSN position stand calls creatine monohydrate the most effective supplement available to athletes for increasing high-intensity exercise capacity. Performance in repeated, high-intensity efforts generally improves 10 to 20% after loading.',
          cites: ['kreider2017'],
        },
        {
          title: 'Muscle mass and strength, alongside training',
          strength: 'strong',
          text: 'The same review lists greater gains in muscle mass and strength during training as a benefit, and calls creatine the most effective supplement for increasing lean body mass during training.',
          cites: ['kreider2017'],
        },
        {
          title: 'Sports beyond the weight room',
          strength: 'moderate',
          text: 'The position stand lists sports that may benefit, ranging from sprints, team sports such as soccer, basketball and hockey, and combat sports to 400 to 800 m events and endurance interval training.',
          cites: ['kreider2017'],
        },
        {
          title: 'Recovery after hard training',
          strength: 'limited',
          text: 'Individual studies cited in the position stand found better strength during recovery from muscle-damaging exercise, and lower blood markers of muscle damage, in people taking creatine.',
          cites: ['kreider2017'],
        },
        {
          title: 'Memory and reasoning',
          strength: 'limited',
          text: 'A review of 6 randomized trials (281 people) found creatine may improve short-term memory and reasoning in healthy people. Results for other kinds of thinking were mixed, young adults showed no change, and vegetarians responded better on memory tasks than meat-eaters.',
          cites: ['avgerinos2018'],
        },
        {
          title: 'Medical conditions',
          strength: 'limited',
          text: 'Researchers have studied creatine in muscular dystrophy, Parkinson’s and Huntington’s disease, diabetes, osteoarthritis, fibromyalgia, aging, and adolescent depression, among others. The position stand lists these as clinical uses that have been studied.',
          cites: ['kreider2017'],
        },
        {
          title: 'Women',
          strength: 'limited',
          text: 'The 2017 position stand notes that some studies suggest women may not gain as much strength or muscle mass in training with creatine as men. A 2021 review says creatine gives women a variety of benefits across their lifespan with few side effects, but notes creatine is handled differently in men and women and not all studies show better performance in women. In postmenopausal women, 5 g a day with 12 weeks of resistance training increased muscle mass and strength.',
          cites: ['kreider2017', 'antonio2021'],
        },
        {
          title: 'Hair loss',
          strength: 'not_supported',
          text: 'In a 12-week randomized trial of resistance-trained men taking 5 g a day, creatine did not change DHT, the DHT-to-testosterone ratio, hair density or hair thickness compared with placebo.',
          cites: ['lak2025'],
        },
      ],
    },

    {
      id: 'dosing',
      heading: 'Doses and protocols used in research',
      reviewed: true,
      intro:
        'These are the amounts studied in research, all with creatine monohydrate. They are not a personal recommendation; check with a professional first.',
      items: [
        {
          title: 'Loading, then maintenance (fastest)',
          text: 'Described by the ISSN as the most effective way to raise muscle creatine. In one study, 20 g a day for 6 days raised muscle creatine by about 20%.',
          cites: ['kreider2017', 'hultman1996'],
          facts: [
            { label: 'Loading dose', value: '5 g × 4 a day' },
            { label: 'By body weight', value: '~0.3 g/kg/day' },
            { label: 'Loading length', value: '5–7 days' },
            { label: 'Then', value: '3–5 g/day' },
          ],
        },
        {
          title: 'Steady daily dose (no loading)',
          text: 'Taking 3 g a day raised muscle creatine by a similar 20%, but gradually over 28 days. Until stores are full, it may have less effect on performance than loading.',
          cites: ['hultman1996', 'kreider2017'],
          facts: [
            { label: 'Daily dose', value: '3 g/day' },
            { label: 'Time to full stores', value: '~28 days' },
          ],
        },
        {
          title: 'Commonly recommended amount',
          text: 'A 2021 expert review describes creatine as well tolerated, especially at recommended doses of 3 to 5 g a day or 0.1 g per kg of body weight a day.',
          cites: ['antonio2021'],
          facts: [
            { label: 'Daily dose', value: '3–5 g/day' },
            { label: 'By body weight', value: '0.1 g/kg/day' },
          ],
        },
        {
          title: 'Larger athletes',
          text: 'Most people maintain full stores with 3 to 5 g a day, but some studies suggest larger athletes may need 5 to 10 g a day.',
          cites: ['kreider2017'],
        },
        {
          title: 'Taking it with food',
          text: 'Taking creatine with carbohydrate, or carbohydrate and protein, has been reported to lead to more consistent creatine retention in muscle.',
          cites: ['kreider2017'],
        },
        {
          title: 'When you stop',
          text: 'After stopping, muscle creatine gradually fell and was back to its starting level within 30 days. A 2 g daily dose was enough to hold the raised level for 30 days.',
          cites: ['hultman1996'],
        },
        {
          title: 'Vegetarians',
          text: 'Vegetarians have lower creatine stores in muscle, so they may see larger increases from supplementing.',
          cites: ['kreider2017'],
        },
      ],
    },

    {
      id: 'safety',
      heading: 'Safety',
      reviewed: true,
      items: [
        {
          title: 'Long-term use',
          text: 'The ISSN position stand concludes that short- and long-term use, up to 30 g a day for 5 years, has been safe and well tolerated in healthy people and in several patient groups from infants to older adults.',
          cites: ['kreider2017'],
        },
        {
          title: 'At usual doses',
          text: 'A 2021 expert review describes creatine as relatively well tolerated, especially at 3 to 5 g a day or 0.1 g per kg a day.',
          cites: ['antonio2021'],
        },
        {
          title: 'Hormones and hair',
          text: '12 weeks of 5 g a day did not change DHT or hair measures compared with placebo in resistance-trained men.',
          cites: ['lak2025'],
        },
        {
          title: 'Water and body weight',
          text: 'Loading typically adds 1 to 3 kg of body weight, mostly water. The 2021 review says some studies show more water inside muscle cells in the short term, while several others found no change in total body water, so creatine does not always cause water retention. The NIH fact sheet lists weight gain from water retention as a side effect.',
          cites: ['antonio2021', 'odsexercise'],
        },
        {
          title: 'Kidneys',
          text: 'The 2021 review concludes that creatine at recommended doses does not cause kidney damage in healthy people. It traces the concern to a 1998 case report of a patient who already had kidney disease. Creatine can raise blood creatinine, a lab marker of kidney function, usually within the normal range.',
          cites: ['antonio2021'],
        },
        {
          title: 'Cramping, dehydration and heat',
          text: 'The 2021 review concludes creatine does not cause dehydration or cramping. In a study of college football players, creatine users had less cramping, heat illness and dehydration than non-users. The NIH fact sheet notes anecdotal reports of nausea, diarrhea, cramps, muscle stiffness and heat intolerance.',
          cites: ['antonio2021', 'odsexercise'],
        },
        {
          title: 'Doses studied for safety',
          text: 'The NIH fact sheet reports few safety concerns at typical doses, such as a loading dose of 20 g a day for up to 7 days and 3 to 5 g a day for up to 12 weeks.',
          cites: ['odsexercise'],
        },
      ],
    },

    {
      id: 'myths',
      heading: 'Common myths',
      reviewed: true,
      intro:
        'A 2021 expert review set out to answer the most common questions about creatine, including water retention, steroids, kidney damage, hair loss, cramping, use by teens, fat gain, loading, older adults, women, and other forms of creatine.',
      items: [
        {
          title: '“Creatine makes your hair fall out”',
          text: 'The one trial that measured hair directly found no difference from placebo in hair density, thickness or DHT after 12 weeks.',
          cites: ['lak2025'],
        },
        {
          title: '“You have to do a loading phase”',
          text: 'Loading fills muscle stores in about a week. Taking 3 g a day reached a similar level in about 4 weeks without loading. The 2021 review concludes that 3 to 5 g a day works and a loading phase is not required, though loading may suit someone who wants results in under 30 days.',
          cites: ['hultman1996', 'kreider2017', 'antonio2021'],
        },
        {
          title: '“Creatine is a steroid”',
          text: 'Creatine has a completely different chemical structure from anabolic steroids and is not one.',
          cites: ['antonio2021'],
        },
        {
          title: '“Creatine damages your kidneys”',
          text: 'At recommended doses, the review found no kidney damage in healthy people (see Safety above).',
          cites: ['antonio2021'],
        },
        {
          title: '“Creatine makes you fat”',
          text: 'Creatine does not increase fat mass. In a meta-analysis of 19 trials in older adults (609 people), the creatine groups lost about 0.5 kg more fat than placebo, a difference that wasn’t significant.',
          cites: ['antonio2021'],
        },
        {
          title: '“Fancier forms work better”',
          text: 'The review found no peer-reviewed studies showing that other forms or salts of creatine raise muscle creatine more than the same amount of creatine monohydrate. It also says creatine isn’t stable in liquid, so ready-to-drink products have struggled to hold 3 to 5 g per serving.',
          cites: ['antonio2021'],
        },
        {
          title: '“Teens shouldn’t take it”',
          text: 'Based on limited evidence, the review says creatine appears generally safe and potentially beneficial for children and adolescents, and calls for more research.',
          cites: ['antonio2021'],
        },
        {
          title: '“It does nothing for older adults”',
          text: 'The review says most of the benefit in older adults comes from creatine combined with resistance training, though creatine alone can give some muscle and performance benefits.',
          cites: ['antonio2021'],
        },
        {
          title: '“It’s only for bodybuilders”',
          text: 'The research lists many sports that may benefit, including team sports, combat sports, middle-distance running and swimming, and endurance interval training.',
          cites: ['kreider2017'],
        },
      ],
    },
  ],

  citations: {
    kreider2017: {
      authors: 'Kreider RB, et al.',
      title:
        'International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine.',
      journal: 'J Int Soc Sports Nutr 14:18',
      year: 2017,
      pmid: '28615996',
      doi: '10.1186/s12970-017-0173-z',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/PMC5469049/fullTextXML',
      read: 'full_text',
      design: 'review', // Claude's reading of the title; check it
      date_checked: '2026-10-20',
      entered_by: 'claude',
    },
    antonio2021: {
      authors: 'Antonio J, et al.',
      title:
        'Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show?',
      journal: 'J Int Soc Sports Nutr 18(1)',
      year: 2021,
      pmid: '33557850',
      doi: '10.1186/s12970-021-00412-w',
      // Several authors report ties to creatine makers (Competing interests section).
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/PMC7871530/fullTextXML',
      read: 'full_text',
      design: 'review', // Claude's reading of the title; check it
      date_checked: '2026-10-24',
      entered_by: 'claude',
    },
    odsexercise: {
      authors: 'NIH Office of Dietary Supplements',
      title: 'Dietary Supplements for Exercise and Athletic Performance: Fact Sheet for Health Professionals (Table 1).',
      journal: 'ods.od.nih.gov',
      year: 2026, // year read; the "Updated" line wasn't in the text read
      source_url: 'https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/',
      read: 'full_text', // only Table 1 was read word for word
      design: 'government',
      date_checked: '2026-10-24',
      entered_by: 'claude',
    },
    hultman1996: {
      authors: 'Hultman E, et al.',
      title: 'Muscle creatine loading in men.',
      journal: 'J Appl Physiol 81(1):232-237',
      year: 1996,
      pmid: '8828669',
      doi: '10.1152/jappl.1996.81.1.232',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:8828669&resultType=core&format=json',
      read: 'abstract',
      design: 'unclear', // Claude's reading of the title; check it
      date_checked: '2026-10-20',
      entered_by: 'claude',
    },
    harris1992: {
      authors: 'Harris RC, et al.',
      title:
        'Elevation of creatine in resting and exercised muscle of normal subjects by creatine supplementation.',
      journal: 'Clin Sci (Lond) 83(3):367-374',
      year: 1992,
      pmid: '1327657',
      doi: '10.1042/cs0830367',
      source_url: 'https://pubmed.ncbi.nlm.nih.gov/1327657/',
      read: 'abstract',
      design: 'unclear', // Claude's reading of the title; check it
      date_checked: '2026-10-20',
      entered_by: 'claude',
    },
    avgerinos2018: {
      authors: 'Avgerinos KI, et al.',
      title:
        'Effects of creatine supplementation on cognitive function of healthy individuals: A systematic review of randomized controlled trials.',
      journal: 'Exp Gerontol 108:166-173',
      year: 2018,
      pmid: '29704637',
      doi: '10.1016/j.exger.2018.04.013',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:29704637&resultType=core&format=json',
      read: 'abstract',
      design: 'meta_analysis', // Claude's reading of the title; check it
      date_checked: '2026-10-20',
      entered_by: 'claude',
    },
    lak2025: {
      authors: 'Lak M, et al.',
      title: 'Does creatine cause hair loss? A 12-week randomized controlled trial.',
      journal: 'J Int Soc Sports Nutr 22(sup1):2495229',
      year: 2025,
      pmid: '40265319',
      doi: '10.1080/15502783.2025.2495229',
      source_url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:40265319&resultType=core&format=json',
      read: 'abstract',
      design: 'rct', // Claude's reading of the title; check it
      date_checked: '2026-10-20',
      entered_by: 'claude',
    },
  },
};
