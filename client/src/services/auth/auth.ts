import { auth } from "@/firebase/firebaseConfig";

export async function Login(email: string, password: string) {
    try {
        // Login with firebase
        let res = await auth.signInWithEmailAndPassword(email, password);
        // Store the token in local storage
        
        // Validate the user with the server
        // Redirect to the dashboard
        return res;
    } catch (error) {
        throw error;
    }
}

export async function SignUp(email: string, password: string) {
    try {
        let res = await auth.createUserWithEmailAndPassword(email, password);
        return res;
    } catch (error) {
        throw error;
    }
}