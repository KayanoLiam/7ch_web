import type { Metadata } from 'next';

import { FavoritesPageClient } from '../../features/thread-preferences/FavoritesPage.client';
import { tServer } from '../../lib/i18n/dictionaries';
import { getServerLocale } from '../../lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: tServer('page.favorites.title', locale),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function FavoritesPage() {
  return <FavoritesPageClient />;
}
