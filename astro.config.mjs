// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Hosting: https://prognox.ai — the domain is pinned by public/CNAME and by
// the custom domain recorded on the repository's Pages settings. Both are
// needed: an Actions-based deploy republishes dist/ in full on every push,
// so the CNAME file has to ship in the artifact to survive.
// GitHub keeps redirecting the old sanketika-labs.github.io/prognox-website
// path here, so nothing already shared goes dead.
export default defineConfig({
  site: 'https://prognox.ai',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
