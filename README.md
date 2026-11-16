# Prognox website

Marketing site for **Prognox** — Sanketika's unified platform combining
[Obsrv](https://sanketika.in/products/obsrv) (real-time data engineering) and
[unQuery](https://sanketika.in/products/unquery) (natural-language querying).

**Live:** https://prognox.ai

It is deliberately a **single page**. Detail about either product lives on its
own sanketika.in page; this site links out rather than restating it.

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro 5](https://astro.build) — static output |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4, mobile-first |
| Hosting | GitHub Pages, deployed by GitHub Actions |

The site ships **no JavaScript bundles**. The only script is the theme switch:
a few lines inline in `BaseLayout.astro` that apply the stored theme before
first paint, plus the handler in `ThemeToggle.astro`.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # type-check only
npm run build      # type-checks, then builds to dist/
npm run preview    # serve the production build locally
```

`npm run build` runs `astro check` first, so a type error fails the build
rather than shipping a broken page.

## Theming

Both themes come from one place. `src/styles/tokens.css` defines **semantic**
custom properties — `--color-surface`, `--color-fg`, `--color-hairline` and so
on — and a single `[data-theme='dark']` block redefines them. No component
names a literal colour, so there is not one `dark:` variant in the codebase.

| Variable group | Purpose |
|---|---|
| `--color-surface`, `-alt`, `-raised` | Page, banded section, raised chrome |
| `--color-block`, `--color-block-deep` | The full-bleed cobalt hero/closing blocks and the ticker strip |
| `--color-fg`, `-muted`, `-faint` | Type hierarchy |
| `--color-bone*`, `--color-hairline-block` | On the cobalt block — identical in both themes, since the block is dark either way |
| `--color-amber`, `--color-link` | The single loud accent, and links |

A first-time visitor gets whichever theme their system is set to, and the
page keeps following it live — so an OS set to switch at sunset switches the
site too. Using the header toggle takes over: that choice persists in
`localStorage` under `prognox-theme` and the system is no longer consulted. Sections that sit on the cobalt block take the `.on-block`
class, which locally redefines the `--color-fg*` and `--color-hairline`
variables to their bone equivalents so their children keep reading the plain
semantic names.

## Editing content

| What | Where |
|---|---|
| Section links, contact details, proof stats, product URLs | `src/data/site.ts` |
| Colours, fonts, fluid type scale, both themes | `src/styles/tokens.css` |
| All page copy, the ticker and the two engine panels | `src/pages/index.astro` |
| Demo video and poster frame | `public/media/` |

## Brand assets

The current identity is a **placeholder**. Swapping in real assets means
editing `src/styles/tokens.css`, `src/components/Logo.astro` and
`public/favicon.svg`.

Raster assets (`public/og.png`, `public/apple-touch-icon.png`) are generated
from inline SVG so no binary blobs need hand-maintaining:

```bash
node scripts/generate-images.mjs
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages.

### The custom domain

The site is served from `prognox.ai`. Two things hold that in place and both
are required: `public/CNAME`, which ships inside the build artifact, and the
custom domain recorded in the repository's Pages settings. An Actions-based
deploy replaces `dist/` wholesale on every push, so deleting the `CNAME` file
would drop the domain on the next deploy.

DNS lives at GoDaddy: four `A` records on `@` pointing at GitHub's Pages
addresses (`185.199.108–111.153`), plus a `www` `CNAME` to
`sanketika-labs.github.io`.

Every internal link resolves through `src/lib/href.ts` and all SEO metadata
derives from the `site` config value, so moving again is an edit to `site`,
`base` and `CNAME` — and nothing else.
