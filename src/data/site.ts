/**
 * Single source of truth for navigation, contact details and shared copy.
 * Editing site-wide text happens here, not inside components.
 */

export const site = {
  name: 'Prognox',
  tagline: 'Predictive intelligence on your data',
  description:
    'Prognox unifies real-time data engineering with natural-language querying, so your data is pipeline-ready, answerable in plain English, and pointed at what happens next.',
  email: 'connect@sanketika.in',
  careersEmail: 'careers@sanketika.in',
  github: 'https://github.com/sanketika-labs',
  linkedin: 'https://www.linkedin.com/company/sanketika',
  docs: 'https://docs.obsrv.ai',
  parent: { name: 'Sanketika', url: 'https://sanketika.in' },
} as const;

export type NavItem = { label: string; path: string };

export const nav: NavItem[] = [
  { label: 'Platform', path: '/platform' },
  { label: 'Obsrv', path: '/obsrv' },
  { label: 'UnQuery', path: '/unquery' },
  { label: 'Use Cases', path: '/use-cases' },
  { label: 'Pricing', path: '/pricing' },
];

export const footerLinks: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Product',
    items: [
      { label: 'Platform', path: '/platform' },
      { label: 'Obsrv', path: '/obsrv' },
      { label: 'UnQuery', path: '/unquery' },
      { label: 'Pricing', path: '/pricing' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Documentation', path: site.docs },
      { label: 'GitHub', path: site.github },
      { label: 'Use Cases', path: '/use-cases' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'Sanketika', path: site.parent.url },
      { label: 'Contact', path: '/contact' },
      { label: 'Careers', path: `mailto:${site.careersEmail}` },
    ],
  },
];

/**
 * Proof points measured in production Obsrv deployments. They are presented
 * on-site with that attribution rather than claimed by the Prognox brand
 * directly — accurate while the combined product is new.
 */
export const proofStats = [
  { value: '2B+', label: 'Events per day at peak', detail: 'Sustained ingestion ceiling' },
  { value: '100%', label: 'Uptime over 2+ years', detail: 'National-scale production' },
  { value: '500M+', label: 'Daily events on DIKSHA', detail: "India's education platform" },
  { value: '80%', label: 'Infrastructure cost saved', detail: 'EdTech enterprise migration' },
];
