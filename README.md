# Sup Search

A static website comparing creatine products on three things: what they cost per
effective dose, whether they've been independently tested, and what the research says.
Built with [Astro](https://astro.build). There's no database: each product is a single
YAML file you edit by hand.

> Status: phase (c) of 6. Real products, marked "not yet reviewed" until River checks them.

## One-time setup on your computer

1. Install **Node.js 22.22 or newer** from https://nodejs.org (pick the "LTS" download).
2. Download this project (on GitHub, click **Code → Download ZIP** and unzip it, or use
   `git clone` if you have Git).
3. Open a terminal in the project folder and run:

   ```sh
   npm install
   ```

   This downloads the tools the project needs into a `node_modules` folder. You only
   redo it if `package.json` changes.

## Everyday commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the site at http://localhost:4321 and refreshes as you edit. Stop it with Ctrl+C. |
| `npm run validate` | **Run before publishing.** Checks every product file and lists errors (✗, must fix) and warnings (⚠, look at). |
| `npm run build` | Runs `validate`, then builds the finished site into `dist/`. Stops if there are any errors. |
| `npm test` | Runs the automated tests for the price math, tiers, and validation. |
| `npm run check` | Checks the code for type mistakes. |

## Where things live

| Path | What's in it |
|---|---|
| `src/content/products/creatine/`, `src/content/products/ashwagandha/` | **One YAML file per product**, one folder per category. This is where you'll spend most of your time. |
| `src/settings.ts` | Site name, and the "stale" limits (prices 14 days, COAs 2 years, certifications 12 months). |
| `src/lib/` | The calculations: `pricing.ts` (cost per 5 g, per 30 days, best price), `tier.ts` (Tier A/B/C with reasons), `staleness.ts`. |
| `scripts/validate.ts` | The validation script. |
| `tests/` | Automated tests. `tests/fixtures/products/` holds deliberately broken product files the tests check get caught. |
| `src/categories/` | What a product file must contain, per category (`creatine.ts`, `ashwagandha.ts`), and the amount each is compared on. |
| `src/evidence/` | The words on each category's evidence page. |
| `templates/` | A blank product file for each category. |
| `src/layouts/BaseLayout.astro` | The frame on every page, including the affiliate disclosure and "not medical advice" note. |
| `src/pages/` | One file per page of the site. |
| `src/styles/global.css` | Site-wide styling. |

## How to add a product

1. Copy the category's template from `templates/` (e.g. `creatine-product.yaml` or
   `ashwagandha-product.yaml`) into that category's folder in `src/content/products/` and rename it. Use lowercase
   words joined by dashes, e.g. `brandname-creatine-monohydrate.yaml`. The file name
   becomes the page address.
2. Fill in every field from the label and the seller's page. Leave out `raw_material`
   if the label doesn't name one. Use `[]` for an empty list.
3. Run `npm run validate`. If anything is misspelled, missing, or impossible (like more
   creatine per serving than the serving weighs), it names the file and field. Fix it and
   run again.

To see what the errors look like, run `npm run validate -- tests/fixtures/products`. That
checks the deliberately broken test files instead of the real ones.

### Where to find each piece of information

