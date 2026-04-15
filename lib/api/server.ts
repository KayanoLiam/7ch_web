import { getBackendApiBaseUrl } from '../constants';
import { fallbackBoards, mergeBoardsWithStatic } from '../boards';
import { cacheTags } from '../cacheTags';
import type { Board, PaginatedThreads, SeoThreadsPage, ThreadDetail } from '../../types';

class BackendApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = 'BackendApiError';
  }
}

const parseErrorBody = async (res: Response) => {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) return null;
  try {
    return (await res.json()) as { error?: string; message?: string };
  } catch {
    return null;
  }
};

const request = async <T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number; tags?: string[] } },
) => {
  const res = await fetch(`${getBackendApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await parseErrorBody(res);
    throw new BackendApiError(body?.message || `Request failed: ${res.status}`, res.status, body?.error);
  }

  return (await res.json()) as T;
};

export const isBackendNotFound = (error: unknown) =>
  error instanceof BackendApiError && error.status === 404;

export const isBackendUnavailable = (error: unknown) =>
  error instanceof BackendApiError && error.status === 503 && error.code === 'database_unavailable';

export const getBoards = async () =>
  request<Board[]>('/api/boards', {
    next: {
      revalidate: 3600,
      tags: [cacheTags.boards],
    },
  });

export const getVisibleBoards = async () => {
  try {
    return mergeBoardsWithStatic(await getBoards());
  } catch {
    return mergeBoardsWithStatic(fallbackBoards);
  }
};

export const getThreads = async (boardId: string, page = 1, query?: string) => {
  const params = new URLSearchParams({ boardId, page: String(page) });
  const trimmedQuery = query?.trim();
  if (trimmedQuery) {
    params.set('q', trimmedQuery);
    return request<PaginatedThreads>(`/api/threads?${params.toString()}`, {
      cache: 'no-store',
    });
  }

  return request<PaginatedThreads>(`/api/threads?${params.toString()}`, {
    next: {
      revalidate: page === 1 ? 60 : 300,
      tags: [cacheTags.threads, cacheTags.board(boardId), cacheTags.boardPage(boardId, page)],
    },
  });
};

export const getThreadDetail = async (
  threadId: string,
  options: { trackView?: boolean } = { trackView: false },
) => {
  const trackView = options.trackView ?? false;
  const params = new URLSearchParams({ trackView: String(trackView) });
  const path = `/api/threads/${encodeURIComponent(threadId)}?${params.toString()}`;

  if (trackView) {
    return request<ThreadDetail>(path, {
      cache: 'no-store',
    });
  }

  return request<ThreadDetail>(path, {
    next: {
      revalidate: 60,
      tags: [cacheTags.thread(threadId)],
    },
  });
};

export const getSeoThreads = async (cursor?: string, limit = 500) => {
  const params = new URLSearchParams({ limit: String(limit) });
  const trimmedCursor = cursor?.trim();
  if (trimmedCursor) params.set('cursor', trimmedCursor);

  return request<SeoThreadsPage>(`/api/seo/threads?${params.toString()}`, {
    next: {
      revalidate: 60,
    },
  });
};
