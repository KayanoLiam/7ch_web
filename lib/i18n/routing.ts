import { defaultLocale, isLocale, localeCookieName, supportedLocales, type Locale } from './dictionaries';

export const requestLocaleHeaderName = 'x-7ch-locale';

export const localizedStaticPaths = [
  '/docs',
  '/help',
  '/QA',
  '/privacy',
  '/terms',
  '/changelog',
] as const;

const normalizedLocalizedStaticPaths = new Set<string>(localizedStaticPaths);

const ensureLeadingSlash = (pathname: string) => (pathname.startsWith('/') ? pathname : `/${pathname}`);

const normalizePathname = (pathname: string) => {
  const normalized = ensureLeadingSlash(pathname || '/');
  if (normalized === '/') return normalized;
  return normalized.replace(/\/+$/, '');
};

export const getLocaleFromPathname = (pathname: string): Locale | null => {
  const segment = normalizePathname(pathname).split('/')[1];
  return isLocale(segment) ? segment : null;
};

export const stripLocalePrefix = (pathname: string) => {
  const normalized = normalizePathname(pathname);
  const locale = getLocaleFromPathname(normalized);
  if (!locale) return normalized;

  const stripped = normalized.slice(locale.length + 1);
  return stripped ? ensureLeadingSlash(stripped) : '/';
};

export const isLocalizedStaticPath = (pathname: string) =>
  normalizedLocalizedStaticPaths.has(stripLocalePrefix(pathname));

export const buildLocalizedStaticPath = (pathname: string, locale: Locale) => {
  const stripped = stripLocalePrefix(pathname);
  if (!normalizedLocalizedStaticPaths.has(stripped)) return stripped;
  return `/${locale}${stripped}`;
};

export const buildStaticPageAlternates = (pathname: string) =>
  Object.fromEntries(
    supportedLocales.map((locale) => [locale, buildLocalizedStaticPath(pathname, locale)]),
  );

export const readLocaleFromCookieHeader = (cookieHeader?: string | null): Locale => {
  if (!cookieHeader) return defaultLocale;

  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [rawName, rawValue] = cookie.trim().split('=');
    if (rawName !== localeCookieName || !rawValue) continue;
    const decodedValue = decodeURIComponent(rawValue);
    if (isLocale(decodedValue)) return decodedValue;
  }

  return defaultLocale;
};
