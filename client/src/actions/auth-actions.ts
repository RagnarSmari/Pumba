'use server'
import {
    LoginWithEmail,
} from "@/services/auth/auth";
import {cookies} from "next/headers";
import { createSessionCookieAsync} from "@/lib/firebaseAdminConfig";

export async function LoginWithEmailAction(email: string, password: string): Promise<boolean>{
    const user = await LoginWithEmail(email, password);
    if (!user) return false;
    const idToken = await user.getIdToken();
    const expires = 60 * 60 * 25 * 5 * 1000
    const sessionCookie = await createSessionCookieAsync(idToken, expires);
    const options = { maxAge: expires, httpOnly: true, secure: true};
    setCookie(sessionCookie, expires)
    return true;
}

function setCookie(value: string, maxAge: number){
    console.log("Setting cookie")
    const cookieStore = cookies();
    cookieStore.set("__session", value, {
        httpOnly: true,
        maxAge: maxAge,
        sameSite: "lax",
        secure: process.env.NODE_ENV === 'production'
    });
}
