import { Backend } from '@/backend/Backend';
import { AUTH_INVALID_EMAIL, AUTH_USER_DISABLED, AUTH_USER_NOT_FOUND, AUTH_WRONG_PASSWORD } from '@/firebase/errorCodes';
import { FirebaseError } from '@firebase/util';
import { UserCredential } from 'firebase/auth';

const sendPasswordResetEmail = jest.fn();
const resetPassword = new Backend().resetPassword;

jest.mock('firebase/auth',
    () => ({
        sendPasswordResetEmail: (...args: any[]) => sendPasswordResetEmail(...args)
    }));

describe('Reset Password Function', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    it('Works with successful login', async () => {
        sendPasswordResetEmail.mockResolvedValue(undefined);
        const result = await resetPassword('ben@example.com');
        expect(result).toEqual({ result: 'success' });
        expect(sendPasswordResetEmail).toBeCalledWith(undefined, 'ben@example.com');
    });

    describe('handles error code from Firebase:', () => {
        it(AUTH_INVALID_EMAIL, async () => {
            jest.spyOn(console, 'error').mockImplementation();
            sendPasswordResetEmail.mockRejectedValue(new FirebaseError(AUTH_INVALID_EMAIL, ''));
            const result = await resetPassword('ben@example.com');
            expect(result).toEqual({ result: 'user-not-found' });
            expect(sendPasswordResetEmail).toBeCalledWith(undefined, 'ben@example.com');
            expect(console.error).toBeCalledWith(new FirebaseError(AUTH_INVALID_EMAIL, ''));
        });

        it(AUTH_USER_NOT_FOUND, async () => {
            jest.spyOn(console, 'error').mockImplementation();
            sendPasswordResetEmail.mockRejectedValue(new FirebaseError(AUTH_USER_NOT_FOUND, ''));
            const result = await resetPassword('ben@example.com');
            expect(result).toEqual({ result: 'user-not-found' });
            expect(sendPasswordResetEmail).toBeCalledWith(undefined, 'ben@example.com');
            expect(console.error).toBeCalledWith(new FirebaseError(AUTH_USER_NOT_FOUND, ''));
        });
    });

    it('Handles an unexpected result from Firebase', async () => {
        jest.spyOn(console, 'error').mockImplementation();
        sendPasswordResetEmail.mockRejectedValue(new FirebaseError('auth/something-unencountered', 'Cosmic Radiation'));
        const result = await resetPassword('ben@example.com');
        expect(result).toEqual({ result: 'fail', message: 'Cosmic Radiation' });
        expect(sendPasswordResetEmail).toBeCalledWith(undefined, 'ben@example.com');
        expect(console.error).toBeCalledWith(new FirebaseError('auth/something-unencountered', 'Cosmic Radiation'));
    });

    it('Handles an unexpected error entirely', async () => {
        jest.spyOn(console, 'error').mockImplementation();
        sendPasswordResetEmail.mockRejectedValue('xyz');
        const result = await resetPassword('ben@example.com');
        expect(result).toEqual({ result: 'fail', message: '' });
        expect(sendPasswordResetEmail).toBeCalledWith(undefined, 'ben@example.com');
        expect(console.error).toBeCalledWith('xyz');
    });
});