import type {User} from "astrea-shared";

export interface IUser extends User {
    comparePassword(candidatePassword: string): Promise<boolean>;
}