'use client';

import { useCallback, useEffect, useState } from 'react';

const hiddenThreadsKey = '7ch_hidden_threads';
const followedThreadsKey = '7ch_followed_threads';
const changeEventName = '7ch:thread-preferences-changed';

type PreferenceKind = 'hidden' | 'followed';

const keyForKind = (kind: PreferenceKind) =>
  kind === 'hidden' ? hiddenThreadsKey : followedThreadsKey;

const readThreadSet = (kind: PreferenceKind) => {
  if (typeof window === 'undefined') return new Set<string>();

  try {
    const raw = window.localStorage.getItem(keyForKind(kind));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? new Set(parsed.filter((item): item is string => typeof item === 'string'))
      : new Set<string>();
  } catch {
    return new Set<string>();
  }
};

const writeThreadSet = (kind: PreferenceKind, value: Set<string>) => {
  window.localStorage.setItem(keyForKind(kind), JSON.stringify(Array.from(value)));
  window.dispatchEvent(new CustomEvent(changeEventName, { detail: { kind } }));
};

export const readFollowedThreadIds = () => Array.from(readThreadSet('followed'));

export function useThreadPreference(kind: PreferenceKind, threadId: string) {
  const [ids, setIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const handleChange = () => setIds(readThreadSet(kind));
    handleChange();
    window.addEventListener('storage', handleChange);
    window.addEventListener(changeEventName, handleChange);
    return () => {
      window.removeEventListener('storage', handleChange);
      window.removeEventListener(changeEventName, handleChange);
    };
  }, [kind]);

  const toggle = useCallback(() => {
    const next = readThreadSet(kind);
    if (next.has(threadId)) {
      next.delete(threadId);
    } else {
      next.add(threadId);
    }
    writeThreadSet(kind, next);
    setIds(next);
  }, [kind, threadId]);

  return {
    enabled: ids.has(threadId),
    toggle,
  };
}

export function removeFollowedThread(threadId: string) {
  const next = readThreadSet('followed');
  next.delete(threadId);
  writeThreadSet('followed', next);
}

export function subscribeThreadPreferences(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(changeEventName, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(changeEventName, callback);
  };
}
