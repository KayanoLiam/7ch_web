'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { PostComposer } from './PostComposer.client';

export function CreateThreadForm({ boardId }: { boardId: string }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="themed-card themed-card-featured mb-4 p-4 sm:p-5 lg:relative lg:mb-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
        <div className="lg:hidden">
          <h2 className="themed-heading-sm text-lg">{t('thread.newTitle')}</h2>
          <p className="themed-meta mt-1 text-sm">{t('thread.newBody')}</p>
        </div>
        <button
          type="button"
          className="themed-secondary-action bbs-desktop-action-button rounded-md px-3 py-2 text-sm font-bold"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? t('thread.collapse') : t('thread.new')}
        </button>
      </div>

      {isOpen && (
        <PostComposer
          className="mt-4 lg:absolute lg:right-0 lg:top-full lg:z-30 lg:w-[min(680px,calc(100vw-2rem))] lg:rounded-lg lg:border lg:border-border lg:bg-[hsl(var(--surface))] lg:p-4 lg:shadow-[var(--card-shadow-strong)]"
          mode="thread"
          boardId={boardId}
          onSubmitted={(threadId) => {
            if (typeof threadId !== 'string') return;
            router.refresh();
            router.push(`/board/${encodeURIComponent(boardId)}/thread/${encodeURIComponent(threadId)}`);
          }}
        />
      )}
    </section>
  );
}
