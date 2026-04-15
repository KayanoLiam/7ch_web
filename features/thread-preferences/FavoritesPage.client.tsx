'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ThreadDetail } from '../../types';
import {
  readFollowedThreadIds,
  removeFollowedThread,
  subscribeThreadPreferences,
} from '../../lib/client/threadPreferences';
import { formatLocalizedCalendarDateTime } from '../../lib/date';
import { buildDescription } from '../../lib/seo/sanitize';
import { threadUrl } from '../../lib/seo/url';

type FavoriteItem =
  | { status: 'fulfilled'; id: string; thread: ThreadDetail }
  | { status: 'rejected'; id: string; message: string };

const loadThread = async (id: string, readFailedLabel: string): Promise<FavoriteItem> => {
  try {
    const response = await fetch(`/api/threads/${encodeURIComponent(id)}`, {
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return { status: 'rejected', id, message: `${readFailedLabel}：${response.status}` };
    }

    return { status: 'fulfilled', id, thread: await response.json() as ThreadDetail };
  } catch (cause) {
    return {
      status: 'rejected',
      id,
      message: cause instanceof Error ? cause.message : readFailedLabel,
    };
  }
};

export function FavoritesPageClient() {
  const { i18n, t } = useTranslation();
  const [ids, setIds] = useState<string[]>([]);
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sync = () => setIds(readFollowedThreadIds());
    sync();
    return subscribeThreadPreferences(sync);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (ids.length === 0) {
        setItems([]);
        return;
      }

      setIsLoading(true);
      const results = await Promise.all(ids.map((id) => loadThread(id, t('favorites.readFailed'))));
      if (!cancelled) {
        const sorted = results.sort((a, b) => {
          if (a.status !== 'fulfilled' || b.status !== 'fulfilled') return 0;
          return new Date(b.thread.updatedAt).getTime() - new Date(a.thread.updatedAt).getTime();
        });
        setItems(sorted);
        setIsLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [ids, t]);

  const fulfilledCount = useMemo(
    () => items.filter((item) => item.status === 'fulfilled').length,
    [items],
  );

  return (
    <div className="themed-page min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <section className="themed-card themed-card-featured p-5 sm:p-6">
          <div className="mb-5 border-b border-border pb-4">
            <h1 className="themed-heading text-2xl">{t('nav.favorites')}</h1>
            <p className="themed-meta mt-2 text-sm">
              {t('favorites.localOnly')}
            </p>
          </div>

          {isLoading && <div className="themed-meta py-6 text-center">{t('favorites.loading')}</div>}

          {!isLoading && ids.length === 0 && (
            <div className="themed-card-muted p-8 text-center themed-meta">
              {t('favorites.empty')}
            </div>
          )}

          {!isLoading && ids.length > 0 && fulfilledCount === 0 && (
            <div className="themed-card-muted p-8 text-center themed-meta">
              {t('favorites.unavailable')}
            </div>
          )}

          <div className="space-y-4">
            {items.map((item) => {
              if (item.status === 'rejected') {
                return (
                  <div key={item.id} className="themed-card-muted flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
                    <span className="themed-meta break-all">{item.id}：{item.message}</span>
                    <button
                      type="button"
                      className="themed-inline-action"
                      onClick={() => removeFollowedThread(item.id)}
                    >
                      {t('favorites.remove')}
                    </button>
                  </div>
                );
              }

              const href = threadUrl(item.thread.boardId, item.thread.id);
              return (
                <article key={item.thread.id} className="themed-card-muted p-4">
                  <div className="themed-meta mb-2 text-xs">
                    /{item.thread.boardId}/ · {formatLocalizedCalendarDateTime(new Date(item.thread.updatedAt), i18n.language)}
                  </div>
                  <h2 className="themed-heading-sm text-lg hover:underline">
                    <Link href={href}>{item.thread.title}</Link>
                  </h2>
                  <p className="themed-meta mt-2 text-sm">
                    {buildDescription(item.thread.opPost.content, t('meta.emptyContent'), 180)}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-bold themed-meta">
                    <span>{t('meta.replies')}：{item.thread.postCount}</span>
                    <span>{t('meta.views')}：{item.thread.viewCount}</span>
                    <button
                      type="button"
                      className="themed-inline-action ml-auto"
                      onClick={() => removeFollowedThread(item.thread.id)}
                    >
                      {t('favorites.unfollow')}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
