import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import { BoardPage } from '../../../../../features/boards/BoardPage.server';
import { getThreads, getVisibleBoards, isBackendNotFound } from '../../../../../lib/api/server';
import { isBoardVisible } from '../../../../../lib/boards';
import { buildBoardMetadata } from '../../../../../lib/seo/metadata';
import { getServerLocale } from '../../../../../lib/i18n/server';
import { tServer } from '../../../../../lib/i18n/dictionaries';

type PageProps = {
  params: Promise<{ boardId: string; page: string }>;
  searchParams?: Promise<{ q?: string }>;
};

const parsePage = (value: string) => {
  const page = Number.parseInt(value, 10);
  return Number.isFinite(page) && page > 0 ? page : null;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { boardId, page: rawPage } = await params;
  const query = (await searchParams)?.q || '';
  const locale = await getServerLocale();
  const page = parsePage(rawPage);
  if (!page) return {};
  const boards = await getVisibleBoards();
  const board = boards.find((item) => item.id === boardId);
  if (!board) return {};
  const metadata = buildBoardMetadata(board, page, locale);
  if (boardId === 'all' || page > 20 || query.trim()) {
    metadata.robots = { index: false, follow: true };
  }
  return metadata;
}

export default async function BoardPagedRoutePage({ params, searchParams }: PageProps) {
  const { boardId, page: rawPage } = await params;
  const query = (await searchParams)?.q || '';
  const page = parsePage(rawPage);
  if (!page || !isBoardVisible(boardId)) notFound();

  if (page === 1) {
    const trimmedQuery = query.trim();
    permanentRedirect(
      trimmedQuery.length > 0
        ? `/board/${boardId}?q=${encodeURIComponent(trimmedQuery)}`
        : `/board/${boardId}`,
    );
  }

  const locale = await getServerLocale();

  const boards = await getVisibleBoards();
  const board = boards.find((item) => item.id === boardId);
  if (!board) notFound();

  try {
    const threadsPage = await getThreads(boardId, page, query);
    if (page > threadsPage.totalPages && threadsPage.totalPages > 0) notFound();
    return <BoardPage board={board} threadsPage={threadsPage} searchQuery={query} locale={locale} />;
  } catch (error) {
    if (isBackendNotFound(error)) notFound();
    return (
      <div className="themed-page min-h-[calc(100vh-3.5rem)]">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="themed-card themed-card-featured p-8">
            <h1 className="themed-heading mb-3 text-2xl">{tServer('thread.listUnavailableTitle', locale)}</h1>
            <p className="themed-meta">{tServer('thread.unavailableBody', locale)}</p>
          </div>
        </div>
      </div>
    );
  }
}
