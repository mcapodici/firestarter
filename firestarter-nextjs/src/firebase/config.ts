
import { isServerSide } from "@/backend/ServerSideUtil";
import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

export let app: FirebaseApp;
export let auth: Auth;

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
};

if (!isServerSide()) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}