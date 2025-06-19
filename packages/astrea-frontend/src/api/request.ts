import {refreshSession} from "./auth.ts";

export async function request<T>(url: string, options: RequestInit, auth: boolean = false): Promise<T> {
    let headers = options.headers || {};

    if (auth) {
        let accessToken = localStorage.getItem('accessToken');
        const expiresAt = parseInt(localStorage.getItem('accessTokenExpiresAt') || '0', 10);
        const now = Date.now();

        if (expiresAt && expiresAt < now) {
            try {
                const refreshResponse = await refreshSession();
                accessToken = refreshResponse.accessToken;
                localStorage.setItem('accessToken', accessToken);
            } catch {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('accessTokenExpiresAt');
                throw new Error('Session expired. Please log in again.');
            }
        }
        headers = {
            ...headers,
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        };
    }

    const res = await fetch(url, {
        ...options,
        headers,
    });

    let data;
    try {
        data = await res.json();
    } catch {
        data = {};
    }

    if (!res.ok) {
        throw new Error(data?.message || 'Something went wrong');
    }

    return data as T;
}