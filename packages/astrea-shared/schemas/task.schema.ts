import {z} from 'zod';

export const difficultyEnum = z.enum(['easy', 'medium', 'hard']);
export const statusEnum = z.enum(['upcoming', 'in_progress', 'done']);


export const createTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    difficulty: difficultyEnum,
    topicId: z.string(),
    goalId: z.string(),
    dueDate: z.string().datetime().optional(),
    status: statusEnum,
    order: z.number().optional(),
    microtasks: z.array(z.string()).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = createTaskSchema.partial();

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;