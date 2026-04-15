import { NextResponse } from 'next/server';

import { getBackendApiBaseUrl } from '../../../lib/constants';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  const backendUrl = `${getBackendApiBaseUrl()}/api/events`;
  const lastEventId = request.headers.get('last-event-id');

  const res = await fetch(backendUrl, {
    headers: {
      Accept: 'text/event-stream',
      'Cache-Control': 'no-cache',
      ...(lastEventId ? { 'Last-Event-ID': lastEventId } : {}),
    },
    cache: 'no-store',
    signal: request.signal,
  });

  if (!res.ok || !res.body) {
    const body = await res.text();
    return new NextResponse(body, {
      status: res.status,
      headers: {
        'content-type': res.headers.get('content-type') || 'text/plain; charset=utf-8',
      },
    });
  }

  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      connection: 'keep-alive',
      'x-accel-buffering': 'no',
    },
  });
}
