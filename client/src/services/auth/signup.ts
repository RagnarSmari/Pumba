import { auth } from "../../firebase/firebaseConfig"
import { createUserWithEmailAndPassword } from 'firebase/auth';

const signUp = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed up
            return userCredential;
        }).catch((error) => {
            console.error(error);
            console.log(error.code);
        });
    } catch (error) {
        console.error(error);
    }
}

export default signUp;