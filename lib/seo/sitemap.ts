import { absoluteUrl } from './url';
import { getSeoThreads } from '../api/server';
import { isBoardIndexable } from '../boards';

export const SEO_THREADS_BATCH_LIMIT = 500;
export const SEO_THREADS_MAX_BATCHES = 20;

export const getThreadSitemapPath = (id: number) => `/thread-sitemap/sitemap/${id}.xml`;

export const getThreadSitemapUrls = (ids: number[]) =>
  ids.map((id) => absoluteUrl(getThreadSitemapPath(id)));

export const getActiveThreadSitemapIds = async () => {
  const ids: number[] = [];
  let cursor: string | undefined;

  for (let id = 0; id < SEO_THREADS_MAX_BATCHES; id += 1) {
    const response = await getSeoThreads(cursor, SEO_THREADS_BATCH_LIMIT);
    const hasIndexableThreads = response.threads.some((thread) => isBoardIndexable(thread.boardId));

    if (hasIndexableThreads) {
      ids.push(id);
    }

    if (!response.nextCursor) {
      break;
    }

    cursor = response.nextCursor;
  }

  return ids;
};
