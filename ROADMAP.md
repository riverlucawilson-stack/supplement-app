# Roadmap

Work in shifts. One unit at a time; mark it IN PROGRESS before starting, check it off
when `npm run validate` and `npm run build` pass, log it in SESSION-LOG.md, and commit
as "checkpoint: <unit>". CLAUDE.md wins any conflict with this file.

## IN PROGRESS
- (none)

## Next up
- Stage C1 Vitamin D: write categories/vitamin-d.yaml (status: draft). Comparison is $ per 1,000 IU (25 mcg).
  Labels give D in IU, mcg or both; the YAML loader keeps IU and mcg apart, so the config will record mcg and
  compare per 25 mcg (labelled "per 1,000 IU (25 mcg)"), unless River prefers adding a D-specific IU conversion.
- Then Vitamin D batch 1 (up to 5 products) using TEAM.md Mission 1, once River OKs TEAM.md.

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
- [x] Draft TEAM.md (River asked 2026-10-21; waiting for River's OK)

## Stage C: categories, most purchased first
A category is done when it has:
1. a category config
2. 8–12 products researched and audited, in batches of up to 5
3. a comparison page
4. product pages
5. a claims-review pass
6. an evidence draft for River's review (drafts/evidence/<category>.md, NEEDS RIVER REVIEW)

- [ ] 1. Vitamin D: $ per 1,000 IU (25 mcg). Record D3 vs D2, carrier oil, any added K2.
- [ ] 2. Magnesium: $ per 100 mg elemental magnesium, taken from the Supplement Facts panel,
      never from compound weight. Record the form (glycinate, citrate, oxide, malate, threonate, etc.).
- [ ] 3. Fish oil / omega-3: $ per 1,000 mg EPA+DHA combined, not total oil. Record the form
      (TG, rTG or EE), any published oxidation (TOTOX) results, and IFOS or similar certification.
- [ ] 4. Protein powder: $ per 25 g protein. Record the protein source, heavy-metal testing,
      and NSF Certified for Sport or Informed Sport.
- [ ] 5. Multivitamin: no single comparison unit. Propose a method first (for example
      $ per daily serving plus nutrient forms and %DV), then stop for River's approval.
- [ ] 6. Vitamin C: $ per 500 mg.
- [ ] 7. Vitamin B12: $ per 1,000 mcg. Record the form (methyl, cyano, adenosyl or hydroxo).
- [ ] 8. Vitamin K2: $ per 100 mcg. Record MK-7 vs MK-4.
