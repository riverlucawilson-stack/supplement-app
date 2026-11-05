// Probiotics evidence page: every sentence and citation for /probiotics/evidence/.
//
// HOW THIS WAS DRAFTED (2026-11-05): Claude summarized only text read word for word on
// the NCCIH page "Probiotics: Usefulness and Safety". Nothing is from memory. Strength
// groupings are Claude's suggestion, following the page's own certainty words. Every
// section is reviewed: false, so the page stays off the site until River approves it
// (edit here, then run `npm run evidence-drafts`).
import type { EvidencePage } from './types';

export const probioticsEvidence: EvidencePage = {
  category: 'probiotics',
  title: 'What the research says about probiotic supplements',
  description:
    'What probiotic supplements do and don’t do according to the NIH’s complementary health center, why results depend on the strain, and who should be careful, with every point linked to its source.',
  lede: 'Research on probiotics is about specific strains, so a result for one product doesn’t carry over to another. Each point below summarizes the NIH page linked at the bottom.',

  sections: [
    {
      id: 'what-it-is',
      heading: 'What probiotics are',
      reviewed: false,
      items: [
        {
          title: 'Live microorganisms, and the strain matters',
          text: 'The NIH page describes probiotics as live microorganisms intended to have health benefits. It says different types may have different effects: if one kind of Lactobacillus helps prevent an illness, another Lactobacillus or any Bifidobacterium won’t necessarily do the same. It adds that in most cases we still don’t know which probiotics help, how much to take, or who would benefit most.',
          cites: ['nccih'],
        },
      ],
    },

    {
      id: 'what-it-helps',
      heading: 'What it can and can’t help with',
      reviewed: false,
      intro:
        'Grouped by how the NIH page describes the research. Results come from studies of particular strains, often in hospital or clinical settings, not from the products compared on this site.',
      items: [
        {
          title: 'C. difficile diarrhea while taking antibiotics',
          strength: 'moderate',
          text: 'The NIH page says it is moderately certain that probiotics can reduce the risk of C. difficile diarrhea in adults and children taking antibiotics, but the best strain, dose and duration are uncertain.',
          cites: ['nccih'],
        },
        {
          title: 'Antibiotic-associated diarrhea',
          strength: 'moderate',
          text: 'The NIH page says a 2017 review of 17 studies linked probiotics taken with antibiotics to about half the likelihood of antibiotic-associated diarrhea, a tentative conclusion because study quality was moderate. A benefit hasn’t been shown in elderly people; in children it found moderate-quality evidence of protection.',
          cites: ['nccih'],
        },
        {
          title: 'Necrotizing enterocolitis and sepsis in premature infants',
          strength: 'moderate',
          text: 'The NIH page says reviews found probiotics helped prevent necrotizing enterocolitis in very-low-birth-weight infants (though not every study showed a benefit) and reduced the risk of sepsis in premature infants. It also says the FDA warned in 2023 that premature infants given probiotics are at risk of severe, potentially fatal infections. This is a hospital decision, not a supplement purchase.',
          cites: ['nccih'],
        },
        {
          title: 'Ulcerative colitis',
          strength: 'limited',
          text: 'The NIH page says a 2014 review indicated adding probiotics to conventional treatment could help bring on or keep remission. It found no evidence of benefit for Crohn’s disease.',
          cites: ['nccih'],
        },
        {
          title: 'Infant colic (one strain)',
          strength: 'limited',
          text: 'The NIH page says a 2018 review linked Lactobacillus reuteri DSM 17938 to successful colic treatment, mainly in exclusively breastfed infants.',
          cites: ['nccih'],
        },
        {
          title: 'Irritable bowel syndrome',
          strength: 'limited',
          text: 'The NIH page says a 2018 review of 53 studies concluded probiotics may help overall IBS symptoms and abdominal pain, but definite conclusions weren’t possible.',
          cites: ['nccih'],
        },
        {
          title: 'Other conditions with some early evidence',
          strength: 'limited',
          text: 'The NIH page describes some or low-quality evidence for constipation in adults (especially Bifidobacterium lactis), periodontal disease, allergic rhinitis, hepatic encephalopathy, eczema prevention in infants, and fewer and shorter upper respiratory infections.',
          cites: ['nccih'],
        },
        {
          title: 'Traveler’s diarrhea',
          strength: 'limited',
          text: 'The NIH page says a 2018 review found they may help but didn’t assess study quality, and a 2017 guideline found insufficient evidence to recommend probiotics to prevent or treat traveler’s diarrhea.',
          cites: ['nccih'],
        },
        {
          title: 'Inconclusive or not supported',
          strength: 'not_supported',
          text: 'The NIH page says reviews found no beneficial effect for preventing urinary tract infections, no evidence of help for constipation in children or for Crohn’s disease, no consistent benefit for treating eczema, and inconclusive results for asthma, acne, dental cavities, diverticular disease and diarrhea from cancer treatment.',
          cites: ['nccih'],
        },
      ],
      todo: [
        'Confirm or change each strength grouping. Consider splitting "inconclusive" from "no benefit found".',
        'Look for a newer source (e.g. the ODS probiotics fact sheet) and compare.',
      ],
    },

    {
      id: 'safety',
      heading: 'Safety',
      reviewed: false,
      items: [
        {
          title: 'Who should be careful',
          text: 'The NIH page says probiotics have a long history of apparently safe use in healthy people, but few studies have looked at safety in detail. The risk of harm is greater for people with severe illnesses or weakened immune systems, who should be monitored closely, and for premature infants.',
          cites: ['nccih'],
        },
        {
          title: 'Possible harms',
          text: 'The NIH page lists infections, harmful substances made by the microorganisms, and transfer of antibiotic-resistance genes to other gut microorganisms as possible harms.',
          cites: ['nccih'],
        },
        {
          title: 'What’s in the bottle',
          text: 'The NIH page says some probiotic products have been found to contain microorganisms other than those on the label, and in some cases these contaminants may pose serious health risks.',
          cites: ['nccih'],
        },
      ],
      todo: [
        'Read the page’s “Last Updated” date and fix the citation year (2023 is a placeholder: the page mentions a 2023 FDA warning; a fetch summary said August 2019 but that wasn’t in the page text read).',
        'CFU guarantees, storage and survival to expiration: not on the NIH page. Source before adding anything.',
      ],
    },
  ],

  citations: {
    nccih: {
      authors: 'National Center for Complementary and Integrative Health (NIH)',
      title: 'Probiotics: Usefulness and Safety.',
      journal: 'nccih.nih.gov',
      // CHECK: no "Last Updated" line was read. The page cites a 2023 FDA warning, so it is
      // from 2023 or later; 2023 is a placeholder until the date is read on the page.
      year: 2023,
      source_url: 'https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety',
      read: 'full_text',
      design: 'government',
      date_checked: '2026-11-05',
      entered_by: 'claude',
    },
  },
};
