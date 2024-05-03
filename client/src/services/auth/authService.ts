import firebase from "firebase/compat/app";
import { auth } from "@/firebase/firebaseConfig";
import {GetRequest, PostRequest} from "../apiService";


interface EmptyResponse{
    Status: string;
}


export async function Login(email: string, password: string) {
    // Login with firebase
    // As http cookies are to be used, do not persist any state client side.
    await auth.setPersistence(firebase.auth.Auth.Persistence.NONE);

    // When the user signs in with email and password
    await auth.signInWithEmailAndPassword(email, password).then(user => {
        // Get the user's ID token as it is needed to exchange for a session cookie
        return user.user?.getIdToken().then(idToken => {
            // Session login endpoint is queried and the session cookie is set
            // CSRF not set as no proper instructions were set by firebase
            // const csrfToken = getCookie('csrfToken');
            PostRequest<EmptyResponse>({ path: "auth/login", requestBody: { "id_token": idToken } });
        });
    });
}


interface UserData {
    UserRole: string;
}


export async function GetCurrentUserInformation(){
    try {
        const response = await GetRequest<UserData>({path: "auth/me"});
        console.log("Logging response")
        console.log(response);
    }catch(error){
        console.error("Error fetching information: ", error)
    }
}