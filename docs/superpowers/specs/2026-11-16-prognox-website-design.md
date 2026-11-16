# Prognox Website — Design

**Date:** 2026-11-16
**Repo:** https://github.com/sanketika-labs/prognox-website
**Status:** Approved design, pending implementation plan

## 1. Purpose

Prognox is the unified product identity for Sanketika's **Obsrv** (real-time data
engineering) and **UnQuery** (natural-language querying). The name signals
prediction, forecasting, and forward-looking analytics.

This site is the public marketing home for Prognox. It must:

- Tell one coherent story — not two products stapled together
- Convert visitors into demo requests and open-source deployments
- Work flawlessly on every device, phone first
- Be editable by non-developers for copy changes

## 2. Stack

| Layer | Choice |
|---|---|
| Language | TypeScript (strict) |
| Framework | Astro 5 — static output, zero JS by default |
| Styling | Tailwind CSS 4, mobile-first |
| Content | Markdown/MDX via Astro content collections |
| Islands | `@astrojs/react` — used only by the two interactive components |
| Icons | Lucide (inline SVG, no runtime) |
| Fonts | Inter, self-hosted and subset — no external CDN request |
| Hosting | GitHub Pages |
| CI | GitHub Actions: push to `main` → build → deploy |

**Why Astro over a React SPA:** a marketing site is read far more often than it
is interacted with. Astro emits plain HTML, so first paint is fast on mobile
networks and crawlers index real content. A React SPA on GitHub Pages
additionally needs a `404.html` redirect hack for deep links; Astro does not.
Islands of interactivity (mobile nav drawer, tabbed platform diagram) hydrate
individually.

## 3. Hosting and the future domain

Initial URL: `https://sanketika-labs.github.io/prognox-website/`

```js
// astro.config.mjs
site: 'https://sanketika-labs.github.io',
base: '/prognox-website',
```

A custom domain will be added later. To keep that a five-minute change rather
than a rewrite:

- No hardcoded absolute internal links. All links resolve through a single
  `href()` helper that prefixes `import.meta.env.BASE_URL`.
- Canonical URLs, sitemap, and Open Graph tags derive from the `site` config
  value, so none of them bake in a stale `github.io` host.
- Migration steps: set `site` + `base`, add `public/CNAME`, point DNS.

## 4. Responsive strategy

Full device coverage is a hard requirement, implemented as:

- **Mobile-first authoring.** Base styles target 320px. Breakpoints layer
  upward: `sm:640 · md:768 · lg:1024 · xl:1280 · 2xl:1536`.
- **Fluid type and spacing** via `clamp()`, so text scales continuously instead
  of jumping at breakpoints.
- **Touch targets ≥ 44×44px.** Navigation collapses to a slide-over drawer
  below `lg`.
- **Responsive images.** Astro `<Image>` emits AVIF/WebP with `srcset` and
  explicit dimensions to prevent layout shift.
- **Mobile viewport quirks.** `dvh` units so iOS Safari's collapsing toolbar
  never clips the hero; `env(safe-area-inset-*)` padding for notched devices.
- **Motion and a11y.** `prefers-reduced-motion` honored; WCAG AA contrast;
  full keyboard navigation; visible focus rings.
- **Browser support.** Last 2 versions of Chrome, Safari, Firefox, Edge; iOS
  Safari 15+; Chrome Android.

**Verification gate:** rendering is checked in a real browser at 320, 375, 768,
1024, and 1440px before any page is considered complete. Responsiveness is
demonstrated, not asserted.

## 5. Information architecture

| Route | Purpose |
|---|---|
| `/` | Hero, the unified Prognox story, proof stats, primary CTA |
| `/platform` | How the pieces fit: ingest → process → ask → forecast |
| `/obsrv` | Data engineering capability: real-time, zero lock-in, scale |
| `/unquery` | Natural-language querying: ask in plain English, precise answers |
| `/use-cases` | Education (DIKSHA), Agriculture, IoT, EdTech cost savings |
| `/pricing` | Open source (Apache 2.0) vs Prognox Pro |
| `/contact` | Demo request, connect@sanketika.in |

