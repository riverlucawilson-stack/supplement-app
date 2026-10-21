# Category files

Each file here describes one category of the site. Adding a category means:

1. Copy an existing file (e.g. `creatine.yaml`) to `<slug>.yaml` and edit it.
2. Make the folder `src/content/products/<slug>/` and put product files in it.
3. Run `npm run validate` and `npm run build`.

No code changes are needed. The site makes `/<slug>/` (the table) and
`/<slug>/<product file name>/` (one page per product) automatically.

## What each part means

| Part | What it does |
|---|---|
| `slug` | The category's short name, used in addresses and folder names. Must match the file name. |
| `status` | `published` shows it in the menu, home page and sitemap. `draft` builds the pages for preview only. |
| `order` | Position in the menu and on the home page, lowest first. |
| `page` | The table page's title, search description, heading and intro. Put `**double stars**` around words to bold them. |
| `comparison.amount` + `unit` | What every price is converted to, e.g. 5 g or 1000 IU. |
| `comparison.counts_toward` | Which dose numbers are added up to make that amount. Fish oil would list both EPA and DHA. Amounts in g, mg and mcg are converted automatically; IU only adds up with IU. |
| `comparison.daily_amount` + `daily_label` | For the "cost per 30 days" column. Leave both out to hide the column. |
| `comparison.plausible_cost` | Validation warns when a cost falls outside this range, which usually means a typo. |
| `dose_fields` | The numbers a product file records under `dose:`, per serving. Each has a `label` and a `unit`. Add `optional: true` if labels don't always state it, `whole_number: true` for counts like capsules, and `max` (plus an optional `max_message`) to catch unit mix-ups. `servings_per_container` is always required and isn't listed. If a category has `serving_size_g`, validation checks that the counted ingredients don't weigh more than the serving. |
| `type` | The one choice every product makes (e.g. creatine type, magnesium form), with the words shown for each choice. |
| `extra_fields` | Optional text fields (e.g. raw material brand). |
| `describe` | The short line under each product's name. `{field}` is replaced by that field's value; a part is skipped when its field is empty. |
| `certifications` | Which programs count toward the tier. Certifications still come only from the certifier's own site. Adding a program changes which products can reach Tier A, so it needs River's OK. |
| `coa_tests` | The tests a COA can report, with the words shown on product pages. |

The tier rules themselves are the same for every category and live in `src/lib/tier.ts`.
