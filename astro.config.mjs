// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { settings } from './src/settings.ts';
import { loadCategoryConfigs } from './src/categories/config.ts';

// Draft categories (status: draft in categories/<slug>.yaml) build for preview but stay out of the sitemap.
const draftPaths = loadCategoryConfigs()
  .filter((c) => c.status === 'draft')
  .map((c) => `/${c.slug}/`);

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: settings.siteUrl,
  output: 'static',
  integrations: [sitemap({ filter: (page) => !draftPaths.some((p) => new URL(page).pathname.startsWith(p)) })],
});
