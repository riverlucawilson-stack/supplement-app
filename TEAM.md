# TEAM.md: research roles

> Written by Claude 2026-10-21; River approved it the same day.
> 2026-11-10: the two roles' rules moved word for word into `.claude/agents/` so they run as
> named subagents pinned to Sonnet; checks now use the short `:brief` commands (same pass/fail).
> CLAUDE.md wins any conflict with this file.

The lead session (the one following ROADMAP.md) does everything solo except product
research, which goes to the two roles below. Both run on **Sonnet** (set in their agent
files). Never run more than 2 role agents at once: 4+ parallel research agents hit the
account usage limit twice.

## Mission 1: research a batch of products (at most 5)

### Before the batch (lead)
1. Pick up to 5 products for one category. Inclusion rule: sold in the US, the category's
   ingredient is the main one, and the label states the amount per serving. Note anything
   else added as a flag.
2. Mark the batch IN PROGRESS in ROADMAP.md, listing the 5 products.
3. Start the **product-researcher** subagent with: the category file
   (`categories/<slug>.yaml`), the product template (`templates/<slug>-product.yaml`), the 5
   products, and their URLs from WebSearch. Its rules are in its agent file, so don't
   repeat them in the prompt.

### product-researcher (Sonnet): `.claude/agents/product-researcher.md`
Fills in one YAML file per product. Its full rules are in that file.

### data-auditor (Sonnet): `.claude/agents/data-auditor.md`
Checks the researcher's files against their sources before they're committed and returns
PASS or FIX per product. It can't edit files. Its full rules are in that file.

### After the batch (lead)
1. Apply the auditor's FIX items (or drop the value if the page can't confirm it).
2. Run `npm run build:brief` (it runs validate first, then the build); it must pass. To see
   the new batch's warnings in full: `npm run validate:brief -- --show=<slug>/`.
3. Check the batch off in ROADMAP.md, add a SESSION-LOG.md line listing products added
   and skipped, and commit as `checkpoint: <category> batch <n>`.

## Notes from earlier research
- The fetch tool refuses URLs a model guessed. Run WebSearch first and give the researcher the result URLs;
  agents may also follow links found on pages they've read.
- Retailer pages that work with one-page reads: Vitacost, GNC, Target, Vitamin Shoppe, and
  Shopify stores' `/products/<handle>.js` variant data. Amazon and iHerb block fetches.
- Europe PMC's REST API works for paper details (about 1 request a minute before it
  rate-limits); PubMed pages don't load here.
