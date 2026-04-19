const AUTH_STORAGE_KEY = "workfolio_auth";
const AUTH_TTL_MS = 3 * 24 * 60 * 60 * 1000;

export function saveAuth(authData) {
    const payload = {
        ...authData,
        expiresAt: Date.now() + AUTH_TTL_MS,
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
}

export function getAuth() {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
        return null;
    }

    try {
        const parsed = JSON.parse(raw);
        if (!parsed.expiresAt || Date.now() > parsed.expiresAt) {
            clearAuth();
            return null;
        }
        return parsed;
    } catch (error) {
        clearAuth();
        return null;
    }
}

export function clearAuth() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isAuthenticated() {
    return Boolean(getAuth());
}

export function isAdmin() {
    const auth = getAuth();
    return auth?.role === "ADMIN";
}

export function getAuthHeader() {
    const auth = getAuth();
    if (!auth?.basicToken) {
        return {};
    }

    return {
        Authorization: `Basic ${auth.basicToken}`,
    };
}
