import { Backend } from '@/backend/Backend';

const signOut = jest.fn();
const logout = new Backend().logout;

jest.mock('firebase/auth',
    () => ({
        signOut: (...args: any[]) => signOut(...args)
    }));

describe('Logout Function', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    it('Works with successful logout', async () => {
        signOut.mockResolvedValue(undefined);
        const result = await logout();
        expect(result.result).toBe('success');
        expect(signOut).toBeCalled();
    });

    it('Handles an unexpected error entirely', async () => {
        signOut.mockRejectedValue('xyz');
        const result = await logout();
        expect(result.result).toBe('fail');
        expect(signOut).toBeCalled();
    });
});