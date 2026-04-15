import type { Metadata } from 'next';

import { tServer } from '../../lib/i18n/dictionaries';
import { getServerLocale } from '../../lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: tServer('page.servicePaused.title', locale),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ServicePausedPage() {
  const locale = await getServerLocale();

  return (
    <div className="themed-page min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="themed-card themed-card-featured p-8">
          <h1 className="themed-heading mb-3 text-2xl">{tServer('page.servicePaused.title', locale)}</h1>
          <p className="themed-meta">{tServer('page.servicePaused.body', locale)}</p>
        </div>
      </div>
    </div>
  );
}
