import { User } from "../types/User";

const USER_STORAGE_KEY = 'user';

export function storageUserSave(user: User) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function storageUserGet(): null | User {
    const storage = localStorage.getItem(USER_STORAGE_KEY);

    if (storage) {
        return JSON.parse(storage);
    }

    return null;
}

export function storageUserRefresh(updatedUser: Partial<User>) {
    const currentUser = storageUserGet();

    if (currentUser) {
        const refreshedUser: User = { ...currentUser, ...updatedUser };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(refreshedUser));
    }
}

export function storageUserRemove() {
    localStorage.removeItem(USER_STORAGE_KEY);
}