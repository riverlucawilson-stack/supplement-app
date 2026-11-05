# Roadmap

Work in shifts. One unit at a time; mark it IN PROGRESS before starting, check it off
when `npm run validate` and `npm run build` pass, log it in SESSION-LOG.md, and commit
as "checkpoint: <unit>". CLAUDE.md wins any conflict with this file.
Since 2026-10-21 River lets Claude make project decisions without asking; log each one in SESSION-LOG.md.
Still River's: approving evidence/health text (delegated to Claude on 2026-10-24 for the current to-dos), and the first deploy (River approved 2026-10-24; needs River's Cloudflare login).

## IN PROGRESS
- Melatonin category config (method per drafts/melatonin-method.md, option A).

## WAITING ON RIVER
1. Installable app (drafts/pwa-plan.md): A (installable only), B (installable + offline pages), or neither? I recommend A.
2. Probiotics method (drafts/probiotics-method.md): built and published 2026-11-05 with cost per daily serving, strains, CFU, guarantee type and storage shown beside it. Say if you want B or C instead.
3. Melatonin method (drafts/melatonin-method.md): OK to compare by cost per daily serving with the labeled mg shown beside it (not price per mg, which ranks megadoses best)? Building it this way after calcium unless you say otherwise.

## Next up
- [x] Refresh 2026-11-05: Double Wood KSM-66 (no newer dated COA found; prices re-checked).
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

