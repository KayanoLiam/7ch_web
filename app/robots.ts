import type { MetadataRoute } from 'next';

import { getSiteUrl } from '../lib/constants';
import { getActiveThreadSitemapIds, getThreadSitemapUrls } from '../lib/seo/sitemap';

export default async function robots(): Promise<MetadataRoute.Robots> {
  let threadSitemaps: string[] = [];

  try {
    threadSitemaps = getThreadSitemapUrls(await getActiveThreadSitemapIds());
  } catch {
    threadSitemaps = [];
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/favorites',
        '/service-paused',
        '/rate-limited',
        '/tools/convert',
        '/board/baito',
      ],
    },
    sitemap: [`${getSiteUrl()}/sitemap.xml`, ...threadSitemaps],
  };
}
