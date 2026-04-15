import type { MetadataRoute } from 'next';

import { commonLinks } from '../data/commonLinks';
import { supportedLocales } from '../lib/i18n/dictionaries';
import { buildLocalizedStaticPath, localizedStaticPaths } from '../lib/i18n/routing';
import { visibleContentBoardIds } from '../lib/boards';
import { absoluteUrl, boardUrl } from '../lib/seo/url';

const staticPaths = [
  '/',
  '/board/links',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.6,
    })),
    ...supportedLocales.flatMap((locale) =>
      localizedStaticPaths.map((path) => ({
        url: absoluteUrl(buildLocalizedStaticPath(path, locale)),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ),
    ...visibleContentBoardIds.map((boardId) => ({
      url: absoluteUrl(boardUrl(boardId)),
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    })),
    ...commonLinks.map((item) => ({
      url: absoluteUrl(`/board/links/thread/${item.id}`),
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];

  return urls;
}
