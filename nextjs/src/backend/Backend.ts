import { IBackend, ISignupData, LoginResult, SignupResult } from "./IBackend";
import doSignUp from "./Signup";

export class Backend implements IBackend {
    async login(email: string, password: string): Promise<LoginResult> {
        throw new Error("Method not implemented.");
    }
    async signup(email: string, password: string, data: ISignupData): Promise<SignupResult> {
        return await doSignUp(email, password, data);
    }

}