import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { cacheTags } from '../../../lib/cacheTags';

const allowedEvents = new Set(['thread_created', 'post_created']);

export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const authorization = request.headers.get('authorization');
  if (authorization !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const body = payload && typeof payload === 'object'
    ? payload as Record<string, unknown>
    : {};
  const event = body.event;
  const boardId = typeof body.boardId === 'string' ? body.boardId : undefined;
  const threadId = typeof body.threadId === 'string' ? body.threadId : undefined;

  if (typeof event !== 'string' || !allowedEvents.has(event)) {
    return NextResponse.json({ error: 'invalid_event' }, { status: 400 });
  }

  if (event === 'thread_created' && !boardId) {
    return NextResponse.json({ error: 'board_id_required' }, { status: 400 });
  }

  if (event === 'post_created' && (!boardId || !threadId)) {
    return NextResponse.json({ error: 'board_id_and_thread_id_required' }, { status: 400 });
  }

  if (event === 'thread_created' && boardId) {
    revalidateTag(cacheTags.threads);
    revalidateTag(cacheTags.board(boardId));
    revalidateTag(cacheTags.boardPage(boardId, 1));
    revalidateTag(cacheTags.board('all'));
    revalidateTag(cacheTags.boardPage('all', 1));
  }

  if (event === 'post_created' && threadId) {
    revalidateTag(cacheTags.thread(threadId));
    revalidateTag(cacheTags.threads);
    if (boardId) {
      revalidateTag(cacheTags.board(boardId));
      revalidateTag(cacheTags.boardPage(boardId, 1));
    }
    revalidateTag(cacheTags.board('all'));
    revalidateTag(cacheTags.boardPage('all', 1));
  }

  return NextResponse.json({ ok: true });
}
