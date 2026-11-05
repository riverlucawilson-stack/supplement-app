// Checks that every source and buy link still answers. It only asks each
// server for a status code; it never reads or saves page content.
// Run it with:  npm run links
//
// It's separate from `npm run validate` because it needs the internet and is slow.
// Results:
//   DEAD          404 or 410: the page is gone. Find the new page or remove the entry.
//   COULDN'T CHECK 401, 403, 429 or a network error: the site blocked or limited the check.
//                 That doesn't mean the link is dead. Open it in a browser to be sure.
//   OTHER         any other unexpected code (e.g. 500). Worth a look.
// Exits with code 1 only when a link is DEAD.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'yaml';
import { evidencePages } from '../src/evidence';
import { linkStatus as status } from '../src/lib/link-status';
import type { LinkResult as Result } from '../src/lib/link-status';

const PRODUCTS_DIR = join('src', 'content', 'products');
// Wait between two requests to the same site, so the check stays polite.
const SAME_HOST_GAP_MS = 1_500;
const URL_KEYS = new Set(['url', 'listing_url', 'source_url']);

interface Link {
  url: string;
  where: string;
}

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

// Every url, listing_url and source_url anywhere in a product file.
function urlsIn(value: unknown, found: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((v) => urlsIn(v, found));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (URL_KEYS.has(k) && typeof v === 'string' && v.startsWith('http')) found.push(v);
      else urlsIn(v, found);
    }
  }
  return found;
}

function collectLinks(): Link[] {
  const links: Link[] = [];
  for (const file of listFiles(PRODUCTS_DIR).filter((f) => f.endsWith('.yaml'))) {
    const where = relative(PRODUCTS_DIR, file);
    for (const url of urlsIn(parse(readFileSync(file, 'utf8')))) links.push({ url, where });
  }
  for (const page of evidencePages) {
    for (const [id, c] of Object.entries(page.citations)) links.push({ url: c.source_url, where: `${page.category} evidence, ${id}` });
  }
  return links;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const links = collectLinks();
// Check each distinct URL once, but report every place it's used.
const byUrl = new Map<string, string[]>();
for (const l of links) byUrl.set(l.url, [...(byUrl.get(l.url) ?? []), l.where]);

// One queue per site, run side by side; each site gets one request at a time.
const byHost = new Map<string, string[]>();
for (const url of byUrl.keys()) {
  const host = new URL(url).hostname;
  byHost.set(host, [...(byHost.get(host) ?? []), url]);
}

console.log(`Checking ${byUrl.size} distinct links (${links.length} uses) on ${byHost.size} sites...\n`);
const results = new Map<string, Result>();
await Promise.all(
  [...byHost.values()].map(async (urls) => {
    for (const [i, url] of urls.entries()) {
      if (i > 0) await sleep(SAME_HOST_GAP_MS);
      results.set(url, await status(url));
    }
  }),
);

const sections: [Result['kind'], string][] = [
  ['dead', 'DEAD (404/410): fix or remove these'],
  ['other', 'OTHER: unexpected status, worth a look'],
  ['blocked', "COULDN'T CHECK (blocked, rate-limited or network error): not necessarily dead"],
];
for (const [kind, heading] of sections) {
  const hits = [...results].filter(([, r]) => r.kind === kind);
  if (!hits.length) continue;
  console.log(`${heading}: ${hits.length}`);
  for (const [url, r] of hits) console.log(`  ${r.detail}  ${url}\n        used in: ${byUrl.get(url)!.join('; ')}`);
  console.log('');
}
const ok = [...results.values()].filter((r) => r.kind === 'ok').length;
const dead = [...results.values()].filter((r) => r.kind === 'dead').length;
console.log(`${ok} OK, ${dead} dead, ${results.size - ok - dead} other or couldn't check.`);
if (dead > 0) process.exit(1);
