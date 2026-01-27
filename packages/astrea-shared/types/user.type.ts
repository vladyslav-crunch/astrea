export type User = {
  username: string;
  password: string;
  profilePic?: string;
  email: string;
  level?: number;
  exp?: number;
  coins?: number;
};

export type PublicUser = Omit<User, "password" | "email">;
