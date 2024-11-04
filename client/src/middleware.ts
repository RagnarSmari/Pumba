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
    const sessionCookie = req.cookies.get('pumbaSession');
    const isLoggedIn = sessionCookie !== undefined;

    if (isPublicPage) {
        return intlMiddleware(req);
    }

    if (!isLoggedIn) {
        // Extract the locale from the URL pathname
        const pathnameParts = req.nextUrl.pathname.split('/');
        let localeFromPath: 'en' | 'is';
        if (pathnameParts[1] === 'en' || pathnameParts[1] === 'is') {
            localeFromPath = pathnameParts[1] as 'en' | 'is';
        } else {
            localeFromPath = 'en'; // Default to 'en' or use defaultLocale
        }        // Build the redirect URL using the origin
        
        const redirectUrl = new URL(`/${localeFromPath}/login`, req.nextUrl.origin);
        console.log('Redirect URL:', redirectUrl.toString());

        return NextResponse.redirect(redirectUrl);
    }
    // User is logged in, proceed with the request
    return intlMiddleware(req);
}
