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

export type LoginResult =
    { result: 'success', uid: string } |
    { result: 'user-not-found' } |
    { result: 'wrong-password' } |
    { result: 'user-disabled' } |
    { result: 'fail', message: string };

export type PasswordResetResult =
    { result: 'success' } |
    { result: 'user-not-found' } |
    { result: 'fail', message: string };


export interface ISignupData {
    firstName?: string;
    lastName?: string;
}

export interface IBackend {
    signup(email: string, password: string, data: ISignupData): Promise<SignupResult>;
    login(email: string, password: string): Promise<LoginResult>;
    resetPassword(email: string): Promise<PasswordResetResult>;
}