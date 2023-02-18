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
        if (result.result !== 'success')
            fail("Expect success");
        expect(result.uid).toBe('123');
        expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred1234!');
    });

    it('Handles a weak password result from Firebase', async () => {        
        createUserWithEmailAndPassword.mockRejectedValue(new FirebaseError('auth/weak-password', 'Weak PW'));
        const result = await signup('ben@example.com', 'fred');
        expect(result.result).toBe('weak-password');
        expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred');
    });
});