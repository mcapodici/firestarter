export type SignupSuccess = { result: 'success', uid: string };
export type SignupFail = { result: 'fail', message: string };
export type SignupFailWeakPassword = { result: 'weak-password' };
export type SignupResult = SignupSuccess | SignupFail | SignupFailWeakPassword;

export interface IBackend {
    signup(email: string, password: string): Promise<SignupResult>;
}