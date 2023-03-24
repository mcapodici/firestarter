import { sendEmailVerification as sendEmailVerificationFirebase, User } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { EmailVerificationResult } from "./IBackend";

export default async function sendEmailVerification(user: User): Promise<EmailVerificationResult> {
    try {
        await sendEmailVerificationFirebase(user);
    } catch (e: unknown) {
        if (!(e instanceof FirebaseError)) {
            return { result: 'fail', message: '' }
        };
        // We don't classify certain codes like `auth/missing-continue-uri` that would be
        // caused by a bug in the frontend code rather than a problem with the user input.
        return { result: 'fail', message: e.message };
    }

    return { result: 'success' };
}