| Information | Where to look |
|---|---|
| Brand, name, form, type, ingredients, dose | The Supplement Facts panel on the label, or the brand's product page |
| Prices | Each retailer's product page. Note the container size each store sells. |
| Certifications | The certifier's own search, never the brand's claim alone: [NSF Certified for Sport](https://www.nsfsport.com/certified-products/), [Informed Sport](https://sport.wetestyoutrust.com/certified-safer-supplements), [USP Verified](https://www.usp.org) (search "USP Verified products"), [BSCG](https://www.bscg.org/certified-drug-free-database), [Clean Label Project](https://cleanlabelproject.org) |
| COAs | The brand's website (often a "lab results" or "testing" page), a QR code on the label, or by emailing the brand with the lot number from your container |
| ISO/IEC 17025 accreditation | The lab's accreditation certificate, searchable on the accrediting body's site (for example A2LA or ANAB). Use `unknown` until you've confirmed it. |

### Allowed values

- `form`: `powder`, `capsule`, `gummy`
- `creatine_type`: `monohydrate`, `hcl`, `nitrate`, `ethyl_ester`, `buffered`,
  `magnesium_chelate`, `other`
- `certifications[].program`: `NSF Certified for Sport`, `Informed Sport`, `USP Verified`,
  `BSCG`, `Clean Label Project`
- `coas[].iso_17025`: `yes`, `no`, `unknown`
- `coas[].scope`: `finished_product`, `raw_material`
- `coas[].tests`: any of `purity`, `lead`, `arsenic`, `cadmium`, `mercury`, `microbial`,
  `creatinine`, `dcd`, `dht`

Dates are written `2026-10-14` (year-month-day).

### Checking what Claude entered

When Claude looks up a price, certification, or COA, it adds `entered_by: claude` to
that entry (or to the top of the file, for label info). `npm run validate` lists each one
as **UNVERIFIED**. Open the entry's link, compare the values, fix anything wrong, then
delete the `entered_by: claude` line.

## How to update a price

Open the product's file and find its entry under `prices:`. Change `price_usd`, and set
`date_checked` to today. If the store now sells a different size, update `servings` to
the number of servings in **that store's** container. Never type a cost per gram: the
site calculates it.

To add a store, copy one `- retailer:` block and edit it.

**Star ratings** are optional. If the store shows a review summary, add a `rating:` under
that price with `stars` (the average, 0 to 5) and `count` (number of reviews), checked on
the same day as the price. Only the average and count go on the site, never review text.
Ratings never change the table's order.

## How the numbers are calculated

You never type a calculated number. For each retailer's price:

- creatine in the container = `servings` × `creatine_per_serving_g`
- **cost per 5 g** = price ÷ creatine in the container × 5
- **cost per 30 days** = cost per gram × 5 g/day × 30
- **best price** = the lowest cost per 5 g among prices that aren't stale. If every price
  is stale, it uses the lowest stale one and marks it stale.

**Tiers** (`src/lib/tier.ts`):

- **A**: a current certification (verified within 12 months) AND a COA from an ISO/IEC
  17025 accredited lab, on the finished product, under 2 years old.
- **B**: not A, but at least one COA or certification exists.
- **C**: no COA and no certification.

**Stale** limits are in `src/settings.ts`. Staleness is worked out when the site is
built, so the live site only updates its "stale" labels when it rebuilds. Phase (f) sets
up an automatic daily rebuild.

## Ashwagandha

Ashwagandha products are compared on **cost per 600 mg of ashwagandha as labeled**.
Extracts and plain root powder aren't the same at the same weight, so the table shows the
type (root extract, root + leaf extract, root powder), the branded extract (e.g. KSM-66,
Sensoril, Shoden) and the withanolide % beside each one. A small, concentrated extract
(e.g. 120 mg of Shoden) will look expensive per 600 mg; that's expected. To compare on a
different amount, change `referenceDose` and `dailyGrams` in `src/categories/ashwagandha.ts`.

Its COA tests are: withanolides, identity, lead, arsenic, cadmium, mercury, microbial,
pesticides, residual_solvents, aflatoxins. A COA from the extract supplier (e.g. the KSM-66
maker) is `scope: raw_material`.

## How to review the evidence page

Everything on an evidence page lives in `src/evidence/<category>.ts` (e.g. `creatine.ts`). Claude drafted it
from the abstracts of the papers listed under each point; nothing in it is from memory.

1. Open the page and read a section. Each point has a numbered link to its paper.
2. Rewrite anything you'd say differently, right in that file.
3. When you agree with the whole section, change its `reviewed: false` to `reviewed: true`.
   That removes the "DRAFT - NEEDS REVIEW" label and its to-do box.
4. For each citation, check the PMID and DOI on PubMed, then delete its
   `entered_by: 'claude'` line.

`npm run validate` lists every section and citation still waiting, and stops the build
if a point has no source or cites a paper that isn't in the list.

## How to deploy

Written in phase (f).
