import { z } from "zod";

export const modifierSchema = z.object({
  easy: z.number().min(0.1).default(1),
  medium: z.number().min(0.1).default(1),
  hard: z.number().min(0.1).default(1),
  epic: z.number().min(0.1).default(1),
});

export const createGoalSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    topicId: z.string(),
    modifier: modifierSchema.default({
      easy: 1,
      medium: 1,
      hard: 1,
      epic: 1,
    }),
  })
  .strict();

export type CreateGoalInput = z.infer<typeof createGoalSchema>;

export const updateGoalSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    topicId: z.string(),
    modifier: z
      .object({
        easy: z.number().optional(),
        medium: z.number().optional(),
        hard: z.number().optional(),
        epic: z.number().optional(),
      })
      .optional(),
  })
  .strict();

export type UpdateGoalInput = z.infer<typeof updateGoalSchema>;
