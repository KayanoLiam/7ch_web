import { NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ boardId: string; threadId: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const { boardId, threadId } = await params;
  const requestUrl = new URL(request.url);
  const redirectUrl = new URL(`/board/${boardId}/thread/${threadId}`, requestUrl);
  redirectUrl.search = requestUrl.search;

  return NextResponse.redirect(redirectUrl, 308);
}
