export enum SignupResult {
    Success,
    Fail,
    InvalidUsername,
    InvalidPassword
}

export interface IBackend {
    signup(username: string, password: string): Promise<SignupResult>;
}