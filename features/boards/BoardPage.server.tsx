import type { Board, PaginatedThreads } from '../../types';
import { ThreadCard } from './ThreadCard.server';
import { BoardPagination } from './BoardPagination.server';
import { tServer, type Locale } from '../../lib/i18n/dictionaries';
import { CreateThreadForm } from '../forms/CreateThreadForm.client';
import { BoardLoadMore } from './BoardLoadMore.client';
import { BoardRail } from './BoardRail.server';
import { BoardRefreshButton } from './BoardRefreshButton.client';
import { fallbackBoards, mergeBoardsWithStatic } from '../../lib/boards';

interface BoardPageProps {
  board: Board;
  threadsPage: PaginatedThreads;
  searchQuery?: string;
  locale: Locale;
}

export function BoardPage({ board, threadsPage, searchQuery, locale }: BoardPageProps) {
  const boardName = tServer(board.name, locale);
  const trimmedSearchQuery = searchQuery?.trim();
  const railBoards = mergeBoardsWithStatic(fallbackBoards);

  return (
    <div className="themed-page bbs-desktop-page min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto max-w-4xl px-2 py-6 sm:px-4 lg:grid lg:max-w-[1240px] lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-6 lg:px-6 lg:py-7 xl:max-w-[1320px]">
        <BoardRail boards={railBoards} currentBoardId={board.id} locale={locale} />

        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3 lg:mb-5">
            <div>
              <h1 className="themed-heading text-2xl lg:text-[2rem] lg:text-[hsl(var(--brand))]">/{board.id}/ - {boardName}</h1>
              <p className="themed-meta mt-1 text-sm">{tServer(board.description, locale)}</p>
            </div>
            <div className="hidden items-center gap-3 lg:flex">
              {board.id !== 'all' && <CreateThreadForm boardId={board.id} />}
              <button type="button" className="bbs-desktop-select-button" aria-label={tServer('board.sort.newest', locale)}>
                {tServer('board.sort.newest', locale)}
                <span aria-hidden="true">⌄</span>
              </button>
              <BoardRefreshButton label={tServer('realtime.refresh', locale)} />
            </div>
          </div>

          <div className="lg:hidden">
            {board.id !== 'all' && <CreateThreadForm boardId={board.id} />}
          </div>

          {trimmedSearchQuery && (
            <div className="themed-card-muted mb-4 p-3 text-sm">
              {tServer('search.label', locale)}：<span className="font-bold text-foreground">{trimmedSearchQuery}</span>
              <span className="themed-meta ml-2">{tServer('search.backendResults', locale)}</span>
            </div>
          )}

          <div className="space-y-4 lg:overflow-hidden lg:rounded-lg lg:border lg:border-border lg:bg-[hsl(var(--surface)/0.72)] lg:shadow-[var(--card-shadow-subtle)]">
            {threadsPage.threads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} boardName={thread.boardId === board.id ? boardName : `/${thread.boardId}/`} locale={locale} />
            ))}
          </div>

          {threadsPage.threads.length === 0 && (
            <div className="themed-card themed-card-featured p-10 text-center themed-meta">
              {tServer('thread.emptyBoard', locale)}
            </div>
          )}

          {!trimmedSearchQuery && (
            <>
              <BoardPagination boardId={board.id} currentPage={threadsPage.page} totalPages={threadsPage.totalPages} locale={locale} />
              <BoardLoadMore boardId={board.id} initialPage={threadsPage.page} totalPages={threadsPage.totalPages} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
