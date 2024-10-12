import createMiddleware from 'next-intl/middleware';
import {pathnames, locales, localePrefix, defaultLocale} from './config';
import {NextRequest, NextResponse} from "next/server";

const intlMiddleware = createMiddleware({
    defaultLocale,
    locales,
    localePrefix,
    pathnames
});

const publicRoutes = [
    '/login',
    '/'
]

export const config = {
    // Match only internationalized path names
    matcher: [
        // Enable a redirect to a matching locale at the root
        '/',

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        '/(is|en)/:path*',

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        '/((?!_next|_vercel|.*\\..*).*)'
    ]
};

export default async function middleware(req : NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicRoutes
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if(isPublicPage) {
        return intlMiddleware(req);
    } else {
        return intlMiddleware(req);
    }
}
