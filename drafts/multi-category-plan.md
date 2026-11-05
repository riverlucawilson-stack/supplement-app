# Multi-category plan (Stage B proposal)

Status: PROPOSAL, waiting for River's approval. Nothing here is built yet.
Written 2026-10-21, shift 1.

## Where we start from

The site is already partly multi-category, because ashwagandha was added on 2026-10-21:

- The comparison table, evidence page and (new this shift) product page are shared
  components: `CategoryPage.astro`, `EvidencePage.astro`, `ProductPage.astro`.
- Price math, staleness, tiers and the validation script already work on any category
  through one interface (`CategoryInfo` in `src/categories/index.ts`).
- What's still per-category **code** is each `src/categories/<id>.ts` file: its product
  fields, its COA test list, its comparison amount and its "impossible value" checks.
  Adding a category today means writing about 80 lines of TypeScript plus two page files.

So Stage B is mostly about moving those settings out of code into one plain YAML file
per category, and making the routes uniform.

## 1. One file per category: `categories/<slug>.yaml`

Example for creatine, written to reproduce today's numbers exactly:

```yaml
slug: creatine
name: Creatine
status: published            # draft = built for preview only, left out of the menu and sitemap

comparison:
  amount: 5
  unit: g                    # g, mg, mcg or IU
  counts_toward: [creatine]  # which dose fields are added up to make the amount
  label: per 5 g creatine
  daily_amount: 5            # for "cost per 30 days"; leave out to hide that column
  plausible_cost: { min: 0.05, max: 5 }   # validate warns outside this range

# Fields each product file records per serving, in the label's own unit.
dose_fields:
  creatine: { unit: g, label: Creatine per serving }

# The "type" choices a product picks from (shown under the name, filterable later).
types:
  field: creatine_type
  options: [monohydrate, hcl, nitrate, ethyl_ester, buffered, magnesium_chelate, other]

extra_fields:                # optional text fields, e.g. raw material brand
  raw_material: Raw material brand (e.g. Creapure)

certifications: [NSF Certified for Sport, Informed Sport, USP Verified, BSCG, Clean Label Project]

coa_tests:
  purity: Purity / potency
  lead: Lead
  arsenic: Arsenic
  cadmium: Cadmium
  mercury: Mercury
  microbial: Microbial
  creatinine: Creatinine
  dcd: Dicyandiamide (DCD)
  dht: Dihydrotriazine (DHT)
```

How the queue's categories would fit:

| Category | comparison | dose_fields (per serving) | types / extras |
|---|---|---|---|
| Vitamin D | 1,000 IU | `vitamin_d` in IU or mcg (40 IU = 1 mcg, converted in code) | D3 / D2; extras: carrier oil, K2 mcg |
| Magnesium | 100 mg | `elemental_magnesium` mg, **from the Supplement Facts line**, never compound weight | glycinate, citrate, oxide, malate, threonate, … |
| Fish oil | 1,000 mg | `epa` mg + `dha` mg, `counts_toward: [epa, dha]` | TG / rTG / EE; COA tests add TOTOX, peroxide, anisidine; extras: published TOTOX value |
| Protein | 25 g | `protein` g | whey isolate, whey concentrate, casein, pea, soy, … |
| Vitamin C | 500 mg | `vitamin_c` mg | form (ascorbic acid, sodium ascorbate, …) |
| B12 | 1,000 mcg | `vitamin_b12` mcg | methyl, cyano, adenosyl, hydroxo |
| K2 | 100 mcg | `vitamin_k2` mcg | MK-7 / MK-4 |
| Multivitamin | doesn't fit | needs its own method, proposed separately per the queue | |

A product file keeps today's shape: `dose:` holds `serving_size_g` (when it makes sense),
`servings_per_container`, and one number per `dose_fields` entry. The product schema is
built from the YAML when the site builds, still in strict mode, so a misspelled field
still fails with the file and field named.

The one thing YAML can't express is an unusual check (say, magnesium-specific sanity
rules). For those, a category may have an optional `src/categories/<slug>.checks.ts`.
I expect most categories won't need one.

## 2. Routes

- `/<category>/` comparison table, `/<category>/<product>/` product page,
  `/<category>/evidence/` evidence page (only once River approves it, see section 5).
- All three come from three generic route files, so a new category needs **no** page files.
- Product URLs use the YAML file name, as they do now (`/creatine/thorne-creatine/`).
- **Decision for River:** creatine's table is at `/` today. I'd move it to `/creatine/`
  and make `/` a short home page listing the categories, with a redirect from the old
  address. Until a second category is published, `/` could keep showing creatine.

## 3. Validation per category

Same script, same rules; the numbers it checks come from the YAML:

- Every `dose_fields` entry present and positive; units match the YAML.
- Impossible values, generic: an active amount in grams can't exceed `serving_size_g`;
  the sum of `counts_toward` fields can't exceed the serving either.
- Cost per comparison amount outside `plausible_cost` gives a warning.
- COA `tests` must come from that category's `coa_tests`; certifications from its list.
- The existing UNVERIFIED, stale and DRAFT warnings stay exactly as they are.

## 4. Tiers per category

The tier rules stay the same for every category (A = current certification + accredited,
finished-product COA under 2 years; B = some COA or certification; C = neither). Only the
inputs change per category: which certification programs count and which COA tests are
listed. **I won't change the rules themselves.** Adding a certifier to a category's list
(IFOS for fish oil is the first one coming) does change which products can reach Tier A,
so I'll treat each addition as needing River's OK.

## 5. Evidence drafts

Per River's new rule, evidence goes to `drafts/evidence/<category>.md` marked
NEEDS RIVER REVIEW and stays off the site. Creatine and ashwagandha currently have
Claude-drafted evidence pages that build into the site (labeled DRAFT). Proposal: move
their text into `drafts/evidence/`, and only build `/<category>/evidence/` once every
section is marked reviewed. See question 3 below.

## 6. Migrating creatine (and ashwagandha) with numbers unchanged

1. Before touching anything: a script writes every product's cost per comparison amount,
   cost per 30 days, best retailer and tier to `tests/fixtures/before-migration.json`.
2. Move creatine and ashwagandha to YAML configs and the generic routes.
3. A test compares every product against that snapshot to the cent. Any difference fails.
4. Remove the old per-category TypeScript once the test passes.

Estimated size: about 4 units (snapshot + loader, migrate creatine, migrate ashwagandha,
generic routes + home page).

## Questions for River

1. Approve this plan (or tell me what to change)?
2. Move creatine's table from `/` to `/creatine/`, with `/` becoming a category list?
3. Pull the two existing draft evidence pages off the site into `drafts/evidence/`?
4. "Cost per 30 days" needs a daily amount per category. For the queue's categories I'd
   leave it out unless you give one (e.g. 1,000 IU/day for vitamin D would be a health
   choice, which is yours to make). OK?
5. Ashwagandha isn't in the queue. Keep it, migrated alongside creatine?
