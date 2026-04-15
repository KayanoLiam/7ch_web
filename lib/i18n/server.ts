import { cookies, headers } from 'next/headers';

import { defaultLocale, isLocale, localeCookieName, tServer, type Locale } from './dictionaries';
import { requestLocaleHeaderName } from './routing';

export async function getServerLocale(): Promise<Locale> {
  const requestHeaders = await headers();
  const fromHeader = requestHeaders.get(requestLocaleHeaderName);
  if (isLocale(fromHeader)) return fromHeader;

  const store = await cookies();
  const value = store.get(localeCookieName)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function getServerTranslator() {
  const locale = await getServerLocale();
  return {
    locale,
    t: (key: string) => tServer(key, locale),
  };
}
