import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ThreadPage } from '../../../../../features/threads/ThreadPage.server';
import { getThreadDetail, isBackendNotFound } from '../../../../../lib/api/server';
import { isBoardVisible } from '../../../../../lib/boards';
import { buildThreadMetadata } from '../../../../../lib/seo/metadata';
import { getServerLocale } from '../../../../../lib/i18n/server';
import { tServer } from '../../../../../lib/i18n/dictionaries';

type PageProps = {
  params: Promise<{ boardId: string; threadId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { boardId, threadId } = await params;
  const locale = await getServerLocale();
  if (!isBoardVisible(boardId)) return { robots: { index: false, follow: false } };
  try {
    const thread = await getThreadDetail(threadId, { trackView: false });
    if (thread.boardId !== boardId) return { robots: { index: false, follow: false } };
    return buildThreadMetadata(thread, locale);
  } catch {
    return {
      title: 'Thread not found',
      robots: { index: false, follow: false },
    };
  }
}

export default async function ThreadRoutePage({ params }: PageProps) {
  const { boardId, threadId } = await params;
  const locale = await getServerLocale();
  if (!isBoardVisible(boardId)) notFound();

  try {
    const thread = await getThreadDetail(threadId, { trackView: false });
    if (thread.boardId !== boardId) notFound();
    return <ThreadPage thread={thread} locale={locale} />;
  } catch (error) {
    if (isBackendNotFound(error)) notFound();
    return (
      <div className="themed-page min-h-[calc(100vh-3.5rem)]">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="themed-card themed-card-featured p-8">
            <h1 className="themed-heading mb-3 text-2xl">{tServer('thread.detailUnavailableTitle', locale)}</h1>
            <p className="themed-meta">{tServer('thread.unavailableBody', locale)}</p>
          </div>
        </div>
      </div>
    );
  }
}
