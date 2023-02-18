import signup from '@/backend/Signup';
import * as dep from 'firebase/auth';
import { UserCredential } from 'firebase/auth';

const createUserWithEmailAndPassword = jest.fn();
jest.mock<Partial<typeof dep>>('firebase/auth',
    () => ({
        createUserWithEmailAndPassword: (...args) => createUserWithEmailAndPassword(...args)
    }));

   
describe('Signup Function', () => {
    it('Works with successful signup', async () => {
        const mockCredentials = { user: { uid: "123" } } as any as UserCredential;
        createUserWithEmailAndPassword.mockReturnValue(mockCredentials);
        const result = await signup('ben@example.com', 'fred1234!');
        if (result.result !== 'success')
            fail("Expect success");
        expect(result.uid).toBe('123');
        expect(createUserWithEmailAndPassword).toBeCalledWith(undefined, 'ben@example.com', 'fred1234!');
    });
});