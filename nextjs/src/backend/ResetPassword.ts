import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { PasswordResetResult } from "./IBackend";
import { auth } from "@/firebase/init";
import { AUTH_INVALID_EMAIL, AUTH_USER_NOT_FOUND } from "@/firebase/errorCodes";

export default async function doResetPassword(email: string): Promise<PasswordResetResult> {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (e: unknown) {
        if (!(e instanceof FirebaseError)) {
            return { result: 'fail', message: '' }
        };
        if (e.code === AUTH_INVALID_EMAIL || e.code === AUTH_USER_NOT_FOUND) {
            // Treat invalid email as user not found to have fewer specific cases
            return { result: 'user-not-found' };
        }
        // We don't classify certain codes like `auth/missing-continue-uri` that would be
        // caused by a bug in the frontend code rather than a problem with the user input.
        return { result: 'fail', message: e.message };
    }

    return { result: 'success' };
}