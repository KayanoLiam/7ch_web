import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

import type { Thread } from '../../types';
import { formatLocalizedCalendarDateTime } from '../../lib/date';
import { tServer } from '../../lib/i18n/dictionaries';
import type { Locale } from '../../lib/i18n/dictionaries';
import { buildDescription } from '../../lib/seo/sanitize';
import { threadUrl } from '../../lib/seo/url';
import { ThreadCardShell } from '../thread-preferences/ThreadCardShell.client';

interface ThreadCardProps {
  thread: Thread;
  boardName: string;
  locale: Locale;
}

export function ThreadCard({ thread, boardName, locale }: ThreadCardProps) {
  const href = threadUrl(thread.boardId, thread.id);
  const summary = buildDescription(thread.opPost.content, '', 220);
  const updatedAt = formatLocalizedCalendarDateTime(new Date(thread.updatedAt), locale);

  return (
    <ThreadCardShell threadId={thread.id} title={thread.title}>
      <div className="min-w-0">
        <div className="mb-2 text-xs themed-meta lg:hidden">
          {updatedAt} ID:{thread.opPost.uid}
        </div>
        <h2 className="themed-heading-sm mb-2 break-words text-lg hover:underline [overflow-wrap:anywhere] sm:text-[1.35rem] lg:mb-1 lg:text-base">
          <Link href={href}>{thread.title}</Link>
        </h2>
        {summary && (
          <p className="mb-4 break-words text-sm leading-relaxed text-foreground [overflow-wrap:anywhere] lg:mb-0 lg:truncate lg:text-[13px] lg:text-[hsl(var(--soft-foreground))]">
            <Link href={href}>{summary}</Link>
          </p>
        )}
        <div className="mb-3 lg:hidden">
          <Link className="bbs-link break-all text-sm" href={href}>
            {href}
          </Link>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold themed-meta lg:hidden">
          <span className="text-[hsl(var(--brand))]">
            {tServer('meta.replies', locale)}: {thread.postCount}
          </span>
          <span>{boardName}</span>
          <span>
            {tServer('meta.views', locale)}: {thread.viewCount}
          </span>
        </div>
      </div>

      <div className="hidden items-center justify-end gap-7 text-xs themed-meta lg:flex">
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="h-4 w-4" />
          {thread.postCount}
        </span>
        <span className="w-20 text-right">{updatedAt}</span>
      </div>
    </ThreadCardShell>
  );
}
