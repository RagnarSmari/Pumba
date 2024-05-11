import {LoginWithEmailAndPassword} from "@/services/firebase/firebaseAuth";


export async function Login(email: string, password: string){
    const res = await LoginWithEmailAndPassword(email, password);
    const id = await res.user?.getIdToken() ?? "";
    // TODO Call our api and make server set cookie


}