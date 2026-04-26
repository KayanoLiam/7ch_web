import Link from 'next/link';

import type { Board } from '../../types';
import { tServer, type Locale } from '../../lib/i18n/dictionaries';
import { cn } from '../../lib/utils';

interface BoardRailProps {
  boards: Board[];
  currentBoardId?: string;
  locale: Locale;
  className?: string;
}

export function BoardRail({ boards, currentBoardId, locale, className }: BoardRailProps) {
  return (
    <aside className={cn('bbs-desktop-rail hidden lg:block', className)}>
      <div className="bbs-desktop-rail-title">{tServer('nav.boards', locale)}</div>
      <nav className="space-y-2">
        {boards.map((board) => {
          const active = board.id === currentBoardId;

          return (
            <Link
              key={board.id}
              href={`/board/${board.id}`}
              className={cn('bbs-desktop-board-link', active && 'bbs-desktop-board-link-active')}
            >
              <span className="bbs-desktop-board-name">
                /{board.id}/ - {tServer(board.name, locale)}
              </span>
              <span className="bbs-desktop-board-desc">{tServer(board.description, locale)}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
