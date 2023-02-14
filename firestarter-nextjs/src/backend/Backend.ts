import { IBackend, SignupResult } from "./IBackend";


export class Backend implements IBackend {
    async signup(username: string, password: string): Promise<SignupResult> {
        return SignupResult.Fail;
    }
}