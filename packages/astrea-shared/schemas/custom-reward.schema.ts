import { z } from "zod";

export const createCustomRewardSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  coins: z.number().min(1, "Coins must be at least 1"),
});

export const updateCustomRewardSchema = z.object({
  rewardId: z.string().min(1, "Reward ID is required"),
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  coins: z.number().min(1, "Coins must be at least 1"),
});

export const claimCustomRewardSchema = z.object({
  rewardId: z.string().min(1, "Reward ID is required"),
});
