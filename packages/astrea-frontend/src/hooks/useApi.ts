// hooks/useApi.ts
import {useCallback} from "react";

export function useApi() {
    const fetchWithAuth = useCallback(async <T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> => {
        const accessToken = localStorage.getItem("accessToken");

        const fetchWithToken = async (): Promise<Response> => {
            return fetch(url, {
                ...options,
                headers: {
                    ...(options.headers || {}),
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
        };

        let res = await fetchWithToken();

        if (res.status === 401) {
            // Try refreshing access token
            const refreshRes = await fetch("/api/auth/refresh", {
                method: "POST",
                credentials: "include", // send cookies
            });

            if (refreshRes.ok) {
                const data = await refreshRes.json();
                localStorage.setItem("accessToken", data.accessToken);

                // Retry original request with new token
                res = await fetchWithToken();
            } else {
                throw new Error("Session expired. Please sign in again.");
            }
        }

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "API request failed");
        }

        return res.json();
    }, []);

    return {fetchWithAuth};
}
