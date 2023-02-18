import signup from '@/backend/Signup';
import { FirebaseError } from '@firebase/util';
import * as dep from 'firebase/auth';
import { UserCredential } from 'firebase/auth';

const createUserWithEmailAndPassword = jest.fn();
jest.mock<Partial<typeof dep>>('firebase/auth',
    () => ({
        createUserWithEmailAndPassword: (...args) => createUserWithEmailAndPassword(...args)
    }));


describe('Signup Function', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    it('Works with successful signup', async () => {
        const mockCredentials = { user: { uid: "123" } } as any as UserCredential;
        createUserWithEmailAndPassword.mockResolvedValue(mockCredentials);
        const result = await signup('ben@example.com', 'fred1234!');
        expect(result).toEqual({ result: 'success', uid: '123' });
        expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred1234!');
    });

    it('Handles a weak password result from Firebase', async () => {
        createUserWithEmailAndPassword.mockRejectedValue(new FirebaseError('auth/weak-password', 'Weak PW'));
        const result = await signup('ben@example.com', 'fred');
        expect(result).toEqual({ result: 'weak-password' });
        expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
    });

    it('Handles an unexpected result from Firebase', async () => {
        createUserWithEmailAndPassword.mockRejectedValue(new FirebaseError('auth/something-unencountered', 'Cosmic Radiation'));
        const result = await signup('ben@example.com', 'fred');
        expect(result).toEqual({ result: 'fail', message: 'Cosmic Radiation' });
        expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
    });

    it('Handles an unexpected error entirely', async () => {
        createUserWithEmailAndPassword.mockRejectedValue('xyz');
        const result = await signup('ben@example.com', 'fred');
        expect(result).toEqual({ result: 'fail', message: '' });
        expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
    });
});