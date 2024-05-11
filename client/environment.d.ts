global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            NEXT_PUBLIC_FIREBASE_APIKEY: string;
            NEXT_PUBLIC_FIREBASE_AUTHDOMAIN: string;
            NEXT_PUBLIC_FIREBASE_PROJECTID: string;
            NEXT_PUBLIC_FIREBASE_STORAGEBUCKET: string;
            NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID: string;
            NEXT_PUBLIC_FIREBASE_APPID: string;
            NEXT_PUBLIC_FIREBASE_MEASUREMENTID: string;
        }
    }
}

export {}