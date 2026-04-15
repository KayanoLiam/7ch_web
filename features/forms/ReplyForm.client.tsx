'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { PostComposer } from './PostComposer.client';

export function ReplyForm({ boardId, threadId }: { boardId: string; threadId: string }) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <section className="themed-card themed-card-featured mt-4 p-4 sm:p-5" id="reply-form">
      <h2 className="themed-heading-sm text-lg">{t('thread.reply')}</h2>
      <PostComposer
        className="mt-4"
        mode="reply"
        boardId={boardId}
        threadId={threadId}
        onSubmitted={() => router.refresh()}
      />
    </section>
  );
}
