import app from "@/lib/firebaseConfig";

// All firebase auth methods are available in the auth object
// This will hold all firebase auth methods

const auth = app.auth();


export function LoginWithEmailAndPassword(email: string, password: string){
    return auth.signInWithEmailAndPassword(email, password);
}

export function Logout(){
    return auth.signOut();
}