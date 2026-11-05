# Launch checklist: what River has to do

> Written by Claude 2026-11-05. NEEDS RIVER REVIEW. These are the steps only you can take
> (your accounts, your money, your name on the site). Claude can do everything else in ROADMAP.md.
> Tick items off here as you go.

## 1. Verify the data (required by CLAUDE.md before launch)
- [ ] Check every value Claude entered against its source link, then delete its `entered_by: claude` line.
      `npm run validate` lists them as UNVERIFIED: **459 values across 154 products** on 2026-11-05.
      Products with any unverified value show a "Not yet reviewed" pill on the site until you do.
- [ ] Check each evidence citation on PubMed or its source page and delete its `entered_by` line
      (see "Evidence follow-ups" in ROADMAP.md).
- [ ] Skim the `# CHECK` and `# MISSING` comments in product files; some ask a question only a
      physical label can answer.

## 2. Hosting (done)
- [x] Cloudflare Pages connected 2026-10-24; live at https://sup-search-doo.pages.dev and redeploys on every push.
- [ ] Optional, recommended: daily rebuild so "stale" labels appear on time. In Cloudflare go to
      Settings → Builds → Deploy hooks and create a hook, add its URL to the GitHub repo as a secret,
      then ask Claude to add the scheduled GitHub Action that calls it.

## 3. Code review and merge
- [ ] Merge the pull requests in order: #1 → #2 → #3 → #4 → #5 → #6 → #7. Each one is based on the one before.
- [ ] Then change Cloudflare's production branch from `claude/project-thread-6g8ebj` to `main`.

## 4. Domain (optional)
- [ ] Decide whether to keep `sup-search-doo.pages.dev` or buy a domain (any registrar, or Cloudflare Registrar).
- [ ] If you buy one: Cloudflare Pages → your project → Custom domains → add it, then tell Claude
      so it changes `siteUrl` in `src/settings.ts` (the sitemap, robots.txt and canonical links all use it).

## 5. Affiliate programs
- [x] None today. You said on 2026-11-05 that the site earns no commissions, and every page says so.
- [ ] If you ever join one, first read that program's own terms for the exact disclosure wording it
      requires, plus the FTC's guidance on endorsements, and tell Claude before any affiliate link goes in.
      Commissions must never affect rankings (CLAUDE.md).

## 6. Privacy
- [x] No analytics, no cookies, no forms, no accounts on the site today.
- [ ] Decide on fonts: each page loads its fonts from Google Fonts, so visitors' browsers contact
      Google's servers. Either mention it in a privacy note, or ask Claude to serve the fonts from the site itself.
- [ ] If you add analytics, cookies, a newsletter or a contact form later, publish a privacy policy first.

## 7. Content you own
- [ ] Evidence pages: all 10 were approved on 2026-10-24 under your delegation. Re-read them under your
      own name before promoting the site.
- [ ] Methodology page (approved 2026-11-05): re-read once on the live site.
- [ ] About page and "How to read a COA" page are still to be built (CLAUDE.md pages 4 and 6). Claude
      can build the templates; the words are yours.
- [ ] Decide on a contact or corrections address (e.g. a dedicated email) for brands and readers.

## 8. After launch
- [ ] Submit the sitemap (https://sup-search-doo.pages.dev/sitemap-index.xml, or your domain's) in
      Google Search Console and Bing Webmaster Tools. Both need your own account.
- [ ] Run `npm run links` on your computer now and then to catch dead links (this cloud environment can't reach outside sites).
