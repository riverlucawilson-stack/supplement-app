// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { settings } from './src/settings.ts';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: settings.siteUrl,
  output: 'static',
  integrations: [sitemap()],
});
