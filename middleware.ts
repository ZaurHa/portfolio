import { NextRequest, NextResponse } from 'next/server';

const locales = ['de', 'en'] as const;
type Locale = (typeof locales)[number];

/** Detect preferred locale from Accept-Language header */
function getPreferredLocale(request: NextRequest): Locale {
  const header = request.headers.get('accept-language') ?? '';
  // Simple check: if browser explicitly prefers English, use 'en'; otherwise default to 'de'
  const preferred = header.split(',')[0]?.split('-')[0]?.toLowerCase();
  return preferred === 'en' ? 'en' : 'de';
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // API routes, static files, _next, muster — nicht anfassen
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/music/') ||
    pathname.startsWith('/muster/') || // Design-Showcase: kein Sprachpräfix
    pathname === '/muster' ||
    pathname.includes('.') // Dateien wie favicon.ico
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getPreferredLocale(request);
    // Preserve query parameters in the redirect
    const url = new URL(`/${locale}${pathname}`, request.url);
    url.search = search;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
