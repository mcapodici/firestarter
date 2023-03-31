import { auth } from '@/firebase/init';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useMemo, useState } from 'react';

/** General response from a hook where the result can be in a "loading" state. The
 * First element is the value, if obtained.
 * Second element indicates if we are in the loading state.
 * Third element is the error, if thrown.
 */
export declare type LoadingHook<T, E> = [T | undefined, boolean, E | undefined];

export type AuthStateHook = LoadingHook<User, Error>;

const useAuthState = (): AuthStateHook => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();
    const [value, setValue] = useState<User | undefined>();

    useEffect(() => {
        const listener = onAuthStateChanged(
            auth,
            async (user) => {
                setValue(user || undefined);
                setLoading(false);
            },
            setError
        );

        return () => {
            listener();
        };
    }, []);

    return useMemo<AuthStateHook>(() => [value, loading, error], [value, loading, error]);
};

export default useAuthState;