Docs link out to `docs.obsrv.ai` rather than being rehosted.

## 6. Component architecture

Each component owns one job, takes typed props, and renders without knowledge
of its page context.

```
src/
├─ layouts/BaseLayout.astro      # <head>, SEO meta, nav, footer slot
├─ components/
│  ├─ nav/Header.astro           # desktop nav
│  ├─ nav/MobileDrawer.tsx       # island: hydrates on mobile only
│  ├─ Hero.astro
│  ├─ FeatureGrid.astro          # props: features[]
│  ├─ StatBand.astro             # props: stats[]
│  ├─ PlatformFlow.tsx           # island: interactive pipeline diagram
│  ├─ UseCaseCard.astro
│  ├─ PricingTable.astro
│  ├─ CTASection.astro
│  └─ Footer.astro
├─ content/
│  ├─ usecases/*.md              # editable use-case copy
│  └─ features/*.md
├─ lib/href.ts                   # base-path-aware link helper
├─ data/site.ts                  # nav, contact, social — single source
└─ styles/tokens.css             # brand tokens, all in one file
```

Copy lives in `content/` and `data/`, not inside components, so marketing edits
never require touching layout code.

## 7. Visual identity (placeholder)

No Prognox brand assets exist yet. This design creates a placeholder identity
expressing "predictive intelligence," defined entirely as CSS custom properties
in `styles/tokens.css` so real assets drop in with a single-file edit.

- **Palette:** dark-first. Deep indigo base (`#0B0E1A`), electric indigo primary
  (`#5B5BD6`), cyan accent (`#22D3EE`) for the forward-looking/predictive
  signal, warm amber for highlight stats.
- **Type:** Inter — tight tracking on display sizes, generous line-height on body.
- **Motif:** a forward-trending line/signal mark used in the wordmark, section
  dividers, and the platform flow diagram.
- **Assets produced:** SVG wordmark, favicon set, OG share image.

Light mode is explicitly out of scope for v1.

## 8. Content and claims

Copy is grounded in the live Obsrv and UnQuery product pages:

- Obsrv: 2B+ events/day peak, 100% uptime over 2+ years, 500M+ daily events
  average, powers DIKSHA; 80% cost savings and 2x throughput at an EdTech
  enterprise; 300x throughput with 80% cost reduction in IoT.
- UnQuery: natural-language querying over Druid, ClickHouse, Pinot, Iceberg,
  Hudi, Delta Lake, DuckDB; metadata-only architecture with queries executing in
  the customer's environment; works alongside Superset and Metabase.

**Assumption to confirm:** these numbers are attributed on-site as "proven in
production Obsrv deployments" rather than claimed directly by the Prognox brand.
This is accurate and defensible while the combined product is new. If Prognox
should claim them outright, that is a one-line copy change per stat.

## 9. Error handling and edge cases

- Custom `404.astro` styled to match the site, with navigation back to `/`.
- Contact form: GitHub Pages is static and cannot process POSTs. v1 uses a
  `mailto:` CTA to `connect@sanketika.in`. A hosted form endpoint (Formspree or
  similar) can be added later without structural change.
- No-JS fallback: every page is fully readable and navigable with JavaScript
  disabled, since only two components are islands.

## 10. Testing and verification

- `astro check` — TypeScript and template type errors, run in CI
- Build must succeed with zero warnings before deploy
- Link check across all internal routes to catch base-path mistakes
- Lighthouse mobile: targets of ≥95 performance, ≥95 accessibility, ≥95 SEO
- Manual browser verification at the five breakpoints listed in §4

## 11. Out of scope for v1

Blog, i18n, light mode, CMS integration, site search, analytics of any kind,
and gated content.
