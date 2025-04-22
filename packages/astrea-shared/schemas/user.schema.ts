import {z} from "zod";

export const userZodSchema = z.object({
    username:     z.string().min(3).max(20),
    password:     z.string().min(6).max(20),
    profilePic:   z.string(),
    email:        z.string().email(),
    level:        z.number().int().nonnegative().default(1),
    exp:          z.number().int().nonnegative().default(0),
}).strict();

// derive a TS type
export type User = z.infer<typeof userZodSchema>;