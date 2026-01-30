import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import { ThreadDetail, Post } from '../types';
import { PostForm } from './PostForm';

// --- Rich Text Component (Anchor Logic) ---
interface RichTextProps {
  content: string;
  allPosts: Post[];
  onQuoteClick: (id: number) => void;
}

const RichText: React.FC<RichTextProps> = ({ content, allPosts, onQuoteClick }) => {
  // Regex to find >>Number
  const parts = content.split(/(>>\d+)/g);
  const [hoveredPost, setHoveredPost] = useState<Post | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent, targetId: number) => {
    const post = allPosts.find(p => p.id === targetId);
    if (post) {
      setHoveredPost(post);
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setTooltipPos({ x: rect.left, y: rect.bottom + 5 });
    }
  };

  return (
    <div className="whitespace-pre-wrap break-words leading-relaxed text-[#333] text-[15px]">
      {parts.map((part, index) => {
        if (part.match(/^>>\d+$/)) {
          const targetId = parseInt(part.substring(2));
          return (
            <span key={index} className="relative inline-block">
              <button
                className="text-[#0056b3] hover:underline cursor-pointer bg-transparent border-none p-0"
                onClick={() => onQuoteClick(targetId)}
                onMouseEnter={(e) => handleMouseEnter(e, targetId)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                {part}
              </button>
              {/* Tooltip */}
              {hoveredPost && hoveredPost.id === targetId && (
                 <div 
                   className="fixed z-50 bg-white border border-gray-400 p-3 text-xs shadow-xl rounded max-w-md pointer-events-none text-left"
                   style={{ left: tooltipPos.x, top: tooltipPos.y }}
                 >
                   <div className="mb-2 border-b pb-1 text-gray-500 font-bold flex justify-between">
                     <span>{hoveredPost.id} : <span className="text-[#117743]">{hoveredPost.name}</span></span>
                     <span className="text-gray-400 text-[10px]">{hoveredPost.createdAt.split('T')[0]}</span>
                   </div>
                   <div className="max-h-40 overflow-hidden text-gray-800 leading-snug">
                     {hoveredPost.content}
                   </div>
                 </div>
              )}
            </span>
          );
        } else if (part.match(/^https?:\/\//)) {
           return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-[#0056b3] hover:underline">{part}</a>
        }
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
};

// --- Single Post Component ---
const SinglePost: React.FC<{ post: Post, allPosts: Post[], onReply: (id: number) => void }> = ({ post, allPosts, onReply }) => {
  const { t, i18n } = useTranslation();
  const d = new Date(post.createdAt);
  
  // Date formatting with i18n support
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
    
    dateStr = `${y}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}(${day}) ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}.00`;
  } else {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    dateStr = `${d.getFullYear()}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}(${days[d.getDay()]}) ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}.00`;
  }
  
  const displayName = post.name === 'Anonymous' ? t('meta.anonymous') : post.name;

  return (
    <div className="bg-white p-4 mb-3 border-b border-gray-200 sm:rounded-sm sm:shadow-sm sm:border" id={`p${post.id}`}>
      {/* Post Header */}
      <div className="flex flex-wrap items-baseline text-sm mb-3 text-gray-600 gap-2">
        <span className="font-bold text-black">{post.id}</span>
        <span className="font-bold text-[#333]">
          {displayName} 
          {post.tripcode && <span className="text-[#117743] font-normal ml-1">{post.tripcode}</span>}
        </span>
        <span className="text-xs">{dateStr}</span>
        <span className="text-xs">ID:{post.uid}</span>
        
        <div className="ml-auto text-xs flex gap-2">
           <button onClick={() => onReply(post.id)} className="text-[#0056b3] hover:underline">[Reply]</button>
        </div>
      </div>

      {/* Post Body */}
      <div className="pl-0 sm:pl-2">
        <RichText content={post.content} allPosts={allPosts} onQuoteClick={onReply} />
      </div>
    </div>
  );
};

// --- Main Thread View ---
interface ThreadViewProps {
  threadId: string;
  onBack: () => void;
  isFollowed: boolean;
  onToggleFollow: (e: any) => void;
}

export const ThreadView: React.FC<ThreadViewProps> = ({ threadId, onBack, isFollowed, onToggleFollow }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<ThreadDetail | null>(null);
  const [formKey, setFormKey] = useState(0); // Force re-render form on submit
  const [showReplyForm, setShowReplyForm] = useState(false);

  const loadData = async () => {
    try {
      const res = await api.getThreadContent(threadId);
      setData(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000); // Auto refresh every 10s
    return () => clearInterval(interval);
  }, [threadId]);

  const handleReplySubmit = async (payload: any) => {
    await api.createPost(payload);
    await loadData();
    setFormKey(k => k + 1);
    // Scroll to bottom
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
    // Note: We might want to keep the form open after reply, or close it. 
    // Usually on BBS, you might reply again, so keeping it open or resetting is fine.
    // Let's keep it open but clear content (handled by PostForm key reset).
  };

  const insertQuote = (id: number) => {
    setShowReplyForm(true);
    // Use setTimeout to wait for the form to render
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const insert = `>>${id}\n`;
        textarea.value = text.substring(0, start) + insert + text.substring(end);
        const ev = new Event('input', { bubbles: true});
        textarea.dispatchEvent(ev);
        textarea.focus();
      }
      // Smooth scroll to form
      const form = document.getElementById('reply-form');
      if(form) form.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (!data) return <div className="p-4 text-center text-gray-500">{t('meta.loading')}</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20 px-0 sm:px-2">
      {/* Back & Title Header */}
      <div className="bg-white mb-4 p-4 border-b border-gray-200 sm:rounded-sm sm:shadow-sm">
        <div className="flex items-center text-xs text-gray-500 mb-2">
            <button onClick={onBack} className="text-[#0056b3] hover:underline mr-2">
            &lt; {t('nav.boards')}
            </button>
            <span>/ {data.boardId} /</span>
        </div>
        
        <h1 className="text-xl md:text-2xl font-bold text-[#333] mb-2">{data.title}</h1>
        
        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mt-2">
            <span className="flex items-center gap-1 text-[#d32f2f]">
                <span>💬</span> {data.postCount}
            </span>
            <span className="flex items-center gap-1 text-[#f57c00]">
                <span>⚡</span> {data.viewCount}
            </span>
            <button 
              onClick={onToggleFollow}
              className={`px-3 py-0.5 rounded text-xs transition-colors border ${isFollowed ? 'bg-white text-[#2da0b3] border-[#2da0b3]' : 'bg-[#2da0b3] text-white border-[#2da0b3] hover:bg-[#238a9b]'}`}
            >
                {isFollowed ? t('meta.following') : t('meta.follow')}
            </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-0 sm:space-y-4">
        {data.posts.map(post => (
          <SinglePost 
            key={post.id} 
            post={post} 
            allPosts={data.posts} 
            onReply={insertQuote}
          />
        ))}
      </div>

      {/* Reply Form */}
      <div className="mt-6 pt-4 bg-white p-4 border-t border-gray-200 sm:rounded-sm shadow-sm" id="reply-form">
         {!showReplyForm ? (
            <div className="flex justify-center">
                <button 
                  onClick={() => setShowReplyForm(true)}
                  className="bg-white px-6 py-3 rounded shadow-sm border border-gray-300 text-[#333] font-bold hover:bg-gray-50 flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
                >
                  <span className="text-xl text-[#2da0b3]">✏️</span>
                  {t('thread.reply')}
                </button>
            </div>
         ) : (
            <>
                <h3 className="mb-2 font-bold text-gray-600 border-b pb-1">{t('thread.reply')}</h3>
                <div className="flex justify-center mt-2">
                    <PostForm 
                      key={formKey}
                      threadId={threadId} 
                      onSubmit={handleReplySubmit} 
                      onCancel={() => setShowReplyForm(false)}
                    />
                </div>
            </>
         )}
      </div>
    </div>
  );
};
