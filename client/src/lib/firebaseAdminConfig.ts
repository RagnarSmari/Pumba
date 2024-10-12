import admin from "firebase-admin";
import { initializeApp, getApps } from 'firebase-admin/app';
import serviceAccount from "C:/FirebaseKeys/pumbakey.json";

const apps = getApps();
if (apps.length < 1){
    initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    });
}

export function createSessionCookieAsync(idToken: string,  expiresIn: number){
    return admin.auth().createSessionCookie(idToken,  { expiresIn })
}
