// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://briroshay.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false, // / for English, /fr/ for French
    },
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Sanity serves its own CDN with on-the-fly transforms,
    // so we use 'noop' here and let Sanity handle image optimisation.
    domains: ['cdn.sanity.io'],
  },
});
