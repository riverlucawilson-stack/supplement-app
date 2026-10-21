# Session log

One line per finished unit: date, unit, anything River needs to know.

- 2026-10-21 · Shift 1 start · Created ROADMAP.md and this log. No TEAM.md exists, so the product-researcher and data-auditor roles aren't defined yet.
- 2026-10-21 · Stage A (d) creatine product pages · 46 pages at /creatine/<file name>/, linked from the table. Shared src/components/ProductPage.astro; ashwagandha has no product pages yet (out of queue). Also fixed the phone card saying "per 5 g" on the ashwagandha table.
- 2026-10-21 · Stage B proposal · drafts/multi-category-plan.md written. Stopped for River's approval.
- 2026-10-21 · Stage B1 snapshot · All 74 products' prices, 30-day costs, best price and tier saved; tests/migration.test.ts fails if any number moves.
- 2026-10-21 · Stage B2-B4 categories in YAML + generic routes · Did as one unit since the loader can't half-exist. categories/creatine.yaml and ashwagandha.yaml replace the .ts files; every number matches the snapshot. Creatine table moved to /creatine/, / is now a category list. A new category needs only a YAML file + products folder (categories/README.md). Moved an internal research note on Doctor's Best ashwagandha out of the public notes field into a YAML comment, since product pages now show notes.
- 2026-10-21 · Stage B5 evidence drafts off the site · Creatine and ashwagandha evidence pages no longer build; drafts/evidence/<category>.md files every point under your 3 levels (sources' designs read from titles, marked for checking). Setting every section reviewed: true in src/evidence/<category>.ts publishes the page. Note: no level 2 or 3 studies are cited yet; two creatine papers (Harris 1992, Hultman 1996) don't state a design in the title, so they're under "outside the levels".
- 2026-10-21 · TEAM.md drafted · Mission 1 (product-researcher + data-auditor on Sonnet, 5 products per batch). Waiting for River's OK before the first research batch.

## Questions for River
- (2026-10-21, shift 1, answered same day: plan approved, creatine to /creatine/, evidence off the site, no daily amounts unless given, keep ashwagandha, draft TEAM.md.)
- OK TEAM.md as drafted? The first research batch waits on it.
- Vitamin D: compare per 25 mcg (shown as "per 1,000 IU (25 mcg)") and record labels' IU values converted at 40 IU = 1 mcg? This is the standard conversion for vitamin D only.
- IFOS for fish oil: add it as a certification that counts toward the tier when we get there? (Changes who can reach Tier A.)
- Product pages now show each product's notes field. I moved one internal research note into a YAML comment; tell me if you'd rather notes stay hidden.
- No-push rule still in force: work is committed locally and bundled to project files only. Your PRs #1 to #6 are out of date. Relax it?
