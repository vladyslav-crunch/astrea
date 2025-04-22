import type {User} from "astrea-shared/types";

export interface IUser extends User {
    comparePassword(candidatePassword: string): Promise<boolean>;
}