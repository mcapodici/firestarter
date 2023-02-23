import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { ISignupData, SignupResult } from "./IBackend";
import { auth, firestore } from "@/firebase/config";
import { AUTH_EMAIL_ALREADY_IN_USE, AUTH_INVALID_EMAIL, AUTH_OPERATION_NOT_ALLOWED, AUTH_WEAK_PASSWORD } from "@/firebase/errorCodes";
import { doc, setDoc } from "firebase/firestore";

export default async function signup(email: string, password: string, data: ISignupData): Promise<SignupResult> {
    let credential: UserCredential;
    try {
        credential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e: unknown) {
        if (!(e instanceof FirebaseError)) {
            return { result: 'fail', message: '' }
        };
        if (e.code === AUTH_WEAK_PASSWORD) {
            return { result: 'weak-password' };
        }
        if (e.code === AUTH_EMAIL_ALREADY_IN_USE) {
            return { result: 'email-in-use' };
        }
        if (e.code === AUTH_INVALID_EMAIL) {
            return { result: 'invalid-email' };
        }
        if (e.code === AUTH_OPERATION_NOT_ALLOWED) {
            return { result: 'accounts-not-enabled' };
        }
        return { result: 'fail', message: e.message };
    }

    try {
        const userRef = doc(firestore, "users", credential.user.uid);
        await setDoc(userRef, data)
    } catch (e: unknown) {
        return { result: 'partial-success', uid: credential.user.uid }
    }

    return { result: 'success', uid: credential.user.uid };
}