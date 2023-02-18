import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { SignupResult } from "./IBackend";
import { auth } from "@/firebase/config";
import { AUTH_EMAIL_ALREADY_IN_USE, AUTH_INVALID_EMAIL, AUTH_OPERATION_NOT_ALLOWED, AUTH_WEAK_PASSWORD } from "@/firebase/errorCodes";

export default async function signup(email: string, password: string): Promise<SignupResult> {
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        return { result: 'success', uid: credential.user.uid };
    } catch (e: unknown) {
        if (!(e instanceof FirebaseError)) {
            return { result: 'fail', message: '' }
        };
        console.log({ ...e }, e.message);
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
}