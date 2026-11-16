/**
 * Resolves an internal path against the configured base path.
 *
 * The site ships today under /prognox-website/ and will later move to a custom
 * domain at the root. Routing every internal link through this helper means
 * that move is a config change, not a find-and-replace across the codebase.
 *
 *   href('/platform')  ->  '/prognox-website/platform'   (base: '/prognox-website')
 *   href('/platform')  ->  '/platform'                   (base: '/')
 *
 * External URLs, mailto: links and bare fragments pass through untouched.
 */
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

export function href(path: string): string {
  if (EXTERNAL.test(path)) return path;

  // BASE_URL is '/prognox-website/' or '/' — normalise away the trailing slash.
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;

  // The home page must keep its slash, or the root link renders as ''.
  if (suffix === '/') return base === '' ? '/' : `${base}/`;

  return `${base}${suffix}`;
}

/** True when `current` is the active route for nav link `target`. */
export function isActive(current: string, target: string): boolean {
  const normalise = (p: string) => {
    const withoutBase = p.replace(import.meta.env.BASE_URL.replace(/\/+$/, ''), '');
    const trimmed = withoutBase.replace(/\/+$/, '');
    return trimmed === '' ? '/' : trimmed;
  };
  return normalise(current) === normalise(target);
}