## Already built before this roadmap existed (2026-10-21)
- [x] Phase (a): project setup, data format (PR #1)
- [x] Phase (b): calculations and validation script (PR #2)
- [x] Phase (c): home page comparison table (PR #3)
- [x] Phase (e) part 1: creatine evidence page, Claude-drafted, needs River's review (PR #4)
- [x] 46 creatine products, all `entered_by: claude` (PR #5)
- [x] Ashwagandha category, 28 products, cost per 600 mg as labeled, draft evidence page (PR #6).
      Not in the queue below; River approved it in an earlier session.
- Note: categories already share src/components/CategoryPage.astro and EvidencePage.astro.
  A category today is src/categories/<id>.ts + src/content/products/<id>/ + two page files.

## Stage A: finish creatine end to end
Finish CLAUDE.md phases (a) through (d) for creatine, in order, so one category is
fully working and launchable before any others exist.
- [x] (a) project setup, data format, sample products
- [x] (b) calculations and validation script
- [x] (c) home page table
- [x] (d) product pages at /creatine/<product>/ (2026-10-21)

## Stage B: make the site multi-category
Propose how to generalize from creatine, but don't build it yet. Cover:
- a categories/<slug>.yaml file per category, holding:
  - its comparison unit and what counts toward it
  - which forms to record
  - which certifications and tests matter
- routes /<category>/ and /<category>/<product>/
- how validation and tiers apply per category
- [x] Write the proposal to drafts/multi-category-plan.md and STOP for River's approval. (written 2026-10-21, waiting)
- [x] River approved 2026-10-21 (all 5 questions yes: creatine moves to /creatine/, evidence drafts off the site, no daily amount unless River gives one, keep ashwagandha).
- [x] B1 snapshot every product's numbers (tests/fixtures/before-migration.json)
- [x] B2 YAML category loader; migrate creatine
- [x] B3 migrate ashwagandha
- [x] B4 generic routes, creatine to /creatine/, home page lists categories
- [x] B5 evidence drafts to drafts/evidence/, pages built only once fully reviewed
- [x] Draft TEAM.md (River approved 2026-10-21)

## Stage C: categories, most purchased first
A category is done when it has:
1. a category config
2. 8–12 products researched and audited, in batches of up to 5
3. a comparison page
4. product pages
5. a claims-review pass
6. an evidence draft for River's review (drafts/evidence/<category>.md, NEEDS RIVER REVIEW)

- [x] 1. Vitamin D: $ per 1,000 IU (25 mcg). Record D3 vs D2, carrier oil, any added K2.
  - [x] category config: categories/vitamin-d.yaml (status: draft) + templates/vitamin-d-product.yaml
  - [x] batch 1: Nature Made D3 2000, NOW D3 5000, Thorne D-5000, Sports Research D3+K2 (no price yet); Kirkland skipped
  - [x] batch 2: Nature's Bounty D3 5000, Pure Encapsulations D3 5000, Carlson Super Daily D3 drops, Klean-D 5000 (NSF), Nordic Naturals D3 gummies  - [x] batch 3 not needed for now (9 products, 8 priced)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass (2026-10-21: no health wording in data or pages)  - [x] evidence draft: drafts/evidence/vitamin-d.md (2 papers read; to-dos list what's still unsourced). NEEDS RIVER REVIEW.
  - [x] published the category (2026-10-21); its evidence page stays off until River reviews it
- [x] 2. Magnesium: $ per 100 mg elemental magnesium, taken from the Supplement Facts panel,
      never from compound weight. Record the form (glycinate, citrate, oxide, malate, threonate, etc.).
  - [x] category config: categories/magnesium.yaml (status: draft) + templates/magnesium-product.yaml
  - [x] batch 1: Doctor's Best, Nature Made oxide, Thorne bisglycinate, Pure Encapsulations (Natural Vitality Calm skipped)
  - [x] batch 2: NOW citrate, Neuro-Mag, Nature's Bounty 500, Klean Magnesium, Nature Made glycinate (9 total, batch 3 not needed)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass
  - [x] evidence draft (drafts/evidence/magnesium.md, NEEDS RIVER REVIEW) + category published
- [x] 3. Fish oil / omega-3 (River approved IFOS as a tier-counting certification, 2026-10-21): $ per 1,000 mg EPA+DHA combined, not total oil. Record the form
      (TG, rTG or EE), any published oxidation (TOTOX) results, and IFOS or similar certification.
  - [x] category config: categories/fish-oil.yaml (status: draft) + templates/fish-oil-product.yaml
  - [x] batch 1: Nordic Naturals Ultimate Omega, Nature Made 1200 mg (no price), Sports Research Triple Strength, NOW Ultra Omega-3, Carlson Very Finest liquid
  - [x] batch 2: Thorne Super EPA, Klean Omega (NSF, Tier B), Life Extension Super Omega-3, Viva Naturals (no price), Nordic Ultimate Omega 2X (10 total)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass
  - [x] evidence draft (drafts/evidence/fish-oil.md, NEEDS RIVER REVIEW) + category published
- [x] 4. Protein powder: $ per 25 g protein. Record the protein source, heavy-metal testing,
      and NSF Certified for Sport or Informed Sport.
  - [x] category config: categories/protein-powder.yaml (status: draft) + templates/protein-powder-product.yaml
  - [x] batch 1: Optimum Nutrition Gold Standard, Thorne Whey Isolate (NSF, Tier B), Orgain Organic (Dymatize ISO100 and Transparent Labs skipped)
  - [x] batch 2: Klean Isolate chocolate, Garden of Life Sport plant, NOW Sports Whey Isolate (Momentous and Naked skipped; 6 total)
  - [x] batch 3: Vega Performance Protein + Recovery (NSF, Tier B, CHECK), Nutricost Whey Isolate, Orgain Grass-Fed Whey (Garden of Life whey skipped; 9 total)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass
  - [x] evidence draft (drafts/evidence/protein-powder.md, NEEDS RIVER REVIEW) + category published
- [x] 5. Multivitamin: no single comparison unit. Propose a method first (for example
      $ per daily serving plus nutrient forms and %DV), then stop for River's approval.
      River approved 2026-10-22: sort by cost per daily serving; show nutrients at 100% DV and folate/B12/D forms beside it.
  - [x] category config: categories/multivitamin.yaml (status: draft, new per-serving comparison mode) + template
  - [x] batch 1: Centrum Adults, Nature Made Multi, Thorne Basic Nutrients 2/Day (NSF, Tier B, CHECK), Garden of Life mykind Women's (One A Day Men's skipped)
  - [x] batch 2: Nature Made Multi for Her, NOW Eve, Pure Encapsulations O.N.E., SmartyPants Men's Plus (Centrum Silver Women skipped; 8 total)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass
  - [x] evidence draft (drafts/evidence/multivitamin.md, NEEDS RIVER REVIEW); category published
- [x] 6. Vitamin C: $ per 500 mg.
  - [x] category config: categories/vitamin-c.yaml (status: draft) + template
  - [x] batch 1: Nature Made C 1,000 mg, NOW C-1000 with Rose Hips, Thorne Vitamin C with Flavonoids (LivOn and Nordic Naturals Sport skipped)
  - [x] batch 2: Nature's Bounty C 500 mg, NOW Buffered C-1000 Complex, Emergen-C Super Orange (Solgar 90 and Klean-C skipped)
  - [x] batch 3: Garden of Life RAW C, Solgar Ester-C Plus 180, Nature's Bounty C 1,000 mg (Nature Made Chewable skipped; 9 total)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass
  - [x] evidence draft (drafts/evidence/vitamin-c.md, NEEDS RIVER REVIEW); category published
- [x] 7. Vitamin B12: $ per 1,000 mcg. Record the form (methyl, cyano, adenosyl or hydroxo).
  - [x] category config: categories/vitamin-b12.yaml (status: draft) + template
  - [x] batch 1: Nature Made B12 softgels, NOW Methyl B-12 lozenges, Jarrow Methyl B-12 chewables, Solgar Sublingual 5,000 mcg, Garden of Life B-12 spray
  - [x] batch 2: Nature's Bounty B-12 200, Thorne Vitamin B12, Pure Encapsulations Methylcobalamin (Country Life skipped; 8 total)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass
  - [x] evidence draft (drafts/evidence/vitamin-b12.md, NEEDS RIVER REVIEW); category published
- [x] 8. Vitamin K2: $ per 100 mcg. Record MK-7 vs MK-4.
  - [x] category config: categories/vitamin-k2.yaml (status: draft) + template
  - [x] batch 1: NOW MK-7, Sports Research K2, Doctor's Best K2 MK-7, Jarrow MK-7
  - [x] batch 2: Life Extension Low Dose K2, MegaFood D3 & K2, NaturesPlus Source of Life K2, Enzymedica D3 + K2 (8 total)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass
  - [x] evidence draft (drafts/evidence/vitamin-k2.md, NEEDS RIVER REVIEW); category published

## Ongoing: more products for every category (River, 2026-10-24)
"Continue to add comparison products for all supplement categories as you progress with the same criteria."
Same inclusion rule and TEAM.md Mission 1 (up to 5 per batch, researcher + auditor). Alternate these batches with Stage D/E units.
- [x] Creatine (46, skipped: already past 12)  - [x] Ashwagandha (28, skipped)  - [x] Vitamin D (2026-10-24: +5, 14 total)  - [x] Magnesium (2026-10-24: +5, 14 total)  - [x] Fish oil (2026-11-05: +3, 13 total)  - [ ] Protein powder
- [ ] Multivitamin  - [ ] Vitamin C  - [ ] Vitamin B12  - [ ] Vitamin K2 (try to find an MK-4 product)
(A box is checked once a category has had one extra batch; the list then starts over.)

## Stage D: launch readiness (build it; never deploy)
- [x] D1 Freshness check (2026-10-24): validate already warned on stale prices, COAs (incl. test results) and certification checks; now also lists the 10 stalest items. Limits come from src/settings.ts (see WAITING ON RIVER 1).
- [x] D2 Methodology (River approved 2026-11-05; built at /methodology/, draft removed): drafts/methodology.md (each category's comparison unit and math, tier rules exactly as CLAUDE.md states them, what "date checked" means, what the site doesn't cover). NEEDS RIVER REVIEW; build the page only after approval.
- [x] D3 Affiliate disclosure (2026-11-05: River says the site earns no commission; every page now says so above all links) on every page with a buy link, shown before the first link (CLAUDE.md's wording, or draft wording and wait). Checked 2026-10-24: BaseLayout already shows it on every page above all page content and buy links; CLAUDE.md has no wording, so the text waits on WAITING ON RIVER 4.
- [x] D4 Phone-width pass (2026-10-24; all 170 pages pass at 375 px in light and dark): tables usable at 375 px, heading order, alt text, color contrast.
- [x] D5 Search basics (2026-10-24; 170 pages checked, robots.txt added): unique title and meta description per page, sitemap, canonical URLs.
- [x] D6 Link check (2026-11-05, `npm run links`; logic tested against a local server; this cloud container's proxy blocks every outside site, so run it on your computer): separate npm script (not part of validate) that checks source and buy URLs respond; 404 = dead, 403/429 = couldn't check.
- [x] D7 Launch checklist (2026-11-05, drafts/launch-checklist.md, NEEDS RIVER REVIEW): drafts/launch-checklist.md (hosting, domain, each affiliate program and its disclosure wording, privacy policy if analytics/cookies, approving evidence drafts).
- [x] D8 PWA proposal (2026-11-05, drafts/pwa-plan.md; recommends manifest-only or nothing): drafts/pwa-plan.md (what it adds, what it costs to maintain). Don't build.
- [ ] D9 "How to read a COA" page: template with DRAFT - NEEDS REVIEW placeholders (CLAUDE.md page 4), built only once River writes it.
- [ ] D10 About page: template with placeholders (CLAUDE.md page 6).

## Stage E: next categories, most purchased first
Same definition of done as Stage C.
- [x] 1. CoQ10: $ per 100 mg. Record ubiquinone vs ubiquinol and compare each at its labeled amount, without converting between them. Leave MitoQ out.
  - [x] category config: categories/coq10.yaml (status: draft) + templates/coq10-product.yaml (2026-11-05)
  - [x] batch 1: Qunol Ultra, Nature Made 200 mg, Doctor's Best with BioPerine, Jarrow QH-absorb (ubiquinol), Sports Research USP Grade (2026-11-05)
  - [x] batch 2: NOW CoQ10, Qunol Mega Ubiquinol, Nature's Bounty 200 mg, Life Extension Super Ubiquinol, Thorne CoQ10 (10 total)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass (2026-11-05)
  - [x] evidence draft (drafts/evidence/coq10.md, NEEDS RIVER REVIEW; copy in project files review/); category published
- [x] 2. B-complex: no single unit. Reuse the approved multivitamin method if it fits; otherwise propose one and wait. Record folate form (folic acid vs methylfolate) and B12 form.
  - [x] category config: categories/b-complex.yaml (status: draft, multivitamin method reused: cost per daily serving) + template (2026-11-05)
  - [x] batch 1: Nature Made Super B-Complex, NOW B-50, Pure Encapsulations B-Complex Plus, Thorne Basic B Complex, Garden of Life RAW B-Complex (Jarrow B-Right skipped)
  - [x] batch 2: Solgar B-Complex 100, Nature's Bounty Super B-Complex with C, Life Extension BioActive Complete, MegaFood Balanced B, Country Life Coenzyme B (10 total)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass (2026-11-05)
  - [x] evidence draft (drafts/evidence/b-complex.md, NEEDS RIVER REVIEW; copy in project files review/); category published
- [x] 3. Probiotics (proposal written 2026-11-05: drafts/probiotics-method.md; River said on 2026-11-05 to keep developing without authorization, so it goes ahead after zinc and collagen unless River objects): propose a method first and wait. Record each strain's full designation, CFU, guaranteed through expiration or at manufacture, storage needs.
  - [x] category config: categories/probiotics.yaml (status: draft, method option A) + template (2026-11-05). Filters for "through expiration" and "shelf-stable" not built yet: CategoryPage belongs to the other thread's work.
  - [x] batch 1: Culturelle Daily (LGG), Align (35624), Garden of Life Dr. Formulated Once Daily 30B, Florastor (CNCM I-745), Renew Life Ultimate Flora 15B
  - [x] batch 2: Nature's Way Fortify Optima 90B (refrigerate), OLLY Probiotic + Prebiotic gummy, Vitacost Probiotic 15-35 (store brand), BioGaia Protectis Kids (DSM 17938), NOW Probiotic-10 50B (10 total)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass (2026-11-05)
  - [x] evidence draft (drafts/evidence/probiotics.md from the NCCIH page, NEEDS RIVER REVIEW; copy in project files review/); category published
- [x] 4. Zinc: $ per 10 mg elemental zinc from the Supplement Facts panel. Record form, whether copper is included, and format (capsule, tablet, lozenge).
  - [x] category config: categories/zinc.yaml (status: draft) + template (2026-11-05)
  - [x] batch 1: Thorne Zinc Picolinate 30 mg, NOW Zinc Picolinate 50 mg, Nature Made Zinc 30 mg, Jarrow Vegan Zinc Balance (zinc + copper). Zand Cherry Echinacea lozenge dropped (49 mg herb blend vs 5 mg zinc, so zinc isn't the main ingredient); Cold-EEZE not used.
  - [x] batch 2: Life Extension Enhanced Zinc Lozenges, Nature's Bounty Zinc 50 mg, NOW Zinc Glycinate (Albion), Doctor's Best PepZin GI, Source Naturals OptiZinc (9 total)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass (2026-11-05)
  - [x] evidence draft (drafts/evidence/zinc.md from the NIH ODS consumer sheet, NEEDS RIVER REVIEW; copy in project files review/); category published
- [x] 5. Collagen: $ per 10 g collagen peptides. Record source (bovine, marine, porcine, chicken) and heavy-metal testing. Leave out undenatured type II collagen.
  - [x] category config: categories/collagen.yaml (status: draft) + template (2026-11-05)
  - [x] batch 1: Vital Proteins Collagen Peptides, Sports Research Collagen Peptides, Orgain Collagen Peptides, Vital Proteins Marine Collagen, Ancient Nutrition Multi Collagen Protein
  - [x] batch 2: NeoCell Grassfed Collagen Peptides tablets, Doctor's Best Collagen Types 1 & 3 tablets, Garden of Life Grass Fed Collagen Peptides, Vital Proteins Vanilla (9 total). Vitacost Advanced Collagen dropped (temporarily unavailable); no chicken/porcine product had a collagen-in-grams line.
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass (2026-11-05)
  - [x] evidence draft (drafts/evidence/collagen.md from a 2026 umbrella review and a 2024 OA meta-analysis, abstracts only, NEEDS RIVER REVIEW; copy in project files review/); category published
- [x] 6. Curcumin / turmeric: $ per 500 mg curcuminoids, not turmeric powder weight. Record formulation (95% extract, piperine, phytosome, etc.). No bioavailability adjustment; record the claim and its source. No stated curcuminoid content = empty unit price with a note.
  - [x] category config: categories/curcumin.yaml (status: draft) + template; products without stated curcuminoids show "Amount not on label" instead of a cost (src/lib/pricing.ts amountStated) (2026-11-05)
  - [x] batch 1: Sports Research Turmeric Curcumin (C3 + BioPerine), Doctor's Best Curcumin Phytosome (Meriva), Nature's Bounty Turmeric 450 mg, Qunol Turmeric Curcumin Complex (curcuminoids not stated), NOW Turmeric Curcumin
  - [x] batch 2: Thorne Curcumin Phytosome, Garden of Life Turmeric Gummies, Life Extension Super Bio-Curcumin (BCM-95), Vitacost Root2 C3 Complex, Solaray Fermented Organic Turmeric (10 total; 5 without a stated curcuminoid amount)
  - [x] comparison page check  - [x] product pages check (fixed "Infinity servings" and hidden prices for products without a stated amount)  - [x] claims-review pass (2026-11-05)
  - [x] evidence draft (drafts/evidence/curcumin.md from the NCCIH turmeric page, April 2025, NEEDS RIVER REVIEW; copy in project files review/); category published
- [x] 7. Calcium: $ per 500 mg elemental calcium. Record carbonate vs citrate and any added vitamin D or K.
  - [x] category config: categories/calcium.yaml (status: draft) + template (2026-11-05)
  - [x] batch 1: Caltrate 600+D3 (Target), Citracal Maximum Plus, Nature Made Calcium 600 + D3 (Kroger, pickup only), Viactiv Max Formula soft chews, NOW Calcium Citrate
  - [x] batch 2: New Chapter Plant Calcium (algae), Dr. Mercola Calcium + D3 + K2, Vitacost Calcium Citrate chewable, Citracal Petites, Vitafusion Calcium Gummies (10 total)
  - [x] comparison page check  - [x] product pages check  - [x] claims-review pass (2026-11-05)
  - [x] evidence draft (drafts/evidence/calcium.md from the NIH ODS consumer sheet, NEEDS RIVER REVIEW; copy in project files review/); category published
- [ ] 8. Melatonin: propose a method first and wait (price per mg would rank megadoses best). Record labeled dose, format (tablet, gummy, extended release), and any independent testing of actual content.

## Ingredient grades and product photos (2026-11-05, River's request)
- [x] Ingredient grade A–D from sourced rules in ingredients/flags.yaml (7 rules, all entered_by: claude), shown on product pages, tables, and Methodology. Never affects ranking.
- [x] Supplement Facts-style panel rebuilt from each product file, ingredients grouped by role, flagged ones colored with the source.
- [x] Product photos for 83 of 167 products (Vitacost og:image, credited, entered_by: claude).
- [ ] River: check each rule in ingredients/flags.yaml against its source, then delete its entered_by line.
- [ ] River: look over the photos on the zinc, collagen, probiotics and curcumin pages (added 2026-11-05 from each Vitacost page's og:image). Some Vitacost pages carry another product's meta tags, so an image may show the wrong product; Claude can't view images from this container.
- [ ] Photos for the 84 products without one (non-Vitacost stores, CoQ10, and fetch failures: double-wood-ksm-66, designs-for-sport, sports-research triple strength and K2, nature-made vitamin C 1000).
- [ ] Label (Supplement Facts) photos: only add when the store page identifies the image as the label.
- [ ] Set ingredients_confirmed: true where the full ingredient list was read, so empty lists get graded (about 39 products show "Not graded").
