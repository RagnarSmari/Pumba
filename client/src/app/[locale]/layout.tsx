import '../globals.css'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import {getMessages} from "next-intl/server";
import { Inter } from "next/font/google";
import {Toaster} from "@/components/ui/toaster";
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import React from "react";

const inter = Inter({ subsets: ["latin"]})


export const metadata: Metadata = {
    title: 'Pumba',
    description: 'Time registration',
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string}>
}) {
    const { locale } = await params;
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound()
    }
    
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
                <Toaster />
            </body>
        </html>
    );
}