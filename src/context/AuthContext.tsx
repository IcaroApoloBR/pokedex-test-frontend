import { useState, useEffect } from 'react';
import {
    storageAuthTokenGet,
    storageAuthTokenSave,
    storageAuthTokenRemove
} from '../storage/storageAuthToken';

export function useAuth() {
    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = storageAuthTokenGet();
        if (storedToken) {
            setAuthToken(storedToken);
        }
    }, []);

    const signIn = (token: string) => {
        storageAuthTokenSave(token);
        setAuthToken(token);
    };

    const logout = () => {
        storageAuthTokenRemove();
        setAuthToken(null);
    };

    return { authToken, signIn, logout };
}
