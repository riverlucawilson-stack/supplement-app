// robots.txt: lets search engines crawl everything and tells them where the sitemap is.
import type { APIRoute } from 'astro';
import { settings } from '../settings';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', settings.siteUrl)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
