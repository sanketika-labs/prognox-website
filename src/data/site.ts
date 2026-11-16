/**
 * Single source of truth for shared copy and outbound links.
 * Prognox is a one-page site: detail lives on the Obsrv and unQuery product
 * pages, which this file points at rather than duplicating.
 */

export const site = {
  name: 'Prognox',
  description:
    "Prognox unites Obsrv's real-time data engineering with unQuery's natural-language analytics — one platform that carries a raw event all the way to a plain-English answer.",
  email: 'connect@sanketika.in',
  linkedin: 'https://www.linkedin.com/company/sanketika',
  parent: { name: 'Sanketika', url: 'https://sanketika.in' },
  obsrv: 'https://sanketika.in/products/obsrv',
  unquery: 'https://sanketika.in/products/unquery',
} as const;

/** In-page anchors — the only navigation this site has. */
export const sections = [
  { label: 'Platform', id: 'platform' },
  { label: 'Demo', id: 'demo' },
  { label: 'Contact', id: 'contact' },
] as const;

/**
 * Proof points measured in production Obsrv deployments, presented with that
 * attribution rather than claimed by the Prognox brand directly.
 */
export const proofStats = [
  { value: '2B+', label: 'Events per day' },
  { value: '100%', label: 'Uptime, 2+ years' },
  { value: 'DIKSHA', label: 'Battle-tested at national scale' },
] as const;
