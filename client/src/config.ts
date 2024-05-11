import {Pathnames} from "next-intl/navigation";

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${port}`;

export const defaultLocale = 'en' as const;
export const locales = ['en', 'is'] as const;

export const pathnames = {
    '/': '/',
    '/about': {
        en: '/about',
        is: '/umokkur'
    }
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;
export type AppPathnames = keyof typeof pathnames;