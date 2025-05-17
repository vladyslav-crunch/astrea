// task.schema.ts
import {z} from 'zod';

export const difficultyEnum = z.enum(['easy', 'medium', 'hard']);

export const createTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    difficulty: difficultyEnum,
    topicId: z.string(),
    goalId: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    microtasks: z.array(z.string()).optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
