export type User = {
  username: string;
  password: string;
  profilePic?: string;
  email: string;
  level?: number;
  exp?: number;
  coins?: number;
  inventory?: string[]; // Array of shop item IDs
  border?: string; // Currently equipped border ID
  title?: string; // Currently equipped title ID
};

export type PublicUser = Omit<User, "password" | "email">;
