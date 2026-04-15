import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { localeCookieName } from './lib/i18n/dictionaries';
import {
  buildLocalizedStaticPath,
  getLocaleFromPathname,
  isLocalizedStaticPath,
  readLocaleFromCookieHeader,
  requestLocaleHeaderName,
  stripLocalePrefix,
} from './lib/i18n/routing';

const PUBLIC_FILE_PATTERN = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api')
    || pathname.startsWith('/_next')
    || pathname === '/robots.txt'
    || pathname === '/sitemap.xml'
    || pathname === '/favicon.ico'
    || PUBLIC_FILE_PATTERN.test(pathname)
  ) {
    return NextResponse.next();
  }

  const localeFromPath = getLocaleFromPathname(pathname);
  const strippedPath = stripLocalePrefix(pathname);

  if (localeFromPath && isLocalizedStaticPath(pathname)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(requestLocaleHeaderName, localeFromPath);

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = strippedPath;

    const response = NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
    response.cookies.set(localeCookieName, localeFromPath, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  if (!localeFromPath && isLocalizedStaticPath(pathname)) {
    const locale = readLocaleFromCookieHeader(request.headers.get('cookie'));
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = buildLocalizedStaticPath(pathname, locale);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
