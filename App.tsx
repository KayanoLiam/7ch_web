import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, Route, Routes, Link } from 'react-router-dom';
import { api } from './services/api';
import { Board, Thread } from './types';
import { PostForm } from './components/PostForm';
import { ThreadView } from './components/ThreadDetail';
import { Button } from './components/ui/button';
import { DonateModal } from './components/DonateModal';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Docs } from './pages/Docs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { Help } from './pages/Help';
import { QA } from './pages/QA';

// --- Board View Component ---
const BoardView: React.FC<{
  boards: Board[];
  search: string;
  onCreateThread: (payload: any) => void;
  onThreadClick: (thread: Thread) => void;
  onToggleHide: (e: React.MouseEvent, id: string) => void;
  onToggleFollow: (e: React.MouseEvent, id: string) => void;
  hiddenThreads: Set<string>;
  followedThreads: Set<string>;
}> = ({ boards, search, onCreateThread, onThreadClick, onToggleHide, onToggleFollow, hiddenThreads, followedThreads }) => {
  const { t, i18n } = useTranslation();
  const { boardId } = useParams();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);

  useEffect(() => {
    if (boardId) {
      api.getThreads(boardId).then(setThreads);
    }
    setShowPostForm(false);
  }, [boardId]);

  const board = boards.find(b => b.id === boardId);
  if (!board) return <div>Board not found</div>;
  const isAll = boardId === 'all';

  const renderThreadCard = (thread: Thread, boardName: string) => {
    if (hiddenThreads.has(thread.id)) {
      return (
        <div key={thread.id} className="bg-gray-50 p-3 rounded-sm border border-gray-200 flex justify-between items-center text-xs text-gray-500 shadow-sm">
          <span className="font-bold">{t('meta.hidden_thread')}: {thread.title.substring(0, 30)}...</span>
          <button onClick={(e) => onToggleHide(e, thread.id)} className="text-[#0056b3] hover:underline">[{t('meta.show')}]</button>
        </div>
      );
    }

    const d = new Date(thread.updatedAt);
    let dateStr;
    const isJa = i18n.language === 'ja-JP';

    if (isJa) {
      const days = ['日', '月', '火', '水', '木', '金', '土'];
      const day = days[d.getDay()];
      let y = d.getFullYear().toString();
      if (d.getFullYear() >= 2019) y = 'R' + (d.getFullYear() - 2018);
      else if (d.getFullYear() >= 1989) y = 'H' + (d.getFullYear() - 1988);
      else if (d.getFullYear() >= 1926) y = 'S' + (d.getFullYear() - 1925);
      dateStr = `${y}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}(${day}) ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.00`;
    } else {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dateStr = `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}(${days[d.getDay()]}) ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.00`;
    }

    const isFollowed = followedThreads.has(thread.id);

    return (
      <div key={thread.id} className="bg-white p-5 rounded-sm shadow-sm border border-gray-200 relative group">
        <div className="absolute top-4 right-4 text-xs text-gray-400">
          {dateStr} <span className="ml-2">ID:{thread.opPost.uid}</span>
          <button onClick={(e) => onToggleHide(e, thread.id)} className="ml-2 text-[#0056b3] hover:underline">[{t('meta.hide')}]</button>
        </div>
        <div className="mt-1">
          <div className="mb-2 pr-40">
            <span
              className="text-lg font-bold text-[#333] cursor-pointer hover:underline hover:text-[#0056b3]"
              onClick={() => onThreadClick(thread)}
            >
              {thread.title}
            </span>
          </div>
          <div
            className="text-sm text-[#333] leading-relaxed mb-3 cursor-pointer"
            onClick={() => onThreadClick(thread)}
          >
            {thread.opPost.content.length > 200 ? thread.opPost.content.substring(0, 200) + '...' : thread.opPost.content}
          </div>
          <div className="mb-3">
            <a className="text-[#0056b3] text-sm break-all hover:underline" href={`/board/${thread.boardId}/thread/${thread.id}`}>
              https://7ch-web.vercel.app/board/{thread.boardId}/thread/{thread.id}/
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
            <div className="flex items-center gap-1 text-[#0056b3]">
              <span>💬</span>
              <span>{thread.postCount}</span>
            </div>
            <div className="text-[#0056b3]">{boardName}</div>
            <div className="flex items-center gap-1">
              <span>⚡</span>
              <span>{thread.viewCount}</span>
            </div>
            <button
              onClick={(e) => onToggleFollow(e, thread.id)}
              className={`px-3 py-1 rounded text-xs transition-colors ml-auto border ${isFollowed ? 'bg-white text-[#2da0b3] border-[#2da0b3]' : 'bg-[#2da0b3] text-white border-[#2da0b3] hover:bg-[#238a9b]'}`}
            >
              {isFollowed ? t('meta.following') : t('meta.follow')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f0f0f0] min-h-[calc(100vh-3.5rem)]">
      <div className="max-w-4xl mx-auto py-6 px-2 sm:px-4">
        {!isAll && (
          <div className="mb-6 flex justify-center">
            {!showPostForm ? (
              <button
                onClick={() => setShowPostForm(true)}
                className="bg-white px-6 py-3 rounded shadow-sm border border-gray-300 text-[#333] font-bold hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <span className="text-xl text-[#2da0b3]">✏️</span>
                {t('thread.new')}
              </button>
            ) : (
              <PostForm
                boardId={boardId!}
                onSubmit={async (payload: any) => {
                  const newId = await api.createThread(payload);
                  const updatedThreads = await api.getThreads(boardId!);
                  setThreads(updatedThreads);
                  onThreadClick({ ...updatedThreads.find(t => t.id === newId)!, boardId: boardId! });
                }}
                onCancel={() => setShowPostForm(false)}
              />
            )}
          </div>
        )}
        <div className="space-y-4">
          {(search.trim() ? threads.filter((thread) => {
            const s = search.trim().toLowerCase();
            const text = `${thread.title} ${thread.opPost.content}`.toLowerCase();
            return text.includes(s);
          }) : threads).map((thread) => {
            const bObj = boards.find(b => b.id === thread.boardId);
            const displayBoardName = isAll ? (bObj ? t(bObj.name) : thread.boardId) : t(board.name);
            return renderThreadCard(thread, displayBoardName);
          })}
        </div>
      </div>
    </div>
  );
};

// --- Favorites View Component ---
const FavoritesView: React.FC<{
  followedThreads: Set<string>;
  boards: Board[];
  onThreadClick: (thread: Thread) => void;
  onToggleHide: (e: React.MouseEvent, id: string) => void;
  onToggleFollow: (e: React.MouseEvent, id: string) => void;
  hiddenThreads: Set<string>;
}> = ({ followedThreads, boards, onThreadClick, onToggleHide, onToggleFollow, hiddenThreads }) => {
  const { t, i18n } = useTranslation();
  const [favThreads, setFavThreads] = useState<Thread[]>([]);
  const [loadingFavs, setLoadingFavs] = useState(false);

  useEffect(() => {
    const loadFavoriteThreads = async () => {
      setLoadingFavs(true);
      try {
        const ids = Array.from(followedThreads);
        const results = await Promise.all(
          ids.map(id => api.getThreadContent(id).catch(() => null))
        );
        const validThreads = results.filter((t): t is Thread => t !== null);
        validThreads.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        setFavThreads(validThreads);
      } finally {
        setLoadingFavs(false);
      }
    };
    loadFavoriteThreads();
  }, [followedThreads.size]);

  const renderThreadCard = (thread: Thread, boardName: string) => {
    if (hiddenThreads.has(thread.id)) {
      return (
        <div key={thread.id} className="bg-gray-50 p-3 rounded-sm border border-gray-200 flex justify-between items-center text-xs text-gray-500 shadow-sm">
          <span className="font-bold">{t('meta.hidden_thread')}: {thread.title.substring(0, 30)}...</span>
          <button onClick={(e) => onToggleHide(e, thread.id)} className="text-[#0056b3] hover:underline">[{t('meta.show')}]</button>
        </div>
      );
    }

    const d = new Date(thread.updatedAt);
    let dateStr;
    const isJa = i18n.language === 'ja-JP';

    if (isJa) {
      const days = ['日', '月', '火', '水', '木', '金', '土'];
      const day = days[d.getDay()];
      let y = d.getFullYear().toString();
      if (d.getFullYear() >= 2019) y = 'R' + (d.getFullYear() - 2018);
      else if (d.getFullYear() >= 1989) y = 'H' + (d.getFullYear() - 1988);
      else if (d.getFullYear() >= 1926) y = 'S' + (d.getFullYear() - 1925);
      dateStr = `${y}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}(${day}) ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.00`;
    } else {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dateStr = `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}(${days[d.getDay()]}) ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.00`;
    }

    const isFollowed = followedThreads.has(thread.id);

    return (
      <div key={thread.id} className="bg-white p-5 rounded-sm shadow-sm border border-gray-200 relative group">
        <div className="absolute top-4 right-4 text-xs text-gray-400">
          {dateStr} <span className="ml-2">ID:{thread.opPost.uid}</span>
          <button onClick={(e) => onToggleHide(e, thread.id)} className="ml-2 text-[#0056b3] hover:underline">[{t('meta.hide')}]</button>
        </div>
        <div className="mt-1">
          <div className="mb-2 pr-40">
            <span
              className="text-lg font-bold text-[#333] cursor-pointer hover:underline hover:text-[#0056b3]"
              onClick={() => onThreadClick(thread)}
            >
              {thread.title}
            </span>
          </div>
          <div
            className="text-sm text-[#333] leading-relaxed mb-3 cursor-pointer"
            onClick={() => onThreadClick(thread)}
          >
            {thread.opPost.content.length > 200 ? thread.opPost.content.substring(0, 200) + '...' : thread.opPost.content}
          </div>
          <div className="mb-3">
            <a className="text-[#0056b3] text-sm break-all hover:underline" href={`/board/${thread.boardId}/thread/${thread.id}`}>
              https://7ch-web.vercel.app/board/{thread.boardId}/thread/{thread.id}/
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
            <div className="flex items-center gap-1 text-[#0056b3]">
              <span>💬</span>
              <span>{thread.postCount}</span>
            </div>
            <div className="text-[#0056b3]">{boardName}</div>
            <div className="flex items-center gap-1">
              <span>⚡</span>
              <span>{thread.viewCount}</span>
            </div>
            <button
              onClick={(e) => onToggleFollow(e, thread.id)}
              className={`px-3 py-1 rounded text-xs transition-colors ml-auto border ${isFollowed ? 'bg-white text-[#2da0b3] border-[#2da0b3]' : 'bg-[#2da0b3] text-white border-[#2da0b3] hover:bg-[#238a9b]'}`}
            >
              {isFollowed ? t('meta.following') : t('meta.follow')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f0f0f0] min-h-[calc(100vh-3.5rem)]">
      <div className="max-w-4xl mx-auto py-6 px-2 sm:px-4">
        <div className="mb-4 text-xl font-bold text-gray-700 flex items-center gap-2">
          <span>★</span> {t('nav.favorites')}
        </div>
        {loadingFavs ? (
          <div className="text-center text-gray-500 py-10">{t('meta.loading')}</div>
        ) : favThreads.length === 0 ? (
          <div className="bg-white p-10 text-center text-gray-500 rounded border border-gray-200">
            {t('meta.no_favorites')}
          </div>
        ) : (
          <div className="space-y-4">
            {favThreads.map(thread => {
              if (!followedThreads.has(thread.id)) return null;
              const boardObj = boards.find(b => b.id === thread.boardId);
              const boardName = boardObj ? t(boardObj.name) : thread.boardId;
              return renderThreadCard(thread, boardName);
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Thread View Wrapper Component ---
const ThreadViewWrapper: React.FC<{
  followedThreads: Set<string>;
  onToggleFollow: (e: any, id: string) => void;
}> = ({ followedThreads, onToggleFollow }) => {
  const { boardId, threadId } = useParams();
  const navigate = useNavigate();

  if (!boardId || !threadId) return <div>Invalid thread</div>;

  return (
    <div className="bg-[#f0f0f0] min-h-[calc(100vh-3.5rem)] pt-4">
      <ThreadView
        threadId={threadId}
        onBack={() => navigate(`/board/${boardId}`)}
        isFollowed={followedThreads.has(threadId)}
        onToggleFollow={(e) => onToggleFollow(e, threadId)}
      />
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const [boardsError, setBoardsError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  // Hidden Threads State (Persisted)
  const [hiddenThreads, setHiddenThreads] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('7ch_hidden_threads');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Followed Threads State (Persisted)
  const [followedThreads, setFollowedThreads] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('7ch_followed_threads');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Donate Modal State
  const [showDonateModal, setShowDonateModal] = useState(false);
  // Mobile Menu State
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // Mobile Login Dialog State
  const [showMobileLoginDialog, setShowMobileLoginDialog] = useState(false);

  useEffect(() => {
    api.getBoards()
      .then(setBoards)
      .catch((e: any) => {
        setBoardsError(String(e?.message ?? e) || '加载失败');
        setBoards([
          { id: 'all', name: 'board.all.name', description: 'board.all.desc' },
          { id: 'news', name: 'board.news.name', description: 'board.news.desc' },
          { id: 'g', name: 'board.g.name', description: 'board.g.desc' },
          { id: 'acg', name: 'board.acg.name', description: 'board.acg.desc' },
          { id: 'vip', name: 'board.vip.name', description: 'board.vip.desc' },
        ]);
      });
  }, []);

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('7ch_lang', lng);
  };

  const toggleHide = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setHiddenThreads(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('7ch_hidden_threads', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const toggleFollow = (e: React.MouseEvent | null, id: string) => {
    if (e) e.stopPropagation();
    setFollowedThreads(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('7ch_followed_threads', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const handleThreadClick = (thread: Thread) => {
    navigate(`/board/${thread.boardId}/thread/${thread.id}`);
  };

  // --- Render Functions ---

  const renderHeader = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-xl sm:text-2xl font-bold text-gray-600 font-serif tracking-tight">7ちゃんねる</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder={t('board.catalog')}
              className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm w-48 focus:outline-none focus:border-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute right-2 text-gray-400">🔍</span>
          </div>
          {/* Desktop navigation - hidden on mobile */}
          <div className="hidden md:flex items-center gap-3 text-sm text-[#0056b3] font-medium">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">{t('dialog.login.button')}</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('dialog.login.title')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('dialog.login.description')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('dialog.login.close')}</AlertDialogCancel>
                  <Link to="/docs">
                    <AlertDialogAction>{t('dialog.login.link_text')}</AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <button className="hover:underline" onClick={() => navigate('/')}>{t('nav.boards')}</button>
            <button
              className="hover:underline"
              onClick={() => navigate('/favorites')}
            >
              {t('nav.favorites')}
            </button>
            <div className="border-l border-gray-300 pl-3 flex gap-2">
              {['zh-CN', 'ja-JP'].map(l => (
                <button
                  key={l}
                  onClick={() => changeLang(l)}
                  className={`text-xs ${i18n.language === l ? 'font-bold text-black' : 'text-gray-400'}`}
                >
                  {l === 'zh-CN' ? '中文' : '日'}
                </button>
              ))}
            </div>
          </div>
          {/* Mobile dropdown menu */}
          <div className="md:hidden relative">
            <button 
              className="text-[#0056b3] text-sm font-medium p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              ☰
            </button>
            {showMobileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                <div className="py-1">
                  <button 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => setShowMobileLoginDialog(true)}
                  >
                    {t('dialog.login.button')}
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm border-t border-gray-200"
                    onClick={() => {
                      navigate('/');
                      setShowMobileMenu(false);
                    }}
                  >
                    {t('nav.boards')}
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => {
                      navigate('/favorites');
                      setShowMobileMenu(false);
                    }}
                  >
                    {t('nav.favorites')}
                  </button>
                  <div className="border-t border-gray-200 pt-1">
                    {['zh-CN', 'ja-JP'].map(l => (
                      <button
                        key={l}
                        onClick={() => {
                          changeLang(l);
                          setShowMobileMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === l ? 'font-bold text-black' : 'text-gray-400'}`}
                      >
                        {l === 'zh-CN' ? '中文' : '日'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  const renderFooter = () => (
    <footer className="mt-auto py-8 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
      <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mb-4">
        <Link to="/privacy"><button className="text-gray-500 hover:underline hover:text-[#0056b3]">{t('footer.privacy')}</button></Link>
        <Link to="/docs"><button className="text-gray-500 hover:underline hover:text-[#0056b3]">{t('footer.tech')}</button></Link>
        <Link to="/terms"><button className="text-gray-500 hover:underline hover:text-[#0056b3]">{t('footer.terms')}</button></Link>
        <Link to="/help"><button className="text-gray-500 hover:underline hover:text-[#0056b3]">{t('footer.help')}</button></Link>
        <Link to="/QA"><button className="text-gray-500 hover:underline hover:text-[#0056b3]">{t('footer.QA')}</button></Link>
        <button className="text-gray-500 hover:underline hover:text-[#0056b3]" onClick={() => setShowDonateModal(true)}>{t('footer.donate')}</button>
      </div>
      <div>&copy; 2024 7ch Project. All rights reserved.</div>
    </footer>
  );

  return (
    <div className="min-h-screen font-sans bg-[#ffffff] text-[#333] flex flex-col">
      {renderHeader()}
      {/* Mobile Login Dialog - rendered outside main content to ensure proper layering */}
      {showMobileLoginDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 md:hidden">
          <div className="bg-white rounded p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <h3 className="font-bold text-lg mb-2">{t('dialog.login.title')}</h3>
            <p className="text-sm mb-4">{t('dialog.login.description')}</p>
            <div className="flex justify-end gap-2">
              <button 
                className="px-4 py-2 border border-gray-300 rounded text-sm"
                onClick={() => setShowMobileLoginDialog(false)}
              >
                {t('dialog.login.close')}
              </button>
              <Link to="/docs" onClick={() => setShowMobileLoginDialog(false)}>
                <button className="px-4 py-2 bg-[#0056b3] text-white rounded text-sm">
                  {t('dialog.login.link_text')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <main className="flex-1">
        <Routes>
          {/* 首页 - 看板列表 */}
          <Route path="/" element={
            <div className="p-4 max-w-4xl mx-auto mt-4">
              <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">{t('nav.boards')}</h2>
                {boardsError && (
                  <div className="mb-4 p-3 rounded border border-red-200 bg-red-100 text-red-700">
                    {t('meta.loading')}: {boardsError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(search.trim() ? boards.filter(b => {
                    const s = search.trim().toLowerCase();
                    const name = `${b.id} ${t(b.name)} ${t(b.description)}`.toLowerCase();
                    return name.includes(s);
                  }) : boards).map(b => (
                    <div
                      key={b.id}
                      onClick={() => navigate(`/board/${b.id}`)}
                      className="p-4 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="font-bold text-[#0056b3] text-lg mb-1">/{b.id}/ - {t(b.name)}</div>
                      <div className="text-sm text-gray-500">{t(b.description)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          } />

          {/* 看板详情页 */}
          <Route path="/board/:boardId" element={
            <BoardView
              boards={boards}
              search={search}
              onCreateThread={async (payload: any) => {
                // Handled inside BoardView component
              }}
              onThreadClick={handleThreadClick}
              onToggleHide={toggleHide}
              onToggleFollow={toggleFollow}
              hiddenThreads={hiddenThreads}
              followedThreads={followedThreads}
            />
          } />

          {/* 帖子详情页 */}
          <Route path="/board/:boardId/thread/:threadId" element={
            <ThreadViewWrapper
              followedThreads={followedThreads}
              onToggleFollow={toggleFollow}
            />
          } />

          {/* 收藏夹 */}
          <Route path="/favorites" element={
            <FavoritesView
              followedThreads={followedThreads}
              boards={boards}
              onThreadClick={handleThreadClick}
              onToggleHide={toggleHide}
              onToggleFollow={toggleFollow}
              hiddenThreads={hiddenThreads}
            />
          } />

          {/* 文档页面 */}
          <Route path="/docs" element={<Docs onBack={() => navigate('/')} />} />
          <Route path="/privacy" element={<PrivacyPolicy onBack={() => navigate('/')} />} />
          <Route path="/terms" element={<Terms onBack={() => navigate('/')} />} />
          <Route path="/help" element={<Help onBack={() => navigate('/')} />} />
          <Route path="/QA" element={<QA onBack={() => navigate('/')} />} />
        </Routes>
      </main>
      {renderFooter()}
      <DonateModal open={showDonateModal} onClose={() => setShowDonateModal(false)} />
    </div>
  );
};

export default App;