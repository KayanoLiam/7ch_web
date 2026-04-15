import { NextResponse } from 'next/server';

import { getBackendApiBaseUrl } from '../../../../lib/constants';

type RouteContext = {
  params: Promise<{ threadId: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const { threadId } = await params;
  const requestUrl = new URL(request.url);
  const trackView = requestUrl.searchParams.get('trackView') || 'false';
  const backendUrl = new URL(`${getBackendApiBaseUrl()}/api/threads/${encodeURIComponent(threadId)}`);
  backendUrl.searchParams.set('trackView', trackView);

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
