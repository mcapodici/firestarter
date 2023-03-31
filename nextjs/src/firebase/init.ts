
import { isServerSide } from "@/backend/ServerSideUtil";
import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from  "firebase/firestore";
import firebaseConfig from "./config";

export let app: FirebaseApp;
export let auth: Auth;
export let firestore: Firestore;

export function initFirebase() {
  if (!isServerSide()) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    firestore = getFirestore(app);
  }
}