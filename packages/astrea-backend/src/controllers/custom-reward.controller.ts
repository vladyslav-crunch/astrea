import type { Response } from "express";
import type { AuthRequest } from "../middleware/isAuthenticated";
import * as CustomRewardService from "../services/custom-reward.service";
import {
  createCustomRewardSchema,
  updateCustomRewardSchema,
  claimCustomRewardSchema,
} from "astrea-shared";

export const getUserCustomRewards = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const rewards = await CustomRewardService.getUserCustomRewards(userId);
    res.status(200).json({ rewards });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createCustomReward = async (req: AuthRequest, res: Response) => {
  const parsed = createCustomRewardSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.flatten() });
    return;
  }

  try {
    const userId = req.user!.id;
    const reward = await CustomRewardService.createCustomReward(
      userId,
      parsed.data.title,
      parsed.data.coins,
      parsed.data.description,
    );
    res.status(201).json({
      message: "Custom reward created successfully",
      reward,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCustomReward = async (req: AuthRequest, res: Response) => {
  const parsed = updateCustomRewardSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.flatten() });
    return;
  }

  try {
    const userId = req.user!.id;
    const reward = await CustomRewardService.updateCustomReward(
      userId,
      parsed.data.rewardId,
      parsed.data.title,
      parsed.data.coins,
      parsed.data.description,
    );
    res.status(200).json({
      message: "Reward updated successfully",
      reward,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const claimCustomReward = async (req: AuthRequest, res: Response) => {
  const parsed = claimCustomRewardSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.flatten() });
    return;
  }

  try {
    const userId = req.user!.id;
    const result = await CustomRewardService.claimCustomReward(
      userId,
      parsed.data.rewardId,
    );
    res.status(200).json({
      message: `Claimed "${result.reward.title}" for ${result.reward.coins} coins!`,
      user: result.user,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCustomReward = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { rewardId } = req.params;

    if (!rewardId) {
      res.status(400).json({ message: "Reward ID is required" });
      return;
    }

    await CustomRewardService.deleteCustomReward(userId, rewardId);
    res.status(200).json({ message: "Reward deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
