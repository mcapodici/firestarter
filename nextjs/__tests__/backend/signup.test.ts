import { Backend } from '@/backend/Backend';
import { AUTH_EMAIL_ALREADY_IN_USE, AUTH_INVALID_EMAIL, AUTH_OPERATION_NOT_ALLOWED, AUTH_WEAK_PASSWORD } from '@/firebase/errorCodes';
import { FirebaseError } from '@firebase/util';
import { UserCredential } from 'firebase/auth';

const createUserWithEmailAndPassword = jest.fn();
const sendEmailVerification = jest.fn();
const signup = new Backend().signup;

jest.mock('firebase/auth',
    () => ({
        createUserWithEmailAndPassword: (...args: any[]) => createUserWithEmailAndPassword(...args),
        sendEmailVerification: (...args: any[]) => sendEmailVerification(...args)
    }));

const setDocMock = jest.fn();
jest.mock('firebase/firestore',
    () => ({
        doc: () => null,
        setDoc: (...args: any[]) => setDocMock(args)
    }));

describe('Signup Function', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    it('Works with successful signup', async () => {
        const mockCredentials = { user: { uid: "123" } } as any as UserCredential;
        createUserWithEmailAndPassword.mockResolvedValue(mockCredentials);
        setDocMock.mockResolvedValue(undefined);
        sendEmailVerification.mockResolvedValue(undefined);
        const result = await signup('ben@example.com', 'fred1234!', { firstName: 'ben', lastName: 'neb' });
        expect(result).toEqual({ result: 'success', uid: '123' });
        expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred1234!');
        expect(sendEmailVerification).toBeCalledWith(mockCredentials.user);
    });

    it('Works with partial successful signup', async () => {
        jest.spyOn(console, 'error').mockImplementation();
        const mockCredentials = { user: { uid: "123" } } as any as UserCredential;
        createUserWithEmailAndPassword.mockResolvedValue(mockCredentials);
        setDocMock.mockRejectedValue('saving data about user is not working for some reason');
        sendEmailVerification.mockResolvedValue(undefined);
        const result = await signup('ben@example.com', 'fred1234!', { firstName: 'ben', lastName: 'neb' });
        expect(result).toEqual({ result: 'partial-success', uid: '123' });
        expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred1234!');
        expect(sendEmailVerification).toBeCalledWith(mockCredentials.user);
        expect(console.error).toBeCalledWith('saving data about user is not working for some reason');
    });

    describe('handles error code from Firebase:', () => {
        it(AUTH_WEAK_PASSWORD, async () => {
            jest.spyOn(console, 'error').mockImplementation();
            createUserWithEmailAndPassword.mockRejectedValue(new FirebaseError(AUTH_WEAK_PASSWORD, ''));
            const result = await signup('ben@example.com', 'fred', { firstName: 'ben', lastName: 'neb' });
            expect(result).toEqual({ result: 'weak-password' });
            expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
            expect(console.error).toBeCalledWith(new FirebaseError(AUTH_WEAK_PASSWORD, ''));
        });

        it(AUTH_OPERATION_NOT_ALLOWED, async () => {
            jest.spyOn(console, 'error').mockImplementation();
            createUserWithEmailAndPassword.mockRejectedValue(new FirebaseError(AUTH_OPERATION_NOT_ALLOWED, ''));
            const result = await signup('ben@example.com', 'fred', { firstName: 'ben', lastName: 'neb' });
            expect(result).toEqual({ result: 'accounts-not-enabled' });
            expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
            expect(console.error).toBeCalledWith(new FirebaseError(AUTH_OPERATION_NOT_ALLOWED, ''));
        });

        it(AUTH_EMAIL_ALREADY_IN_USE, async () => {
            jest.spyOn(console, 'error').mockImplementation();
            createUserWithEmailAndPassword.mockRejectedValue(new FirebaseError(AUTH_EMAIL_ALREADY_IN_USE, ''));
            const result = await signup('ben@example.com', 'fred', { firstName: 'ben', lastName: 'neb' });
            expect(result).toEqual({ result: 'email-in-use' });
            expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
            expect(console.error).toBeCalledWith(new FirebaseError(AUTH_EMAIL_ALREADY_IN_USE, ''));
        });

        it(AUTH_INVALID_EMAIL, async () => {
            jest.spyOn(console, 'error').mockImplementation();
            createUserWithEmailAndPassword.mockRejectedValue(new FirebaseError(AUTH_INVALID_EMAIL, ''));
            const result = await signup('ben@example.com', 'fred', { firstName: 'ben', lastName: 'neb' });
            expect(result).toEqual({ result: 'invalid-email' });
            expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
            expect(console.error).toBeCalledWith(new FirebaseError(AUTH_INVALID_EMAIL, ''));
        });
    });

    it('Handles an unexpected result from Firebase', async () => {
        jest.spyOn(console, 'error').mockImplementation();
        createUserWithEmailAndPassword.mockRejectedValue(new FirebaseError('auth/something-unencountered', 'Cosmic Radiation'));
        const result = await signup('ben@example.com', 'fred', { firstName: 'ben', lastName: 'neb' });
        expect(result).toEqual({ result: 'fail', message: 'Cosmic Radiation' });
        expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
        expect(console.error).toBeCalledWith(new FirebaseError('auth/something-unencountered', 'Cosmic Radiation'));
    });

    it('Handles an unexpected error entirely', async () => {
        jest.spyOn(console, 'error').mockImplementation();
        createUserWithEmailAndPassword.mockRejectedValue('xyz');
        const result = await signup('ben@example.com', 'fred', { firstName: 'ben', lastName: 'neb' });
        expect(result).toEqual({ result: 'fail', message: '' });
        expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
        expect(console.error).toBeCalledWith('xyz');
    });
});