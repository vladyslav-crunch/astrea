// task.schema.ts
import {z} from 'zod';

export const difficultyEnum = z.enum(['easy', 'medium', 'hard']);
export const statusEnum = z.enum(['upcoming', 'in_progress', 'done']);


export const createTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    difficulty: difficultyEnum,
    topicId: z.string(),
    goalId: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    status: statusEnum.optional(),
    microtasks: z.array(z.string()).optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
