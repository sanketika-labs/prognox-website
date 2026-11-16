# Prognox website

Marketing site for **Prognox** — Sanketika's unified platform combining
[Obsrv](https://sanketika.in/products/obsrv) (real-time data engineering) and
[UnQuery](https://sanketika.in/products/unquery) (natural-language querying).

**Live:** https://sanketika-labs.github.io/prognox-website/

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro 5](https://astro.build) — static output |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4, mobile-first |
| Content | Markdown via Astro content collections |
| Hosting | GitHub Pages, deployed by GitHub Actions |

The site ships **no JavaScript bundles**. The two interactive pieces — the
mobile navigation drawer and the platform flow tabs — are small inline scripts
that progressively enhance markup which already works without them.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321/prognox-website
npm run build      # type-checks, then builds to dist/
npm run preview    # serve the production build locally
```

`npm run build` runs `astro check` first, so a type error or an invalid
content frontmatter field fails the build rather than shipping a broken page.

## Editing content

| What | Where |
|---|---|
| Navigation, contact details, proof stats | `src/data/site.ts` |
| Use-case copy | `src/content/usecases/*.md` |
| Brand colours, fonts, fluid type scale | `src/styles/tokens.css` |
| Page copy | `src/pages/*.astro` |

Use-case Markdown is schema-validated in `src/content.config.ts` — add a file
with the right frontmatter and it appears on `/use-cases` automatically.

## Brand assets

The current identity is a **placeholder**. Every brand decision is a CSS custom
property in `src/styles/tokens.css`; swapping in real assets means editing that
one file plus `src/components/Logo.astro` and `public/favicon.svg`.

Raster assets (`public/og.png`, `public/apple-touch-icon.png`) are generated
from inline SVG so no binary blobs need hand-maintaining:

```bash
node scripts/generate-images.mjs
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages.

### Moving to a custom domain

1. In `astro.config.mjs`, set `site` to the domain and `base` to `'/'`
2. Add `public/CNAME` containing the domain
3. Point DNS at GitHub Pages and set the domain in repository settings

Every internal link resolves through `src/lib/href.ts` and all SEO metadata
derives from the `site` config value, so nothing else needs changing.
