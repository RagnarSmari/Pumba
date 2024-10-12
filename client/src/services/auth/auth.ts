import {auth} from "@/lib/firebaseConfig";

export async function LoginWithEmail(email: string, password: string){
    return auth.signInWithEmailAndPassword(email, password).then((userCredential) =>
    {
       return userCredential.user; // Signed in
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
    });
}

