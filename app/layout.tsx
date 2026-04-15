import type { Metadata } from 'next';

import '../index.css';
import Providers from './providers';
import { SiteFooter } from '../features/layout/SiteFooter';
import { SiteHeader } from '../features/layout/SiteHeader';
import { RealtimeNotices } from '../features/realtime/RealtimeNotices.client';
import { getSiteUrl } from '../lib/constants';
import { getServerLocale } from '../lib/i18n/server';
import { baseMetadata } from '../lib/seo/metadata';

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(getSiteUrl()),
};

const themeInitScript = `
(function () {
  try {
    var storageKey = '7ch_theme';
    var variantKey = '7ch_theme_variant';
    var root = document.documentElement;
    var stored = localStorage.getItem(storageKey);
    var variant = localStorage.getItem(variantKey) || 'classic';
    var theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'light';
    var resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    root.classList.toggle('dark', resolved === 'dark');
    root.dataset.theme = theme;
    root.dataset.themeVariant = variant;
    root.style.colorScheme = resolved;
  } catch (_) {}
})();
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Providers>
          <div className="flex min-h-screen flex-col font-sans">
            <SiteHeader />
            <RealtimeNotices />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
