import '../globals.css'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import {getMessages} from "next-intl/server";
import { Inter } from "next/font/google";
import MainNavbar from "@/components/navbar/main-navbar";

const inter = Inter({ subsets: ["latin"]})


export const metadata: Metadata = {
    title: 'Pumba',
    description: 'Time registration',
}

export default async function LocaleLayout({
    children,
    params: {locale}
}: {
    children: React.ReactNode;
    params: {locale: string};
}) {
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}