import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { LoginResult } from "./IBackend";
import { auth } from "@/firebase/init";
import { AUTH_INVALID_EMAIL, AUTH_USER_DISABLED, AUTH_USER_NOT_FOUND, AUTH_WRONG_PASSWORD } from "@/firebase/errorCodes";

export default async function doLogin(email: string, password: string): Promise<LoginResult> {
    try {
        const { user: {uid, emailVerified}} = await signInWithEmailAndPassword(auth, email, password);        
        return { result: 'success', uid, emailVerified };
    } catch (e: unknown) {
        if (!(e instanceof FirebaseError)) {
            return { result: 'fail', message: '' };
        };
        if (e.code === AUTH_INVALID_EMAIL || e.code === AUTH_USER_NOT_FOUND) {
            // Treat invalid email as user not found to have fewer specific cases
            return { result: 'user-not-found' };
        }
        if (e.code === AUTH_USER_DISABLED) {
            return { result: 'user-disabled' };
        }
        if (e.code === AUTH_WRONG_PASSWORD) {
            return { result: 'wrong-password' };
        }
        return { result: 'fail', message: e.message };
    }
}