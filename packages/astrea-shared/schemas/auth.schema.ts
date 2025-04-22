import {z} from 'zod';

// Login Schema
export const signInSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Register Schema (extends login but includes email & password confirmation)
export const signUpSchema = signInSchema.extend({
    username: z.string().min(3, "Username must be at least 3 characters"),
    repeatPassword: z.string().min(6),
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ['repeatPassword'], // the error will be attached to repeatPassword
});
