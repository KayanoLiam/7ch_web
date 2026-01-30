import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from './services/api';
import { Board, Thread } from './types';
import { PostForm } from './components/PostForm';
import { ThreadView } from './components/ThreadDetail';
import { Button } from './components/ui/button';
import { Link, Route, Routes, useNavigate } from "react-router-dom";

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

// View State Definition
type ViewState =
  | { type: 'home' }
  | { type: 'favorites' }
  | { type: 'board', boardId: string }
  | { type: 'thread', threadId: string, boardId: string }
  | { type: 'static', pageId: 'privacy' | 'tech' | 'terms' | 'help' };



const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [boards, setBoards] = useState<Board[]>([]);

  // Board View State
  const [threads, setThreads] = useState<Thread[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);

  // Favorites View State
  const [favThreads, setFavThreads] = useState<Thread[]>([]);
  const [loadingFavs, setLoadingFavs] = useState(false);

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

  useEffect(() => {
    api.getBoards().then(setBoards);
  }, []);

  useEffect(() => {
    setShowPostForm(false);
    if (view.type === 'board') {
      loadThreads(view.boardId);
    } else if (view.type === 'favorites') {
      loadFavoriteThreads();
    }
  }, [view]);

  // Reload favorites if the set changes while on the page (though toggle handles filtering usually)
  useEffect(() => {
    if (view.type === 'favorites') {
      loadFavoriteThreads();
    }
  }, [followedThreads.size]);

  const loadThreads = async (boardId: string) => {
    const data = await api.getThreads(boardId);
    setThreads(data);
  };

  const loadFavoriteThreads = async () => {
    setLoadingFavs(true);
    try {
      const ids = Array.from(followedThreads);
      // Fetch details for all followed IDs
      const results = await Promise.all(
        ids.map(id => api.getThreadContent(id).catch(() => null))
      );
      // Filter out deleted/null threads
      const validThreads = results.filter((t): t is Thread => t !== null);
      // Sort by updated time desc
      validThreads.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setFavThreads(validThreads);
    } finally {
      setLoadingFavs(false);
    }
  };

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

  const handleCreateThread = async (payload: any) => {
    if (view.type !== 'board') return;
    const newId = await api.createThread(payload);
    await loadThreads(view.boardId);
    // Automatically go to the new thread
    setView({ type: 'thread', threadId: newId, boardId: view.boardId });
  };

  // --- Render Functions ---

  const renderHeader = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => setView({ type: 'home' })}>
          <span className="text-xl sm:text-2xl font-bold text-gray-600 font-serif tracking-tight">7ちゃんねる</span>
        </div>

        {/* Right: Search & Tools */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder={t('board.catalog')}
              className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm w-48 focus:outline-none focus:border-gray-400"
            />
            <span className="absolute right-2 text-gray-400">🔍</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-[#0056b3] font-medium">
            {/* <Button size="sm" className="bg-[#2da0b3] text-white hover:opacity-90">UI</Button> */}
            {/* <button className="hover:underline hidden sm:block">Login</button> */}
            {/* <button className="hover:underline hidden sm:block">Login</button> */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {/* <Button variant="outline">Login</Button> */}
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
            <button className="hover:underline" onClick={() => setView({ type: 'home' })}>{t('nav.boards')}</button>
            <button
              className={`hover:underline ${view.type === 'favorites' ? 'font-bold text-black' : ''}`}
              onClick={() => setView({ type: 'favorites' })}
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
        </div>
      </div>
    </header>
  );

  const renderFooter = () => (
    <footer className="mt-auto py-8 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
      <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mb-4">
        <Link to="/privacy"><button className="text-gray-500 hover:underline hover:text-[#0056b3]">{t('footer.privacy')}</button></Link>
        {/* <button onClick={() => setView({ type: 'static', pageId: 'privacy' })} className="hover:underline hover:text-[#0056b3]">{t('footer.privacy')}</button> */}
        {/* <button onClick={() => setView({ type: 'static', pageId: 'tech' })} className="hover:underline hover:text-[#0056b3]">{t('footer.tech')}</button> */}
        <Link to="/docs"><button className="text-gray-500 hover:underline hover:text-[#0056b3]">{t('footer.tech')}</button></Link>
        <Link to="/terms"><button className="text-gray-500 hover:underline hover:text-[#0056b3]">{t('footer.terms')}</button></Link>
        {/* <button onClick={() => setView({ type: 'static', pageId: 'terms' })} className="hover:underline hover:text-[#0056b3]">{t('footer.terms')}</button> */}
        {/* <button onClick={() => setView({ type: 'static', pageId: 'help' })} className="hover:underline hover:text-[#0056b3]">{t('footer.help')}</button> */}
        <Link to="/help"><button className="text-gray-500 hover:underline hover:text-[#0056b3]">{t('footer.help')}</button></Link>
        <Link to="/QA"><button className="text-gray-500 hover:underline hover:text-[#0056b3]">{t('footer.QA')}</button></Link>
        {/* <button onClick={() => setView({ type: 'static', pageId: 'QA' })} className="hover:underline hover:text-[#0056b3]">{t('footer.QA')}</button> */}
      </div>
      <div>&copy; 2024 7ch Project. All rights reserved.</div>
    </footer>
  );

  const renderStaticPage = (pageId: string) => {
    return (
      <div className="p-4 max-w-4xl mx-auto mt-4">
        <div className="bg-white p-6 sm:p-10 border border-gray-200 rounded-sm shadow-sm min-h-[50vh]">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b text-gray-800">{t(`page.${pageId}.title`)}</h2>
          <div className="whitespace-pre-wrap leading-loose text-gray-700 font-medium">
            {t(`page.${pageId}.content`)}
          </div>

          <div className="mt-10 pt-4 border-t border-gray-100">
            <button
              onClick={() => setView({ type: 'home' })}
              className="text-[#0056b3] hover:underline flex items-center gap-1"
            >
              <span>&lt;</span> {t('nav.home')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="p-4 max-w-4xl mx-auto mt-4">
      <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">{t('nav.boards')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {boards.map(b => (
            <div
              key={b.id}
              onClick={() => setView({ type: 'board', boardId: b.id })}
              className="p-4 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="font-bold text-[#0056b3] text-lg mb-1">/{b.id}/ - {t(b.name)}</div>
              <div className="text-sm text-gray-500">{t(b.description)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderThreadCard = (thread: Thread, boardName: string) => {
    if (hiddenThreads.has(thread.id)) {
      return (
        <div key={thread.id} className="bg-gray-50 p-3 rounded-sm border border-gray-200 flex justify-between items-center text-xs text-gray-500 shadow-sm">
          <span className="font-bold">{t('meta.hidden_thread')}: {thread.title.substring(0, 30)}...</span>
          <button onClick={(e) => toggleHide(e, thread.id)} className="text-[#0056b3] hover:underline">[{t('meta.show')}]</button>
        </div>
      );
    }

    // Date formatting with i18n support
    const d = new Date(thread.updatedAt);
    let dateStr;
    const isJa = i18n.language === 'ja-JP';

    if (isJa) {
      const days = ['日', '月', '火', '水', '木', '金', '土'];
      const day = days[d.getDay()];

      let y = d.getFullYear().toString();
      // Simple Era logic
      if (d.getFullYear() >= 2019) y = 'R' + (d.getFullYear() - 2018); // Reiwa
      else if (d.getFullYear() >= 1989) y = 'H' + (d.getFullYear() - 1988); // Heisei
      else if (d.getFullYear() >= 1926) y = 'S' + (d.getFullYear() - 1925); // Showa

      dateStr = `${y}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}(${day}) ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.00`;
    } else {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dateStr = `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}(${days[d.getDay()]}) ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.00`;
    }

    const isFollowed = followedThreads.has(thread.id);

    return (
      <div key={thread.id} className="bg-white p-5 rounded-sm shadow-sm border border-gray-200 relative group">
        {/* Top Right Meta */}
        <div className="absolute top-4 right-4 text-xs text-gray-400">
          {dateStr} <span className="ml-2">ID:{thread.opPost.uid}</span>
          <button onClick={(e) => toggleHide(e, thread.id)} className="ml-2 text-[#0056b3] hover:underline">[{t('meta.hide')}]</button>
        </div>

        {/* Thread Content Block */}
        <div className="mt-1">
          {/* Title */}
          <div className="mb-2 pr-40">
            <span
              className="text-lg font-bold text-[#333] cursor-pointer hover:underline hover:text-[#0056b3]"
              onClick={() => setView({ type: 'thread', threadId: thread.id, boardId: thread.boardId })}
            >
              {thread.title}
            </span>
          </div>

          {/* Content Preview */}
          <div
            className="text-sm text-[#333] leading-relaxed mb-3 cursor-pointer"
            onClick={() => setView({ type: 'thread', threadId: thread.id, boardId: thread.boardId })}
          >
            {thread.opPost.content.length > 200 ? thread.opPost.content.substring(0, 200) + '...' : thread.opPost.content}
          </div>

          {/* Link */}
          <div className="mb-3">
            <a className="text-[#0056b3] text-sm break-all hover:underline" href="#" onClick={(e) => { e.preventDefault(); setView({ type: 'thread', threadId: thread.id, boardId: thread.boardId }); }}>
              https://7ch.net/test/read.cgi/{thread.boardId}/{thread.id}/
            </a>
          </div>

          {/* Footer Actions */}
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
              onClick={(e) => toggleFollow(e, thread.id)}
              className={`px-3 py-1 rounded text-xs transition-colors ml-auto border ${isFollowed ? 'bg-white text-[#2da0b3] border-[#2da0b3]' : 'bg-[#2da0b3] text-white border-[#2da0b3] hover:bg-[#238a9b]'}`}
            >
              {isFollowed ? t('meta.following') : t('meta.follow')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderFavorites = () => {
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
                // Only render if still followed (for immediate feedback on removal)
                if (!followedThreads.has(thread.id)) return null;
                const boardObj = boards.find(b => b.id === thread.boardId);
                // Ensure we translate the board name
                const boardName = boardObj ? t(boardObj.name) : thread.boardId;
                return renderThreadCard(thread, boardName);
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBoard = (boardId: string) => {
    const board = boards.find(b => b.id === boardId);
    if (!board) return <div>Board not found</div>;

    const isAll = boardId === 'all';

    return (
      <div className="bg-[#f0f0f0] min-h-[calc(100vh-3.5rem)]">
        <div className="max-w-4xl mx-auto py-6 px-2 sm:px-4">

          {/* Create Thread Area - Hide if in 'all' view */}
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
                  boardId={boardId}
                  onSubmit={handleCreateThread}
                  onCancel={() => setShowPostForm(false)}
                />
              )}
            </div>
          )}

          {/* Feed List */}
          <div className="space-y-4">
            {threads.map((thread) => {
              // If we are in 'all' view, we want to see the specific board name for each thread
              const bObj = boards.find(b => b.id === thread.boardId);
              const displayBoardName = isAll ? (bObj ? t(bObj.name) : thread.boardId) : t(board.name);
              return renderThreadCard(thread, displayBoardName);
            })}
          </div>
        </div>
      </div>
    );
  };
const navigate = useNavigate();
  return (
    
    <Routes>
      {/* 1. 独立的文档页面路由 */}
      <Route
        path="/docs"
        element={
          <Docs onBack={() => {
            setView({ type: 'home' });
            navigate('/'); // 关键：点击返回时，路由也要切回首页
          }} />
        }
      />
      <Route path="/privacy" element={<PrivacyPolicy onBack={() => navigate('/')} />} />
      <Route path="/terms" element={<Terms onBack={() => navigate('/')} />} />
      <Route path="/help" element={<Help onBack={() => navigate('/')} />} />
      <Route path="/QA" element={<QA onBack={() => navigate('/')} />} />
      
      {/* 2. 所有其他路径，都渲染你的主应用逻辑 */}
      <Route path="*" element={
        <div className="min-h-screen font-sans bg-[#ffffff] text-[#333] flex flex-col">
          {renderHeader()}
          <main className="flex-1">
            {view.type === 'home' && renderHome()}
            {view.type === 'favorites' && renderFavorites()}
            {view.type === 'board' && renderBoard(view.boardId)}
            {view.type === 'thread' && (
              <div className="bg-[#f0f0f0] min-h-[calc(100vh-3.5rem)] pt-4">
                <ThreadView
                  threadId={view.threadId}
                  onBack={() => setView({ type: 'board', boardId: view.boardId })}
                  isFollowed={followedThreads.has(view.threadId)}
                  onToggleFollow={(e) => toggleFollow(e, view.threadId)}
                />
              </div>
            )}
            {/* 注意：这里的 static view 可能会和路由冲突，建议也把 static pages 改成真正的路由，或者保持现状 */}
            {view.type === 'static' && renderStaticPage(view.pageId)}
          </main>
          {renderFooter()}
        </div>
      } />
    </Routes>
  );
};

export default App;
