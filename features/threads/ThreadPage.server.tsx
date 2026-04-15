import Link from 'next/link';

import type { Post, ThreadDetail } from '../../types';
import { PostText } from '../../components/seo/PostText';
import { formatLocalizedCalendarDateTime } from '../../lib/date';
import { tServer, type Locale } from '../../lib/i18n/dictionaries';
import { buildThreadJsonLd, stringifyJsonLd } from '../../lib/seo/jsonLd';
import { ReplyForm } from '../forms/ReplyForm.client';
import { ThreadFollowButton } from '../thread-preferences/ThreadFollowButton.client';
import { QuoteInteractions, ReplyToPostButton } from './QuoteInteractions.client';

const displayName = (post: Post, locale: Locale) => (post.name === 'Anonymous' ? tServer('meta.anonymous', locale) : post.name);

export function ThreadPage({ thread, locale }: { thread: ThreadDetail; locale: Locale }) {
  const jsonLd = buildThreadJsonLd(thread);

  return (
    <div className="themed-page min-h-[calc(100vh-3.5rem)] pt-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(jsonLd) }} />
      <QuoteInteractions posts={thread.posts.map((post) => ({
        id: post.id,
        name: displayName(post, locale),
        content: post.content,
        createdAt: post.createdAt,
      }))} />
      <div className="mx-auto max-w-4xl px-0 pb-20 sm:px-2">
        <div className="themed-card themed-card-featured mb-4 p-4 sm:p-6">
          <div className="themed-meta mb-2 flex items-center text-xs">
            <Link href={`/board/${thread.boardId}`} className="themed-inline-action mr-2">
              &lt; /{thread.boardId}/
            </Link>
            <span>{formatLocalizedCalendarDateTime(new Date(thread.updatedAt), locale)}</span>
          </div>
          <h1 className="themed-heading mb-2 text-xl md:text-2xl">{thread.title}</h1>
          <div className="themed-meta mt-2 flex items-center gap-4 text-xs font-bold">
            <span className="text-[#d32f2f]">
              {tServer('meta.replies', locale)}: {thread.postCount}
            </span>
            <span className="text-[#f57c00]">
              {tServer('meta.views', locale)}: {thread.viewCount}
            </span>
            <ThreadFollowButton threadId={thread.id} />
          </div>
        </div>

        <div className="space-y-0 sm:space-y-4">
          {thread.posts.map((post) => (
            <article key={post.id} className="themed-card mb-3 p-4 sm:p-5" id={`p${post.id}`}>
              <div className="themed-meta mb-3 flex flex-wrap items-baseline gap-2 text-sm">
                <span className="font-bold text-foreground">{post.id}</span>
                <span className="font-bold text-foreground">
                  {displayName(post, locale)}
                  {post.tripcode && <span className="ml-1 font-normal text-[#117743] dark:text-emerald-300">{post.tripcode}</span>}
                </span>
                <time className="text-xs" dateTime={post.createdAt}>
                  {formatLocalizedCalendarDateTime(new Date(post.createdAt), locale)}
                </time>
                <span className="text-xs">ID:{post.uid}</span>
                <ReplyToPostButton postId={post.id} />
              </div>
              <div className="pl-0 sm:pl-2">
                <PostText content={post.content} allPosts={thread.posts} />
              </div>
            </article>
          ))}
        </div>

        <ReplyForm boardId={thread.boardId} threadId={thread.id} />
      </div>
    </div>
  );
}
