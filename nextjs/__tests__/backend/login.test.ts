import { Backend } from '@/backend/Backend';
import { AUTH_INVALID_EMAIL, AUTH_USER_DISABLED, AUTH_USER_NOT_FOUND, AUTH_WRONG_PASSWORD } from '@/firebase/errorCodes';
import { FirebaseError } from '@firebase/util';
import { UserCredential } from 'firebase/auth';

const signInWithEmailAndPassword = jest.fn();
const login = new Backend().login;

jest.mock('firebase/auth',
    () => ({
        signInWithEmailAndPassword: (...args: any[]) => signInWithEmailAndPassword(...args)
    }));

describe('Login Function', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    it('Works with successful login', async () => {
    let credential: UserCredential;
        const mockCredentials = { user: { uid: "123", emailVerified: true } } as any as UserCredential;
        signInWithEmailAndPassword.mockResolvedValue(mockCredentials);
        const result = await login('ben@example.com', 'fred1234!');
        expect(result).toEqual({ result: 'success', uid: '123', emailVerified: true });
        expect(signInWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred1234!');
    });

    describe('handles error code from Firebase:', () => {
        it(AUTH_INVALID_EMAIL, async () => {
            jest.spyOn(console, 'error').mockImplementation();
            signInWithEmailAndPassword.mockRejectedValue(new FirebaseError(AUTH_INVALID_EMAIL, ''));
            const result = await login('ben@example.com', 'fred');
            expect(result).toEqual({ result: 'user-not-found' });
            expect(signInWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
            expect(console.error).toBeCalledWith(new FirebaseError(AUTH_INVALID_EMAIL, ''));
        });

        it(AUTH_USER_NOT_FOUND, async () => {
            jest.spyOn(console, 'error').mockImplementation();
            signInWithEmailAndPassword.mockRejectedValue(new FirebaseError(AUTH_USER_NOT_FOUND, ''));
            const result = await login('ben@example.com', 'fred');
            expect(result).toEqual({ result: 'user-not-found' });
            expect(signInWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
            expect(console.error).toBeCalledWith(new FirebaseError(AUTH_USER_NOT_FOUND, ''));
        });

        it(AUTH_USER_DISABLED, async () => {
            jest.spyOn(console, 'error').mockImplementation();
            signInWithEmailAndPassword.mockRejectedValue(new FirebaseError(AUTH_USER_DISABLED, ''));
            const result = await login('ben@example.com', 'fred');
            expect(result).toEqual({ result: 'user-disabled' });
            expect(signInWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
            expect(console.error).toBeCalledWith(new FirebaseError(AUTH_USER_DISABLED, ''));
        });

        it(AUTH_WRONG_PASSWORD, async () => {
            jest.spyOn(console, 'error').mockImplementation();
            signInWithEmailAndPassword.mockRejectedValue(new FirebaseError(AUTH_WRONG_PASSWORD, ''));
            const result = await login('ben@example.com', 'fred');
            expect(result).toEqual({ result: 'wrong-password' });
            expect(signInWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
            expect(console.error).toBeCalledWith(new FirebaseError(AUTH_WRONG_PASSWORD, ''));
        });
    });

    it('Handles an unexpected result from Firebase', async () => {
        jest.spyOn(console, 'error').mockImplementation();
        signInWithEmailAndPassword.mockRejectedValue(new FirebaseError('auth/something-unencountered', 'Cosmic Radiation'));
        const result = await login('ben@example.com', 'fred');
        expect(result).toEqual({ result: 'fail', message: 'Cosmic Radiation' });
        expect(signInWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
        expect(console.error).toBeCalledWith(new FirebaseError('auth/something-unencountered', 'Cosmic Radiation'));
    });

    it('Handles an unexpected error entirely', async () => {
        jest.spyOn(console, 'error').mockImplementation();
        signInWithEmailAndPassword.mockRejectedValue('xyz');
        const result = await login('ben@example.com', 'fred');
        expect(result).toEqual({ result: 'fail', message: '' });
        expect(signInWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
        expect(console.error).toBeCalledWith('xyz');
    });
});