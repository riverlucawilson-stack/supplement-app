# Methodology (draft)

> **NEEDS RIVER REVIEW.** Drafted by Claude 2026-10-24 from the code and category files as
> they are today (src/lib/pricing.ts, src/lib/tier.ts, src/lib/staleness.ts, src/settings.ts,
> categories/*.yaml). Nothing here is on the site yet. Edit freely; once you approve it,
> Claude builds it as the Methodology page. Lines marked **RIVER:** need your call.

## How prices are collected

- One person (or Claude, marked "unverified" until River checks it) opens a single public
  product page, such as the brand's own store or a retailer like Vitacost, GNC, Target or Walmart,
  and copies the price shown that day. No automated scraping.
- The price recorded is the regular price you'd pay today, before shipping (wording from
  the product template). **RIVER:** say whether sale prices and subscribe-and-save prices
  count, and whether tax is ever included.
- Each price is saved with the store, the number of servings in that store's container, the
  page link, and the **date checked**.
- Amounts per serving come from the product's Supplement Facts panel, not the marketing text.

## How we compare prices

Every price is converted to the cost of one fixed amount of the main ingredient, so a big tub
and a small bottle can be compared fairly:

> cost per comparison amount = price ÷ (servings in the container × amount per serving) × comparison amount

| Category | Comparison amount | What counts toward it |
|---|---|---|
| Creatine | 5 g creatine | creatine per serving (g), as labeled |
| Ashwagandha | 600 mg ashwagandha | ashwagandha per serving (mg), extract or powder as labeled |
| Vitamin D | 1,000 IU (25 mcg) | vitamin D per serving (mcg) |
| Magnesium | 100 mg elemental magnesium | the elemental magnesium on the Supplement Facts panel, never the compound weight |
| Fish oil / omega-3 | 1,000 mg EPA + DHA | EPA mg + DHA mg per serving, not total oil |
| Protein powder | 25 g protein | protein per serving (g) |
| Multivitamin | 1 daily serving | price ÷ servings in the container |
| Vitamin C | 500 mg vitamin C | vitamin C per serving (mg) |
| Vitamin B12 | 1,000 mcg vitamin B12 | vitamin B12 per serving (mcg) |
| Vitamin K2 | 100 mcg vitamin K2 | vitamin K2 per serving (mcg); vitamin K1 isn't counted |

- **Cost per 30 days** is shown only for creatine (5 g a day) and ashwagandha (600 mg a day).
  Other categories don't show a daily cost, because no daily amount has been chosen for them.
- **Best price** is the lowest cost per comparison amount among prices that aren't stale. If
  every price is stale, the lowest stale one is shown and marked stale.
- A lower cost per amount is not a claim that a product works better. Forms differ (for
  example ubiquinone vs ubiquinol, or magnesium oxide vs glycinate), and the site records the
  form without adjusting the price for it.
- Affiliate commissions never change the order or the tier.

## How COAs are judged

A certificate of analysis (COA) is a lab report. For each one we record the link, the lab,
whether the lab is ISO/IEC 17025 accredited (yes, no or unknown), the lot number, the test
date, whether it tests the finished product or the raw material, and which tests it reports
(each category lists its own tests, such as heavy metals, microbes, or oxidation for fish oil).

Certifications (NSF Certified for Sport, Informed Sport, USP Verified, BSCG, Clean Label
Project, and IFOS for fish oil) count only when they appear on the certifier's own website,
never because a brand says so.

## Transparency tiers

Shown next to the price, never merged into one score. The rules, exactly as written in the
project instructions:

- Tier A: current third-party certification AND a COA from an accredited lab
  on the finished product
- Tier B: a COA exists, but accreditation, finished-product status, or date
  can't be confirmed
- Tier C: no COA or certification found

Each product page shows why it got its tier.

How the code applies them today:
- A certification is "current" if its listing was re-checked on the certifier's site within
  the last 12 months.
- A COA counts toward Tier A only if the lab is accredited, it tests the finished product,
  and its test date is less than 2 years old.
- A product with a certification but no COA is placed in Tier B. **RIVER:** the written rules
  don't cover this case (Tier B mentions only a COA). Confirm B, or say where it goes.

## What "date checked" means

- **Price:** the day the store's page was read and showed that price. Prices change often, so
  a price is marked stale after 14 days.
- **Certification:** the day the certifier's own listing was read. It stops counting as
  current after 12 months.
- **COA:** the test date printed on the lab report, not the day we found it. A COA is marked
  stale after 2 years.

These limits live in one settings file and may change. **RIVER:** your shift prompt mentions
30 days and 12 months; the project instructions say 14 days and 2 years (see WAITING ON RIVER 1).

## Update schedule

**RIVER:** say how often prices are re-checked. Today the site rebuilds whenever new data is
pushed; a daily rebuild (so "stale" labels appear on time) is optional and described in the README.

## What this site doesn't cover

- It doesn't test products itself. It reports what labels, stores, certifiers and published
  lab reports say.
- It doesn't rank products by how well they work, and nothing here is medical advice.
- It doesn't adjust prices for absorption or "bioavailability" claims.
- It covers products sold in the US whose label states how much of the main ingredient is in
  each serving. Products are skipped when their label or price couldn't be read.
- Prices don't include shipping.

## Affiliate disclosure

**RIVER:** write the full disclosure here (which programs, that commissions never affect
order or tier). Draft wording for the short notice is in ROADMAP unit D3.
