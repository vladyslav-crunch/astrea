import {SignInFormFields, SignUpFormFields} from "astrea-shared";
import {request} from "./request";
import {PublicUser} from "astrea-shared";

type SignResponse = {
    accessToken: string;
    refreshToken: string;
    user: PublicUser
};

type RefreshResponse = {
    user: PublicUser;
    accessToken: string;
}

export async function signIn(formData: SignInFormFields): Promise<SignResponse> {
    return request("/api/auth/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
}

export async function signUp(formData: SignUpFormFields): Promise<SignResponse> {
    return request("/api/auth/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
}

export async function refreshSession(): Promise<RefreshResponse> {
    const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include", // Needed to send the refresh token cookie
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Session refresh failed");
    }

    localStorage.setItem("accessToken", data.accessToken);

    return data;
}
