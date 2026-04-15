import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { cacheTags } from '../../../lib/cacheTags';
import { getBackendApiBaseUrl } from '../../../lib/constants';

const resolveBoardIdFromThread = async (threadId: string) => {
  try {
    const backendUrl = new URL(`${getBackendApiBaseUrl()}/api/threads/${encodeURIComponent(threadId)}`);
    backendUrl.searchParams.set('trackView', 'false');

    const res = await fetch(backendUrl, {
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) return undefined;

    const payload = await res.json() as { boardId?: unknown };
    return typeof payload?.boardId === 'string' ? payload.boardId : undefined;
  } catch {
    return undefined;
  }
};

export async function POST(request: Request) {
  const payload = await request.json();
  const backendPayload = payload && typeof payload === 'object'
    ? { ...(payload as Record<string, unknown>) }
    : payload;
  const boardId = backendPayload && typeof backendPayload === 'object' && typeof backendPayload.boardId === 'string'
    ? backendPayload.boardId
    : undefined;
  const threadId = backendPayload && typeof backendPayload === 'object' && typeof backendPayload.threadId === 'string'
    ? backendPayload.threadId
    : undefined;

  if (backendPayload && typeof backendPayload === 'object') {
    delete backendPayload.boardId;
  }

  const res = await fetch(`${getBackendApiBaseUrl()}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(backendPayload),
    cache: 'no-store',
  });

  const body = await res.text();
  const contentType = res.headers.get('content-type') || 'application/json';

  if (res.ok && threadId) {
    const revalidateBoardId = boardId || await resolveBoardIdFromThread(threadId);

    revalidateTag(cacheTags.thread(threadId));
    revalidateTag(cacheTags.threads);
    revalidateTag(cacheTags.board('all'));
    revalidateTag(cacheTags.boardPage('all', 1));
    if (revalidateBoardId) {
      revalidateTag(cacheTags.board(revalidateBoardId));
      revalidateTag(cacheTags.boardPage(revalidateBoardId, 1));
    }
  }

  return new NextResponse(body, {
    status: res.status,
    headers: {
      'content-type': contentType,
    },
  });
}
