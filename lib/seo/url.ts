import { getSiteUrl } from '../constants';

export const absoluteUrl = (path: string) => {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

export const boardUrl = (boardId: string, page = 1) =>
  page <= 1 ? `/board/${boardId}` : `/board/${boardId}/page/${page}`;

export const threadUrl = (boardId: string, threadId: string) =>
  `/board/${boardId}/thread/${threadId}`;

