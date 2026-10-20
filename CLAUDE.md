# Project: Sup Search, a creatine price, testing, and evidence comparison site

## What I'm building
A website that answers three questions for each creatine product sold in the US:
1. What does it actually cost per effective dose?
2. Has it been independently tested, and can I see the results?
3. What does the research say creatine does and doesn't do?

Creatine is the first category. Build it so I can add more categories later
(fish oil next) without rewriting the site.

About me: I'm a Health and Nutrition Science student and former EMT. I will
write all health content myself and verify all product data before launch. I'm newer to
coding, so explain what you're doing in plain terms and tell me exactly which
commands to run.

## Rules that always apply
- Never invent data. No made-up prices, COA results, lab names, certifications,
  or study citations. Every value must come from a page someone actually read.
  If a value can't be found, leave it out rather than guessing.
- Never write efficacy or health claims on your own. Build content templates
  with "DRAFT - NEEDS REVIEW" placeholders. If you suggest a study, include its
  PMID or DOI and label it unverified.
- Claude may look up prices, COAs, and certifications and enter them, by
  reading individual public pages one at a time: retailer product pages, the
  certifier's own listing, and the brand's COA or lab-results page. No bulk or
  automated scraping. Certifications come only from the certifier's own site,
  never from the brand's claim.
- Every value Claude enters gets `entered_by: claude` on that price,
  certification, or COA, with the URL it came from and the date checked. The
  validation script warns about these until I verify each one and delete that
  line.
- Affiliate commissions must never affect rankings. Rankings come only from the
  formula published on the Methodology page.
- Every page shows an affiliate disclosure near the top and a "not medical
  advice" note.

## Tech stack
- Astro + TypeScript, static site output
- One plain YAML or JSON file per product that I can edit by hand
- Simple styling (plain CSS or Tailwind; pick one and tell me why)
- Free hosting (Cloudflare Pages or Netlify)
- No user accounts, database, or backend in version 1

## Data for each product
- Basics: brand, product name, form (powder/capsule/gummy), creatine type
  (monohydrate, HCl, etc.), raw material brand if stated (e.g., Creapure),
  other ingredients
- Dose info: serving size (g), creatine per serving (g), servings per container
- Prices: list of {retailer, price, container size, URL, date checked}
- Third-party certification: {program (NSF Certified for Sport, Informed Sport,
  USP Verified, BSCG, Clean Label Project), link to the certifier's own
  listing, date I verified it}
- COA: {link, testing lab, ISO/IEC 17025 accredited (yes/no/unknown), lot
  number, test date, finished product or raw material, which tests are
  reported: purity/potency, heavy metals (lead, arsenic, cadmium, mercury),
  microbial, creatinine, dicyandiamide (DCD), dihydrotriazine (DHT)}
- Notes and flags (proprietary blend, added sweeteners, etc.)

## Calculated in code, never by hand
- Cost per 5 g of creatine, based on each product's actual creatine content
- Cost per 30 days at 5 g/day
- Best current price across retailers
- A "stale" warning on prices older than 14 days and COAs older than 2 years
  (keep both limits in one settings file so I can change them)

## Transparency tier (shown next to price, never merged into one score)
- Tier A: current third-party certification AND a COA from an accredited lab
  on the finished product
- Tier B: a COA exists, but accreditation, finished-product status, or date
  can't be confirmed
- Tier C: no COA or certification found
Each product page shows why it got its tier.

## Pages
1. Home: comparison table I can sort by cost per 5 g and filter by tier, form,
   and "certified only." Must work well on phones.
2. Product page: dose math, all retailer prices with dates checked,
   certification links, COA breakdown, tier with reasons.
3. Creatine evidence page: template with sections for how creatine works
   (phosphocreatine system), outcomes grouped by strength of evidence,
   dosing, safety, common myths. Placeholders only.
4. How to read a COA: template with placeholders.
5. Methodology: how prices are collected, how COAs are judged, tier rules,
   update schedule, full affiliate disclosure.
6. About.

## Tooling
- A validation script I run before publishing. It flags missing fields,
  impossible values (e.g., more creatine per serving than the serving size),
  and stale prices or COAs.
- Basic SEO: page titles, meta descriptions, sitemap.
- Category settings so fish oil can be added later with its own dose math
  (cost per gram of EPA+DHA) and its own COA fields (oxidation values).

## How to work with me
1. Before writing any code, give me a short plan: folder structure, data
   format, and build order. Wait for my approval.
2. Build in phases and stop after each one for my review:
   (a) project setup, data format, and 3 sample products
   (b) calculations and the validation script
   (c) home page table
   (d) product pages
   (e) content page templates
   (f) deployment steps
3. After each phase, run the site locally and run the validation script. Tell
   me what to check, and fix anything broken before moving on.
4. Keep a README that explains how to add a product, update a price, and deploy.
