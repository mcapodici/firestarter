import { IBackend, ISignupData, LoginResult, PasswordResetResult, SignupResult } from "./IBackend";
import doSignUp from "./Signup";
import doLogin from "./Login";
import doResetPassword from "./ResetPassword";

export class Backend implements IBackend {
    async login(email: string, password: string): Promise<LoginResult> {
        return await doLogin(email, password);
    }
    async signup(email: string, password: string, data: ISignupData): Promise<SignupResult> {
        return await doSignUp(email, password, data);
    }
    async resetPassword(email: string): Promise<PasswordResetResult> {
        return await doResetPassword(email);
    }
}