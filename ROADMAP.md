# Roadmap

Work in shifts. One unit at a time; mark it IN PROGRESS before starting, check it off
when `npm run build:brief` passes (it runs validate too; same pass/fail as `npm run build`), log it in SESSION-LOG.md, and commit
as "checkpoint: <unit>". CLAUDE.md wins any conflict with this file.
Since 2026-10-21 River lets Claude make project decisions without asking; log each one in SESSION-LOG.md.
Still River's: approving evidence/health text (delegated to Claude on 2026-10-24 for the current to-dos), and the first deploy (River approved 2026-10-24; needs River's Cloudflare login).

Finished stages (A–E) and each category's research notes are in docs/roadmap-done.md (moved 2026-11-10).
Before an extra batch, read just that category's notes: `grep -n -i "<category>" docs/roadmap-done.md`.

## IN PROGRESS
- Nothing. Stage E is done; shift stopped 2026-11-05 (see Next up).

## WAITING ON RIVER
1. Installable app (drafts/pwa-plan.md): A (installable only), B (installable + offline pages), or neither? I recommend A.
2. Probiotics method (drafts/probiotics-method.md): built and published 2026-11-05 with cost per daily serving, strains, CFU, guarantee type and storage shown beside it. Say if you want B or C instead.
3. Melatonin method (drafts/melatonin-method.md): published 2026-11-05 comparing by cost per daily serving with the labeled mg shown beside it (not price per mg, which ranks megadoses best). Say if you want B or C instead.

## Next up
- [x] Refresh 2026-11-05: Double Wood KSM-66 (no newer dated COA found; prices re-checked).
- Supplement Facts panel (other thread's component) doesn't list other actives yet, e.g. OLLY melatonin's L-theanine and herbs show only in the summary line.
- Retry USP Verified lookups (quality-supplements.org wouldn't load 2026-11-05), starting with Nature Made.
- D6 link-check script, then D7 launch checklist and D8 PWA proposal.
- Extra product batches continue with fish oil, then protein powder, multivitamin, C, B12, K2.
- Stage E 1: CoQ10 category config, then its batches.

- [x] First deploy (2026-10-24): live at https://sup-search-doo.pages.dev, redeploys on every push to claude/project-thread-6g8ebj. Optional: deploy hook for a daily rebuild so stale-price warnings update (README).
- [x] Evidence to-dos and approval for all 10 categories (2026-10-24, River delegated approval). All evidence pages are live.

## Evidence follow-ups (not on the site; couldn't be sourced word for word)
- All: check each `entered_by: claude` citation on PubMed or the source page, then delete the line. Fill in "Updated" dates where the fact sheet text read didn't show one.
- Creatine: older-adults and upper-body strength meta-analyses (Devries & Phillips 2014, PMID 24576864; Lanhers 2017); who should talk to a doctor first (River's call). Antonio 2021 and Kreider 2017 authors report creatine-industry ties.
- Ashwagandha: 2025 BJPsych Open review (PMID 41140145) and 2025 cortisol meta-analysis (PMID 40746175); autoimmune conditions (not in the NIH fact sheet).
- Vitamin D: steroid and thiazide interaction details (fact sheet text cut off); trial-based all-cause mortality meta-analysis.
- Magnesium: glycinate absorption (not in the fact sheet).
- Fish oil: triglyceride effect size by dose, American Heart Association advice, depression/joint/eye outcomes, fish allergy, oxidation (only seen in a summary or not found).
- Protein powder: adult RDA (0.8 g/kg not seen word for word), whey vs casein vs plant, heavy metals from a primary testing source, kidney disease and milk/soy allergy.
- Vitamin C: English Cochrane abstract (Hemilä 2013, PMC8078152) for confidence intervals; liposomal vitamin C.
- Vitamin B12: upper limit reason, and heart/cognition/energy meta-analyses from the Health Professional fact sheet (only seen in a summary).
- Vitamin K2: upper limit, antibiotic/bile acid sequestrant/orlistat interactions, a K2 randomized trial on artery calcification, the 2022 K2 meta-analysis (doi 10.3389/fpubh.2022.979649); find an MK-4 product.
- Multivitamin: iron overdose in children (not in the fact sheet).

## Adding a new category (definition of done, from Stage C)
A category is done when it has:
1. a category config
2. 8–12 products researched and audited, in batches of up to 5
3. a comparison page
4. product pages
5. a claims-review pass
6. an evidence draft for River's review (drafts/evidence/<category>.md, NEEDS RIVER REVIEW)

## Ongoing: more products for every category (River, 2026-10-24)
"Continue to add comparison products for all supplement categories as you progress with the same criteria."
Same inclusion rule and TEAM.md Mission 1 (up to 5 per batch, researcher + auditor). Alternate these batches with Stage D/E units.
- [x] Creatine (46, skipped: already past 12)  - [x] Ashwagandha (28, skipped)  - [x] Vitamin D (2026-10-24: +5, 14 total)  - [x] Magnesium (2026-10-24: +5, 14 total)  - [x] Fish oil (2026-11-05: +3, 13 total)  - [ ] Protein powder
- [ ] Multivitamin  - [ ] Vitamin C  - [ ] Vitamin B12  - [ ] Vitamin K2 (try to find an MK-4 product)
(A box is checked once a category has had one extra batch; the list then starts over.)

## Still open from Stage D (full stage in docs/roadmap-done.md)
- [ ] D9 "How to read a COA" page: template with DRAFT - NEEDS REVIEW placeholders (CLAUDE.md page 4), built only once River writes it.
- [ ] D10 About page: template with placeholders (CLAUDE.md page 6).

## Ingredient grades and product photos (2026-11-05, River's request)
- [x] Ingredient grade A–D from sourced rules in ingredients/flags.yaml (7 rules, all entered_by: claude), shown on product pages, tables, and Methodology. Never affects ranking.
- [x] Supplement Facts-style panel rebuilt from each product file, ingredients grouped by role, flagged ones colored with the source.
- [x] Product photos for 83 of 167 products (Vitacost og:image, credited, entered_by: claude).
- [ ] River: check each rule in ingredients/flags.yaml against its source, then delete its entered_by line.
- [ ] River: look over the photos on the zinc, collagen, probiotics, curcumin and melatonin pages (added 2026-11-05 from each Vitacost page's og:image). Some Vitacost pages carry another product's meta tags, so an image may show the wrong product; Claude can't view images from this container.
- [ ] Photos for the 84 products without one (non-Vitacost stores, CoQ10, and fetch failures: double-wood-ksm-66, designs-for-sport, sports-research triple strength and K2, nature-made vitamin C 1000).
- [ ] Label (Supplement Facts) photos: only add when the store page identifies the image as the label.
- [ ] Set ingredients_confirmed: true where the full ingredient list was read, so empty lists get graded (about 39 products show "Not graded").
