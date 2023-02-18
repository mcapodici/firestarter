export type SignupSuccess = { result: 'success', uid: string };
export type SignupFail = { result: 'fail', message: string };
export type SignupFailWeakPassword = { result: 'weak-password' };
export type SignupFailAccountsNotEnabledOnBackend = { result: 'accounts-not-enabled' };
export type SignupFailEmailIsInUse = { result: 'email-in-use' };
export type SignupFailInvalidEmail = { result: 'invalid-email' };
export type SignupResult =
    SignupSuccess |
    SignupFail |
    SignupFailWeakPassword |
    SignupFailAccountsNotEnabledOnBackend |
    SignupFailEmailIsInUse |
    SignupFailInvalidEmail;

export interface IBackend {
    signup(email: string, password: string): Promise<SignupResult>;
}