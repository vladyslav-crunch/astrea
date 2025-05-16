import {z} from 'zod';

export const createTopicSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    icon: z.string().min(1, 'Icon is required'),
    color: z.string().min(1, 'Color is required'),
});

export const updateTopicSchema = z.object({
    title: z.string().optional(),
    color: z.string().optional(),
    icon: z.string().optional(),
});

export type UpdateTopicInput = z.infer<typeof updateTopicSchema>;