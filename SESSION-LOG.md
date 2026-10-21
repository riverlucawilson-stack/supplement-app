# Session log

One line per finished unit: date, unit, anything River needs to know.

- 2026-10-21 · Shift 1 start · Created ROADMAP.md and this log. No TEAM.md exists, so the product-researcher and data-auditor roles aren't defined yet.
- 2026-10-21 · Stage A (d) creatine product pages · 46 pages at /creatine/<file name>/, linked from the table. Shared src/components/ProductPage.astro; ashwagandha has no product pages yet (out of queue). Also fixed the phone card saying "per 5 g" on the ashwagandha table.
- 2026-10-21 · Stage B proposal · drafts/multi-category-plan.md written. Stopped for River's approval.
- 2026-10-21 · Stage B1 snapshot · All 74 products' prices, 30-day costs, best price and tier saved; tests/migration.test.ts fails if any number moves.
- 2026-10-21 · Stage B2-B4 categories in YAML + generic routes · Did as one unit since the loader can't half-exist. categories/creatine.yaml and ashwagandha.yaml replace the .ts files; every number matches the snapshot. Creatine table moved to /creatine/, / is now a category list. A new category needs only a YAML file + products folder (categories/README.md). Moved an internal research note on Doctor's Best ashwagandha out of the public notes field into a YAML comment, since product pages now show notes.
- 2026-10-21 · Stage B5 evidence drafts off the site · Creatine and ashwagandha evidence pages no longer build; drafts/evidence/<category>.md files every point under your 3 levels (sources' designs read from titles, marked for checking). Setting every section reviewed: true in src/evidence/<category>.ts publishes the page. Note: no level 2 or 3 studies are cited yet; two creatine papers (Harris 1992, Hultman 1996) don't state a design in the title, so they're under "outside the levels".

## Questions for River
- Approve drafts/multi-category-plan.md? It ends with 5 questions (creatine at / vs /creatine/, pulling the two draft evidence pages off the site, daily amounts for "30 days", keeping ashwagandha).
- TEAM.md doesn't exist, so the product-researcher and data-auditor roles (Mission 1) aren't defined. Add it, or should I draft one?
- No-push rule: work is committed locally and saved as a git bundle in project files. Your PRs #1 to #6 won't update until pushing is allowed again. Relax it?
