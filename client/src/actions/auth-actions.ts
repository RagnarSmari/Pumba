'use server'
import {
    CreateSession,
    LoginWithEmail,
    PingServer
} from "@/services/auth/auth";
import {cookies} from "next/headers";



export async function SessionCheckAction(){
    return await PingServer();
}

export async function LoginWithEmailAction(email: string, password: string): Promise<boolean>{
    const cookiestore = cookies();
    const user = await LoginWithEmail(email, password);
    if (!user) return false;
    const idToken = await user.getIdToken();
    const oneDay = 24 * 60 * 60 * 1000
    let res = await CreateSession(idToken);
    console.log("Setting cookie")
    console.log(res.cookie)
    cookiestore.set("__session", res.cookie, {
        name: "__session",
        value: res.cookie,
        secure: true,
        httpOnly: true,
        sameSite: "none",
        expires: Date.now() + oneDay,
        domain: ""
    });
    return true;
}
