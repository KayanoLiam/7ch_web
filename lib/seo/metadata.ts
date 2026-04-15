import type { Metadata } from 'next';

import type { Board, ThreadDetail } from '../../types';
import { siteName } from '../constants';
import { defaultLocale, supportedLocales, tServer, type Locale } from '../i18n/dictionaries';
import { buildLocalizedStaticPath, buildStaticPageAlternates } from '../i18n/routing';
import { buildDescription } from './sanitize';
import { absoluteUrl, boardUrl, threadUrl } from './url';

const openGraphLocales: Record<Locale, string> = {
  'zh-CN': 'zh_CN',
  'ja-JP': 'ja_JP',
};

export const baseMetadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: tServer('site.description'),
  applicationName: siteName,
  referrer: 'no-referrer',
  openGraph: {
    siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const buildBoardMetadata = (board: Board, page = 1, locale: Locale = defaultLocale): Metadata => {
  const boardName = tServer(board.name, locale);
  const description = tServer(board.description, locale);
  const path = boardUrl(board.id, page);
  const title = page <= 1 ? `/${board.id}/ - ${boardName}` : `/${board.id}/ - ${boardName} - ${page}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type: 'website',
      locale: openGraphLocales[locale],
    },
  };
};

export const buildThreadMetadata = (thread: ThreadDetail, locale: Locale = defaultLocale): Metadata => {
  const path = threadUrl(thread.boardId, thread.id);
  const description = buildDescription(thread.opPost.content, tServer('site.description', locale));

  return {
    title: thread.title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: thread.title,
      description,
      url: absoluteUrl(path),
      type: 'article',
      locale: openGraphLocales[locale],
      publishedTime: thread.createdAt,
      modifiedTime: thread.updatedAt,
      images: [`${path}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title: thread.title,
      description,
      images: [`${path}/opengraph-image`],
    },
  };
};

export const buildStaticPageMetadata = ({
  title,
  description,
  path,
  locale = defaultLocale,
}: {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
}): Metadata => {
  const localizedPath = buildLocalizedStaticPath(path, locale);
  const alternateLocales = supportedLocales
    .filter((supportedLocale) => supportedLocale !== locale)
    .map((supportedLocale) => openGraphLocales[supportedLocale]);

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        ...buildStaticPageAlternates(path),
        'x-default': buildLocalizedStaticPath(path, defaultLocale),
      },
    },
    openGraph: {
      siteName,
      title,
      description,
      url: absoluteUrl(localizedPath),
      type: 'website',
      locale: openGraphLocales[locale],
      alternateLocale: alternateLocales,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
};
