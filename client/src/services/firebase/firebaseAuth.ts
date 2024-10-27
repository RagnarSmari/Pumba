import { auth } from "@/lib/firebaseConfig";

export function signInWithEmailAndPassword(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
}




