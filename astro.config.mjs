// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://rudycorona.com',
  integrations: [sitemap()],
  server: {
    port: 4321,
    host: true
  },
  vite: {
    build: {
      // Keep legacy static pages in dist/ (contact, calculators, etc.) when building
      emptyOutDir: false
    },
    plugins: [tailwindcss()]
  }
});