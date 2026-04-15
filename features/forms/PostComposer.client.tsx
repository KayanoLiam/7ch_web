'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  Bold,
  Code,
  Eye,
  Info,
  Italic,
  Link as LinkIcon,
  List,
  Quote,
  SendHorizontal,
} from 'lucide-react';

import { InlineErrorNotice } from '../../components/InlineErrorNotice';
import { PostContent } from '../../components/PostContent';
import { buildKnownErrorRedirectPath } from '../../lib/errorRedirect';
import { getDisplayErrorMessage } from '../../lib/errorMessage';
import { requestJson } from '../../lib/client/requestJson';
import { cn } from '../../lib/utils';
import type { CreatePostRequest, CreateThreadRequest, Post } from '../../types';

type ComposerMode = 'thread' | 'reply';

interface PostComposerProps {
  mode: ComposerMode;
  boardId: string;
  threadId?: string;
  className?: string;
  sectionId?: string;
  onSubmitted?: (result: string | Post | null) => void;
}

const toolbarActions = [
  { key: 'bold', icon: Bold },
  { key: 'italic', icon: Italic },
  { key: 'link', icon: LinkIcon },
  { key: 'quote', icon: Quote },
  { key: 'code', icon: Code },
  { key: 'list', icon: List },
] as const;

const placeCaret = (textarea: HTMLTextAreaElement | null, start: number, end: number) => {
  window.setTimeout(() => {
    textarea?.focus();
    textarea?.setSelectionRange(start, end);
  }, 0);
};

