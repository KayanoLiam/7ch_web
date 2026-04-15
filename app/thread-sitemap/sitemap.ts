import type { MetadataRoute } from 'next';

import { getSeoThreads } from '../../lib/api/server';
import { isBoardIndexable } from '../../lib/boards';
import { SEO_THREADS_BATCH_LIMIT, SEO_THREADS_MAX_BATCHES } from '../../lib/seo/sitemap';
import { absoluteUrl, threadUrl } from '../../lib/seo/url';

export async function generateSitemaps() {
  return Array.from({ length: SEO_THREADS_MAX_BATCHES }, (_, id) => ({ id }));
}

const getCursorForBatch = async (batchId: number) => {
  let cursor: string | undefined;

  for (let currentBatch = 0; currentBatch < batchId; currentBatch += 1) {
    const response = await getSeoThreads(cursor, SEO_THREADS_BATCH_LIMIT);
    if (!response.nextCursor) {
      return null;
    }
    cursor = response.nextCursor;
  }

  return cursor;
};

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  if (!Number.isInteger(id) || id < 0 || id >= SEO_THREADS_MAX_BATCHES) {
    return [];
  }

  try {
    const cursor = await getCursorForBatch(id);
    if (id > 0 && cursor === null) {
      return [];
    }

    const response = await getSeoThreads(cursor ?? undefined, SEO_THREADS_BATCH_LIMIT);
    return response.threads
      .filter((thread) => isBoardIndexable(thread.boardId))
      .map((thread) => ({
        url: absoluteUrl(threadUrl(thread.boardId, thread.id)),
        lastModified: new Date(thread.updatedAt),
        changeFrequency: 'hourly' as const,
        priority: 0.9,
      }));
  } catch {
    return [];
  }
}
