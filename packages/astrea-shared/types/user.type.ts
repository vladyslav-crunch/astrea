export type User = {
    username: string;
    password: string;
    profilePic?: string;
    email: string;
    level?: number;
    exp?: number;
};

export type PublicUser = Omit<User, "password" | "email">;