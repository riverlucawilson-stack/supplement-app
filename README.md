# [SITE NAME]

A static website comparing creatine products on three things: what they cost per
effective dose, whether they've been independently tested, and what the research says.
Built with [Astro](https://astro.build). There's no database: each product is a single
YAML file you edit by hand.

> Status: phase (b) of 6. Sample products only (fake brands, fake data).

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
| `src/content/products/creatine/` | **One YAML file per product.** This is where you'll spend most of your time. |
| `src/settings.ts` | Site name, and the "stale" limits (prices 14 days, COAs 2 years, certifications 12 months). |
| `src/lib/` | The calculations: `pricing.ts` (cost per 5 g, per 30 days, best price), `tier.ts` (Tier A/B/C with reasons), `staleness.ts`. |
| `scripts/validate.ts` | The validation script. |
| `tests/` | Automated tests. `tests/fixtures/products/` holds deliberately broken product files the tests check get caught. |
| `src/categories/` | What a product file must contain, per category. Fish oil goes here later. |
| `src/layouts/BaseLayout.astro` | The frame on every page, including the affiliate disclosure and "not medical advice" note. |
| `src/pages/` | One file per page of the site. |
| `src/styles/global.css` | Site-wide styling. |

## How to add a product

1. Copy an existing file in `src/content/products/creatine/` and rename it. Use lowercase
   words joined by dashes, e.g. `brandname-creatine-monohydrate.yaml`. The file name
   becomes the page address.
2. Fill in every field from the label and the seller's page. Leave out `raw_material`
   if the label doesn't name one. Use `[]` for an empty list.
3. Run `npm run validate`. If anything is misspelled, missing, or impossible (like more
   creatine per serving than the serving weighs), it names the file and field. Fix it and
   run again.

To see what the errors look like, run `npm run validate -- tests/fixtures/products`. That
checks the deliberately broken test files instead of the real ones.

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

## How to update a price

Open the product's file and find its entry under `prices:`. Change `price_usd`, and set
`date_checked` to today. If the store now sells a different size, update `servings` to
the number of servings in **that store's** container. Never type a cost per gram: the
site calculates it.

To add a store, copy one `- retailer:` block (all five lines) and edit it.

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

## How to deploy

Written in phase (f).
