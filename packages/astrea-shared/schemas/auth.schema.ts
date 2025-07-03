import {z} from 'zod';

// Login Schema


export const signInSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    password: z.string().nonempty("Password is required"),
});

export type SignInFormFields = z.infer<typeof signInSchema>

export const signUpSchema = signInSchema.extend({
    username: z.string().nonempty("Username is required").min(3, "Username must be at least 3 characters"),
    repeatPassword: z.string().nonempty("Repeat password is required").min(6),
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ['repeatPassword'],
});

export type SignUpFormFields = z.infer<typeof signUpSchema>

