// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Hosting today: https://sanketika-labs.github.io/prognox-website/
// To move to a custom domain later, change `site` to the domain, set
// `base: '/'`, and add public/CNAME. Nothing else needs to change —
// every internal link resolves through src/lib/href.ts and all SEO
// metadata derives from `site`.
export default defineConfig({
  site: 'https://sanketika-labs.github.io',
  base: '/prognox-website',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
