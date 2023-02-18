import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { SignupResult } from "./IBackend";
import { auth } from "@/firebase/config";

export default async function signup(email: string, password: string): Promise<SignupResult> {
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        return { result: 'success', uid: credential.user.uid };
    } catch (e: unknown) {
        if (!(e instanceof FirebaseError)) { throw e; }
        if (e.code === 'auth/weak-password') {
            return { result: 'weak-password' };
        }
        console.log(e.code);
        console.log({...e});
        return { result: 'fail' };
    }
}