import { NextResponse } from 'next/server';
import { LoginWithEmail } from '@/services/auth/auth';
import { createSessionCookieAsync } from '@/lib/firebaseAdminConfig';
import * as http from "node:http";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        console.log(email, password);

        const user = await LoginWithEmail(email, password);
        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const idToken = await user.getIdToken();
        const expires = 60 * 60 * 24 * 5 * 1000; // Expires in 5 days
        const sessionCookie = await createSessionCookieAsync(idToken, expires);

        const response = NextResponse.json({ message: 'Logged in successfully' });
        response.cookies.set('__session', sessionCookie, {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: "none"
        });
        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
