import {z} from 'zod';

export const createTopicSchema = z.object({
    title: z.string().min(1, "Title is required").max(25, "Topic title max is 25 characters"),
    icon: z.string().emoji("Invalid emoji"),
    color: z.string().startsWith("#").length(7, "Invalid color format")
}).strict();

export const updateTopicSchema = z.object({
    title: z.string().optional(),
    color: z.string().optional(),
    icon: z.string().optional(),
}).strict();

export type UpdateTopicInput = z.infer<typeof updateTopicSchema>;