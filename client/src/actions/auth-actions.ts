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
    
    try {
        const sessionCookie = await createSessionCookieAsync(idToken, expires);
        console.log("setting options")
        const options = { maxAge: expires, httpOnly: true, secure: true};
        setCookie(sessionCookie, expires)
        return true;
    } catch (error){
        console.log(error)
        return false;
    }
}

function setCookie(value: string, expires: number){
    const cookieStore = cookies();

    cookieStore.set("__session", value, {
        name: "__session",
        value: value,
        secure: true,
        httpOnly: true,
        sameSite: "none",
        expires: expires,
        domain: ""
    });
}
