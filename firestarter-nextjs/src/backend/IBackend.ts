export type SignupSuccess = { result: 'success', uid: string };

/**
 * Represents success in creating user, but a failure to store user data
 */
export type SignupPartialSuccess = { result: 'partial-success', uid: string };
export type SignupFail = { result: 'fail', message: string };
export type SignupFailWeakPassword = { result: 'weak-password' };
export type SignupFailAccountsNotEnabledOnBackend = { result: 'accounts-not-enabled' };
export type SignupFailEmailIsInUse = { result: 'email-in-use' };
export type SignupFailInvalidEmail = { result: 'invalid-email' };
export type SignupResult =
    SignupSuccess |
    SignupPartialSuccess |
    SignupFail |
    SignupFailWeakPassword |
    SignupFailAccountsNotEnabledOnBackend |
    SignupFailEmailIsInUse |
    SignupFailInvalidEmail;

export interface ISignupData {
    firstName?: string;
    lastName?: string;
}

export interface IBackend {
    signup(email: string, password: string, data: ISignupData): Promise<SignupResult>;
}