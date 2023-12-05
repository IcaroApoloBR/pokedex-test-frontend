const AUTH_TOKEN_STORAGE_KEY = 'authToken';

export function storageAuthTokenSave(token: string) {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function storageAuthTokenGet(): string | null {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function storageAuthTokenRemove() {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}