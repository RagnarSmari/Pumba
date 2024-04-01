import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";


export default async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in
        return userCredential;
    }).catch((error) => {
        console.error(error);
        console.log(error.code);
    });
}