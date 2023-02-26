import { IBackend, ISignupData, LoginResult, SignupResult } from "./IBackend";
import doSignUp from "./Signup";
import doLogin from "./Login";

export class Backend implements IBackend {
    async login(email: string, password: string): Promise<LoginResult> {
        return await doLogin(email, password);
    }
    async signup(email: string, password: string, data: ISignupData): Promise<SignupResult> {
        return await doSignUp(email, password, data);
    }
}