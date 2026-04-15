import Link from 'next/link';

import { tServer, type Locale } from '../../lib/i18n/dictionaries';
import { boardUrl } from '../../lib/seo/url';

interface BoardPaginationProps {
  boardId: string;
  currentPage: number;
  totalPages: number;
  locale: Locale;
}

const buildVisiblePages = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
};

export function BoardPagination({ boardId, currentPage, totalPages, locale }: BoardPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildVisiblePages(currentPage, totalPages);

  return (
    <nav className="mt-6 hidden flex-wrap items-center justify-center gap-2 md:flex" aria-label="Pagination">
      {currentPage > 1 && (
        <Link className="themed-secondary-action rounded-md px-4 py-1.5 text-sm" href={boardUrl(boardId, currentPage - 1)}>
          {tServer('pagination.prev', locale)}
        </Link>
      )}
      {pages.map((page, index) => {
        const previous = pages[index - 1];
        const showGap = previous !== undefined && page - previous > 1;
        return (
          <span key={page} className="inline-flex items-center gap-2">
            {showGap && <span className="themed-meta px-1">...</span>}
            <Link
              aria-current={page === currentPage ? 'page' : undefined}
              className={
                page === currentPage
                  ? 'themed-primary-action rounded-md px-3 py-1.5 text-sm font-bold'
                  : 'themed-secondary-action rounded-md px-3 py-1.5 text-sm'
              }
              href={boardUrl(boardId, page)}
            >
              {page}
            </Link>
          </span>
        );
      })}
      {currentPage < totalPages && (
        <Link className="themed-secondary-action rounded-md px-4 py-1.5 text-sm" href={boardUrl(boardId, currentPage + 1)}>
          {tServer('pagination.next', locale)}
        </Link>
      )}
    </nav>
  );
}
