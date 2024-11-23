import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'is'],
    localePrefix: 'always',

    // Used when no locale matches
    defaultLocale: 'en',
    
    pathnames: {
        "/":"/",
        "/dashboard":{
            en: "/dashboard",
            is: '/yfirlit'
        },
        '/jobs':{
            en: '/jobs',
            is: '/verk'
        },
        '/registrations':{
            en: '/registrations',
            is: '/skráningar'
        }
    }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
    createNavigation(routing);