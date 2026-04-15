import type { ThreadDetail } from '../../types';
import { escapeJsonLd, stripMarkdown, truncateText } from './sanitize';
import { absoluteUrl, threadUrl } from './url';

export const buildThreadJsonLd = (thread: ThreadDetail) => {
  const canonicalUrl = absoluteUrl(threadUrl(thread.boardId, thread.id));
  const comments = thread.posts.slice(1, 6).map((post) => ({
    '@type': 'Comment',
    text: truncateText(stripMarkdown(post.content), 500),
    dateCreated: post.createdAt,
    position: post.id,
    author: {
      '@type': 'Person',
      name: post.name || 'Anonymous',
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: thread.title,
    url: canonicalUrl,
    discussionUrl: canonicalUrl,
    datePublished: thread.createdAt,
    dateModified: thread.updatedAt,
    articleBody: truncateText(stripMarkdown(thread.opPost.content), 2000),
    commentCount: Math.max(thread.postCount - 1, 0),
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/ViewAction',
      userInteractionCount: thread.viewCount,
    },
    author: {
      '@type': 'Person',
      name: thread.opPost.name || 'Anonymous',
    },
    comment: comments,
  };
};

export const buildFaqPageJsonLd = (
  path: string,
  items: Array<{ question: string; answer: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: absoluteUrl(path),
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const stringifyJsonLd = (value: unknown) => escapeJsonLd(JSON.stringify(value));
