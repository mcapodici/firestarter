import signup from '@/backend/Signup';
import * as dep from 'firebase/auth';
import { UserCredential } from 'firebase/auth';

let mockCredentials = {} as any as UserCredential;
jest.mock<Partial<typeof dep>>('firebase/auth',
    () => ({
        createUserWithEmailAndPassword: () => Promise.resolve(mockCredentials)
    }));
    
describe('Signup Function', () => {
    it('Works with successful signup', async () => {
        mockCredentials = { user: { uid: "123" } } as any as UserCredential;
        const result = await signup('ben@example.com', 'fred1234!');
        if (result.result !== 'success')
            fail("Expect success");
        expect(result.uid).toBe('123');
    });
});