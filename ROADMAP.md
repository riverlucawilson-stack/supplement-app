# Roadmap

Work in shifts. One unit at a time; mark it IN PROGRESS before starting, check it off
when `npm run validate` and `npm run build` pass, log it in SESSION-LOG.md, and commit
as "checkpoint: <unit>". CLAUDE.md wins any conflict with this file.
Since 2026-10-21 River lets Claude make project decisions without asking; log each one in SESSION-LOG.md.
Still River's: approving evidence/health text, and the first deploy.

## IN PROGRESS
- (none)

## Next up
- Magnesium batch 1 per TEAM.md Mission 1 (give researchers WebSearch URLs).
- Vitamin D evidence to-dos: D2 vs D3, VITAL, cancer/mortality, upper limit.

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
- [ ] 2. Magnesium: $ per 100 mg elemental magnesium, taken from the Supplement Facts panel,
      never from compound weight. Record the form (glycinate, citrate, oxide, malate, threonate, etc.).
  - [x] category config: categories/magnesium.yaml (status: draft) + templates/magnesium-product.yaml
  - [x] batch 1: Doctor's Best, Nature Made oxide, Thorne bisglycinate, Pure Encapsulations (Natural Vitality Calm skipped)
  - [x] batch 2: NOW citrate, Neuro-Mag, Nature's Bounty 500, Klean Magnesium, Nature Made glycinate  - [ ] batch 3 if needed (8-12 total)
  - [ ] comparison page check  - [ ] product pages check  - [ ] claims-review pass  - [ ] evidence draft
- [ ] 3. Fish oil / omega-3 (River approved IFOS as a tier-counting certification, 2026-10-21): $ per 1,000 mg EPA+DHA combined, not total oil. Record the form
      (TG, rTG or EE), any published oxidation (TOTOX) results, and IFOS or similar certification.
- [ ] 4. Protein powder: $ per 25 g protein. Record the protein source, heavy-metal testing,
      and NSF Certified for Sport or Informed Sport.
- [ ] 5. Multivitamin: no single comparison unit. Propose a method first (for example
      $ per daily serving plus nutrient forms and %DV), then stop for River's approval.
- [ ] 6. Vitamin C: $ per 500 mg.
- [ ] 7. Vitamin B12: $ per 1,000 mcg. Record the form (methyl, cyano, adenosyl or hydroxo).
- [ ] 8. Vitamin K2: $ per 100 mcg. Record MK-7 vs MK-4.
