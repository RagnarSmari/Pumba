import { auth } from "@/lib/firebaseConfig";
import firebase from "firebase/compat/app";


export function signInWithEmailAndPassword(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
}




