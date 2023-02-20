import { IBackend, ISignupData, SignupResult } from "./IBackend";
import doSignUp from "./Signup";

export class Backend implements IBackend {
    async signup(email: string, password: string, data: ISignupData): Promise<SignupResult> {
        return await doSignUp(email, password, data);
    }
}