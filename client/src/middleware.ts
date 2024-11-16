import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from "next/server";

const intlMiddleware = createMiddleware(routing)


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
    const defaultLocale = await req.headers.get('en') || 'is';
    const handleI18nRouting = createMiddleware({
        locales: [ 'en', 'is'],
        defaultLocale
    });
    const response = handleI18nRouting(req);
    
    response.headers.set('en', defaultLocale);
    
    const publicPathnameRegex = RegExp(
        `^(/(${routing.locales.join('|')}))?(${publicRoutes
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    const sessionCookie = req.cookies.get('pumbaSession');
    const isLoggedIn = sessionCookie !== undefined;

    if (isPublicPage) {
        return response;
    }

    if (!isLoggedIn) {
        // Extract the locale from the URL pathname
        
        const redirectUrl = new URL(`/login`, req.nextUrl.origin);

        return NextResponse.redirect(redirectUrl);
    }
    // User is logged in, proceed with the request
    return intlMiddleware(req);
}
