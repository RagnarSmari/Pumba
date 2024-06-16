import {GET, POST} from "@/services/apiService";
import {auth} from "@/lib/firebaseConfig";
import {NewSessionResponse} from "@/types/auth";

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

export async function CreateSession(idToken: string) : Promise<NewSessionResponse>{
    const props = {
        url: "auth/newSession",
        body: {
            "id_token": idToken
        }
    }
    let res = await POST(props);
    return await res.json();
}

export async function PingServer(){
    return await GET("auth/sessioncheck");
}
