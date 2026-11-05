# Installable app (PWA): proposal

> Written by Claude 2026-11-05. NEEDS RIVER REVIEW. Nothing here is built.

A PWA (progressive web app) is the same website with two extra pieces: a **manifest** (a small
file naming the app, its icon and colors, so phones offer "Add to Home Screen" / "Install") and,
optionally, a **service worker** (a script that saves pages on the phone so they open offline).
There's no app store, no separate code base, and no review process.

## What it would add
- An app icon on the home screen that opens the site full-screen, without the browser bar.
- With a service worker: pages a visitor has opened before load instantly and work offline
  (useful in a store aisle with poor signal).

## What it costs to build
| Option | Work | New moving parts |
|---|---|---|
| A. Manifest only (installable, no offline) | One unit: manifest file, a set of icons (sizes for iOS and Android), a few `<head>` tags | Icons to keep in sync with the logo |
| B. Manifest + offline pages | Two to three units: option A plus a service worker (via an Astro PWA plugin) and an offline notice | A plugin dependency to keep updated; cache rules |

## What it costs to maintain
- **Stale prices are the main risk.** Offline, a phone would show the prices it saved earlier, perhaps
  weeks old, on a site whose point is current prices. Option B would need a clear "saved on <date>,
  you're offline" banner, and short cache lifetimes for comparison and product pages.
- Every deploy has to replace the saved pages. Plugins handle this, but a broken service worker can
  keep serving an old site to returning visitors until they clear their browser data, and it's
  harder to debug than a normal page.
- Plugin updates when Astro releases a new major version.
- iOS supports installing and offline pages but handles some PWA features differently, so each
  change needs testing on an iPhone as well as Android.

## Recommendation
Start with **option A** (installable, always loads live data) if you want a home-screen icon; it adds
almost no upkeep. Leave offline pages (option B) until there's a reason: it trades fresh prices for
speed, which works against the site's purpose. Or skip both for now: the site already works well
in a phone browser (checked at 375 px on 2026-10-24).

**RIVER:** A, B, or neither?
