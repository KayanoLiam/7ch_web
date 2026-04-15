import { Suspense } from 'react';

import { SiteHeaderClient } from './SiteHeaderClient.client';
import { siteName } from '../../lib/constants';
import { tServer } from '../../lib/i18n/dictionaries';
import { getServerLocale } from '../../lib/i18n/server';

const headerLabelKeys = [
  'nav.boards',
  'nav.favorites',
  'nav.docs',
  'nav.menu',
  'nav.searchPlaceholder',
  'dialog.login.button',
  'dialog.login.title',
  'dialog.login.description',
  'dialog.login.link_text',
  'dialog.login.close',
  'lang.zh',
  'lang.ja',
  'theme.title',
  'theme.mode.title',
  'theme.light',
  'theme.dark',
  'theme.system',
  'theme.variant.title',
  'theme.variant.classic',
  'theme.variant.claude',
  'theme.variant.scheme1',
] as const;

export async function SiteHeader() {
  const locale = await getServerLocale();
  const labels = Object.fromEntries(
    headerLabelKeys.map((key) => [key, tServer(key, locale)]),
  );

  return (
    <Suspense fallback={(
      <header className="themed-header-shell sticky top-0 z-20">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <span className="themed-brandmark text-xl sm:text-2xl">{siteName}</span>
        </div>
      </header>
    )}>
      <SiteHeaderClient initialLocale={locale} labels={labels} />
    </Suspense>
  );
}