export function PostComposer({
  mode,
  boardId,
  threadId,
  className,
  sectionId,
  onSubmitted,
}: PostComposerProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const isThreadComposer = mode === 'thread';
  const hasTripcode = name.includes('#');
  const usesSage = email.toLowerCase().includes('sage');
  const charCount = content.trim().length;
  const from = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    if (!threadId) return;

    const handleInsert = (event: Event) => {
      const text = event instanceof CustomEvent && typeof event.detail?.text === 'string'
        ? event.detail.text
        : '';
      if (!text) return;

      const textarea = textareaRef.current;
      const currentValue = textarea?.value ?? contentRef.current;
      const start = textarea?.selectionStart ?? currentValue.length;
      const end = textarea?.selectionEnd ?? currentValue.length;
      const next = `${currentValue.slice(0, start)}${text}${currentValue.slice(end)}`;

      setContent(next);
      placeCaret(textarea, start + text.length, start + text.length);
    };

    window.addEventListener('7ch:insert-reply-text', handleInsert);
    return () => window.removeEventListener('7ch:insert-reply-text', handleInsert);
  }, [threadId]);

  const wrapSelection = (prefix: string, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? content.length;
    const end = textarea.selectionEnd ?? content.length;
    const selected = textarea.value.slice(start, end);
    const next = `${textarea.value.slice(0, start)}${prefix}${selected}${suffix}${textarea.value.slice(end)}`;

    setContent(next);
    placeCaret(textarea, start + prefix.length, start + prefix.length + selected.length);
  };

  const handleToolbarAction = (actionKey: (typeof toolbarActions)[number]['key']) => {
    switch (actionKey) {
      case 'bold':
        wrapSelection('**', '**');
        break;
      case 'italic':
        wrapSelection('*', '*');
        break;
      case 'link':
        wrapSelection('[', '](url)');
        break;
      case 'quote':
        wrapSelection('> ');
        break;
      case 'code':
        wrapSelection('`', '`');
        break;
      case 'list':
        wrapSelection('- ');
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (isThreadComposer) {
      if (!trimmedTitle || !trimmedContent) {
        setSubmitError(t('error.requiredTitleContent'));
        return;
      }
    } else if (!trimmedContent) {
      setSubmitError(t('error.requiredContent'));
      return;
    }

    setIsSubmitting(true);
    try {
      if (isThreadComposer) {
        const payload: CreateThreadRequest = {
          boardId,
          title: trimmedTitle,
          name: trimmedName || undefined,
          email: trimmedEmail || undefined,
          content: trimmedContent,
        };

        const createdThreadId = await requestJson<string>('/api/threads', {
          method: 'POST',
          body: JSON.stringify(payload),
        });

        onSubmitted?.(createdThreadId);
      } else {
        const payload: CreatePostRequest = {
          threadId: threadId!,
          name: trimmedName || undefined,
          email: trimmedEmail || undefined,
          content: trimmedContent,
        };

        const createdPost = await requestJson<Post>('/api/posts', {
          method: 'POST',
          body: JSON.stringify({
            ...payload,
            boardId,
          }),
        });

        setContent('');
        onSubmitted?.(createdPost);
      }
    } catch (error) {
      const redirectPath = buildKnownErrorRedirectPath(error, from);
      if (redirectPath) {
        window.location.assign(redirectPath);
        return;
      }
      setSubmitError(getDisplayErrorMessage(error, t));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id={sectionId}
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-background shadow-[var(--card-shadow-subtle)]',
        className,
      )}
    >
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {isThreadComposer && (
          <div className="border-b border-border bg-background px-4 pb-3 pt-4">
            <input
              className="w-full bg-transparent text-xl font-bold text-foreground outline-none placeholder:text-muted-foreground"
              maxLength={120}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={t('thread.title')}
              required
              type="text"
              value={title}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 border-b border-border bg-muted/40 px-4 py-2.5">
          <label className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">{t('thread.name')}</span>
            <input
              className="w-32 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              maxLength={80}
              onChange={(event) => setName(event.target.value)}
              placeholder={t('thread.namePlaceholder')}
              type="text"
              value={name}
            />
          </label>
          <div className="h-4 w-px bg-border" />
          <label className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">{t('thread.email')}</span>
            <input
              className="w-32 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              maxLength={120}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t('thread.emailPlaceholder')}
              type="text"
              value={email}
            />
          </label>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            {hasTripcode && (
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                Tripcode
              </span>
            )}
            {usesSage && (
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                {t('meta.sage')}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 px-3 py-2">
          {toolbarActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.key}
                type="button"
                title={t(`composer.toolbar.${action.key}`)}
                aria-label={t(`composer.toolbar.${action.key}`)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-background hover:text-foreground"
                onClick={() => handleToolbarAction(action.key)}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>

        <div className="grid min-h-[320px] divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <div className="flex flex-col bg-background">
            <textarea
              ref={textareaRef}
              className="min-h-[320px] flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
              data-post-form-textarea="true"
              maxLength={8000}
              onChange={(event) => setContent(event.target.value)}
              placeholder={t('thread.content')}
              required
              value={content}
            />
          </div>

          <div className="flex flex-col bg-muted/20">
            <div className="border-b border-border px-4 py-2 text-sm font-semibold text-foreground">
              {t('composer.preview')}
            </div>
            {content.trim() ? (
              <div className="max-h-[420px] flex-1 overflow-y-auto p-4 lg:max-h-none">
                <PostContent content={content} />
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center p-8 text-center">
                <div className="flex max-w-xs flex-col items-center gap-3 text-muted-foreground">
                  <div className="rounded-full bg-background p-3">
                    <Eye className="h-6 w-6" />
                  </div>
                  <p className="text-sm leading-relaxed">{t('composer.previewEmpty')}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border bg-muted/20 px-4 py-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Info className="h-4 w-4" />
            {t('composer.tips')}
          </div>
          <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li>{t('composer.hintAnonymous')}</li>
            <li>{t('composer.hintTripcode')}</li>
            <li>{t('composer.hintSage')}</li>
            <li>{t('composer.hintQuote')}</li>
          </ul>
        </div>

        {submitError && (
          <div className="border-t border-border p-4">
            <InlineErrorNotice
              title={t('error.submitFailedTitle')}
              message={submitError}
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>
              {t('composer.characterCount')}{' '}
              <span className="font-semibold text-foreground">{charCount}</span>
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--brand))] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <SendHorizontal className="h-4 w-4" />
            {isSubmitting
              ? (isThreadComposer ? t('thread.submittingThread') : t('thread.submittingReply'))
              : (isThreadComposer ? t('thread.submitThread') : t('thread.submitReply'))}
          </button>
        </div>
      </form>
    </div>
  );
}
