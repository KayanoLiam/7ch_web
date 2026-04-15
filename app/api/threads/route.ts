import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { getBackendApiBaseUrl } from '../../../lib/constants';
import { cacheTags } from '../../../lib/cacheTags';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const boardId = url.searchParams.get('boardId') || 'all';
  const page = url.searchParams.get('page') || '1';
  const query = url.searchParams.get('q')?.trim();
  const backendUrl = new URL(`${getBackendApiBaseUrl()}/api/threads`);
  backendUrl.searchParams.set('boardId', boardId);
  backendUrl.searchParams.set('page', page);
  if (query) backendUrl.searchParams.set('q', query);

  const res = await fetch(backendUrl, {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  const body = await res.text();
  const contentType = res.headers.get('content-type') || 'application/json';

  return new NextResponse(body, {
    status: res.status,
    headers: {
      'content-type': contentType,
    },
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const res = await fetch(`${getBackendApiBaseUrl()}/api/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const body = await res.text();
  const contentType = res.headers.get('content-type') || 'application/json';

  if (res.ok && typeof payload?.boardId === 'string') {
    revalidateTag(cacheTags.threads);
    revalidateTag(cacheTags.board(payload.boardId));
    revalidateTag(cacheTags.boardPage(payload.boardId, 1));
    revalidateTag(cacheTags.board('all'));
    revalidateTag(cacheTags.boardPage('all', 1));
  }

  return new NextResponse(body, {
    status: res.status,
    headers: {
      'content-type': contentType,
    },
  });
}
