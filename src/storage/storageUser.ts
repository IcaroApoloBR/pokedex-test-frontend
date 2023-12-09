const USER_STORAGE_KEY = 'user';

export function storageUserSave(user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function storageUserGet(): null {
    const storage = localStorage.getItem(USER_STORAGE_KEY);

    if (storage) {
        return JSON.parse(storage);
    }

    return null;
}

export function storageUserRemove() {
    localStorage.removeItem(USER_STORAGE_KEY);
}