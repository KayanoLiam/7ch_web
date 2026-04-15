'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { Post } from '../../types';

type PostPreview = Pick<Post, 'id' | 'name' | 'content' | 'createdAt'>;

interface TooltipState {
  post: PostPreview;
  x: number;
  y: number;
}

const quoteSelector = '[data-quote-id]';

const parseQuoteId = (value: string | null) => {
  const id = Number.parseInt(value || '', 10);
  return Number.isFinite(id) ? id : null;
};

const dispatchQuoteInsert = (id: number) => {
  window.dispatchEvent(new CustomEvent('7ch:insert-reply-text', {
    detail: {
      text: `>>${id}\n`,
    },
  }));
};

const findQuoteElement = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>(quoteSelector);
};

export function QuoteInteractions({ posts }: { posts: PostPreview[] }) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    const postMap = new Map(posts.map((post) => [post.id, post]));

    const handleMouseOver = (event: MouseEvent) => {
      const element = findQuoteElement(event.target);
      if (!element) return;

      const id = parseQuoteId(element.dataset.quoteId || null);
      if (id === null) return;

      const post = postMap.get(id);
      if (!post) return;

      const rect = element.getBoundingClientRect();
      setTooltip({
        post,
        x: Math.min(rect.left, window.innerWidth - 360),
        y: rect.bottom + 8,
      });
    };

    const handleMouseOut = (event: MouseEvent) => {
      const element = findQuoteElement(event.target);
      if (!element) return;
      setTooltip(null);
    };

    const handleClick = (event: MouseEvent) => {
      const element = findQuoteElement(event.target);
      if (!element) return;

      const id = parseQuoteId(element.dataset.quoteId || null);
      if (id === null) return;

      event.preventDefault();
      dispatchQuoteInsert(id);
      document.getElementById('reply-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
    };
  }, [posts]);

  if (!tooltip) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 max-w-sm rounded-md border border-border bg-background p-3 text-left text-xs shadow-xl"
      style={{
        left: Math.max(8, tooltip.x),
        top: Math.max(8, tooltip.y),
      }}
    >
      <div className="themed-meta mb-2 flex justify-between gap-3 border-b border-border pb-1 font-bold">
        <span>{tooltip.post.id} : {tooltip.post.name}</span>
        <span>{tooltip.post.createdAt.split('T')[0]}</span>
      </div>
      <div className="max-h-40 overflow-hidden whitespace-pre-wrap leading-snug text-foreground">
        {tooltip.post.content}
      </div>
    </div>
  );
}

export function ReplyToPostButton({ postId }: { postId: number }) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="themed-inline-action ml-auto text-xs"
      onClick={() => {
        dispatchQuoteInsert(postId);
        document.getElementById('reply-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      [{t('thread.replyShort')}]
    </button>
  );
}
