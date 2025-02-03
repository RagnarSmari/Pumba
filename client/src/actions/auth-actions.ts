'use server'
import {
    LoginWithEmail,
} from "@/services/auth/auth";
import {pumbaApiRequest} from "@/services/apiService";

export async function LoginWithEmailAction(email: string, password: string): Promise<string | null>{
    const user = await LoginWithEmail(email, password);
    if (!user) return null;
    return await user.getIdToken();
}

