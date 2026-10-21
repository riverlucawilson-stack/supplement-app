# TEAM.md: research roles

> Written by Claude 2026-10-21; River approved it the same day.
> CLAUDE.md wins any conflict with this file.

The lead session (the one following ROADMAP.md) does everything solo except product
research, which goes to the two roles below. Both run on **Sonnet**. Never run more than
2 role agents at once: 4+ parallel research agents hit the account usage limit twice.

## Mission 1: research a batch of products (at most 5)

### Before the batch (lead)
1. Pick up to 5 products for one category. Inclusion rule: sold in the US, the category's
   ingredient is the main one, and the label states the amount per serving. Note anything
   else added as a flag.
2. Mark the batch IN PROGRESS in ROADMAP.md, listing the 5 products.
3. Give the researcher: the category file (`categories/<slug>.yaml`), the product template,
   the 5 products, and the rules below.

### product-researcher (Sonnet)
Fills in one YAML file per product in `src/content/products/<slug>/`.
- Reads individual public pages one at a time: the brand's product page, retailer product
  pages, the certifier's own listing, and the brand's COA or lab-results page. No bulk or
  automated scraping, no search-result snippets as a source.
- Records only what a page actually says. Anything it can't read stays out of the file,
  with a `# MISSING:` comment saying what's missing and where it looked.
- Dose numbers come from the Supplement Facts panel. For magnesium that means the
  elemental magnesium line, never the compound weight; for fish oil, EPA and DHA in mg,
  never total oil.
- Certifications come only from the certifier's own site (NSF, Informed Sport, USP, BSCG,
  Clean Label Project, and IFOS for fish oil), never from the brand's claim.
- Every price, certification and COA gets its source URL, the date checked, and
  `entered_by: claude`. The product itself gets `entered_by: claude` too.
- Star ratings: average and count only, never review text. Affiliate links play no part.
- Skips a product rather than guessing (e.g. label only in an image it can't read), and
  says why.
- Returns: the files written, plus a list of skipped products with reasons.

### data-auditor (Sonnet)
Checks the researcher's files before they're committed. It doesn't add new data.
- Re-opens each source URL and checks every value against it: price, servings in that
  retailer's container, dose per serving, form, type, certification listing, COA lot,
  lab, date, scope and tests.
- Checks the math inputs: servings and amount per serving match the label, units are
  right (mg vs g, IU vs mcg), and the cost per comparison amount looks sane.
- Confirms every value has a URL, a date and `entered_by: claude`, and that nothing was
  filled in without a source.
- Flags any health or efficacy wording in `notes` or `flags` (those fields are for label
  facts only), and any research notes that belong in a YAML comment instead.
- Returns, per product: PASS, or FIX with the exact field, what the page says, and the URL.

### After the batch (lead)
1. Apply the auditor's FIX items (or drop the value if the page can't confirm it).
2. Run `npm run validate` and `npm run build`; both must pass.
3. Check the batch off in ROADMAP.md, add a SESSION-LOG.md line listing products added
   and skipped, and commit as `checkpoint: <category> batch <n>`.

## Notes from earlier research
- Retailer pages that work with one-page reads: Vitacost, GNC, Target, Vitamin Shoppe, and
  Shopify stores' `/products/<handle>.js` variant data. Amazon and iHerb block fetches.
- Europe PMC's REST API works for paper details (about 1 request a minute before it
  rate-limits); PubMed pages don't load here.
