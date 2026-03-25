// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.rudycorona.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      customPages: ['https://www.rudycorona.com/blog/jumbo-loans-south-bay/'],
    }),
  ],
  server: {
    port: 4321,
    host: true
  },
  vite: {
    build: {
      emptyOutDir: false,
    },
    plugins: [tailwindcss()],
  },
});