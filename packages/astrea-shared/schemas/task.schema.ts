import { z } from "zod";

export const difficultyEnum = z.enum(["easy", "medium", "hard", "epic"]);
export const statusEnum = z.enum(["upcoming", "in_progress", "done"]);

export const microtaskSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().default(false),
  order: z.number(),
});

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  difficulty: difficultyEnum,
  topicId: z.string(),
  goalId: z.string(),
  dueDate: z.string().datetime().optional(),
  status: statusEnum,
  order: z.number().optional(),
  microtasks: z.array(microtaskSchema).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  difficulty: difficultyEnum.optional(),
  topicId: z.string().optional(),
  goalId: z.string().optional(),
  dueDate: z.string().datetime().nullable().optional(),
  status: statusEnum.optional(),
  order: z.number().optional(),

  microtasks: z
    .array(
      z.object({
        title: z.string().min(1),
        completed: z.boolean(),
        order: z.number(),
      }),
    )
    .optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
