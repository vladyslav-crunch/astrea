import type { Response } from "express";
import * as GoalService from "../services/goal.service";
import * as TopicService from "../services/topic.service";
import type { AuthRequest } from "../middleware/isAuthenticated";
import { createGoalSchema, updateGoalSchema } from "astrea-shared";
import mongoose from "mongoose";

export const createGoal = async (req: AuthRequest, res: Response) => {
  const topicId = req.params.topicId;
  if (!topicId) {
    res.status(400).json({ message: "Missing topicId in URL" });
    return;
  }

  // Merge topicId from params into body for validation
  const parsed = createGoalSchema.safeParse({
    ...req.body,
    topicId,
  });

  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid input",
      errors: parsed.error.flatten(),
    });
    return;
  }

  try {
    const goal = await GoalService.create(req.user!.id, topicId, parsed.data);
    res.status(201).json({ message: "Goal created", goal });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getGoals = async (req: AuthRequest, res: Response) => {
  try {
    const goals = await GoalService.getAll(req.user!.id);
    res.json({ goals });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getGoal = async (req: AuthRequest, res: Response) => {
  const goalId = req.params.id;
  if (!goalId) {
    res.status(400).json({ message: "Missing goal ID in request URL" });
    return;
  }
  try {
    const goal = await GoalService.getById(req.user!.id, goalId);
    if (!goal) {
      res.status(404).json({ message: "Goal not found" });
      return;
    }
    res.json(goal);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateGoal = async (req: AuthRequest, res: Response) => {
  const parsed = updateGoalSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.flatten() });
    return;
  }

  const goalId = req.params.id;
  if (!goalId) {
    res.status(400).json({ message: "Missing Goal ID in request URL" });
    return;
  }
  try {
    const updated = await GoalService.update(req.user!.id, goalId, parsed.data);
    if (!updated) {
      res.status(404).json({ message: "Goal not found" });
      return;
    }
    res.json({ message: "Goal updated", goal: updated });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteGoal = async (req: AuthRequest, res: Response) => {
  const goalId = req.params.id;
  if (!goalId) {
    res.status(400).json({ message: "Missing Goal ID in request URL" });
    return;
  }
  try {
    const deleted = await GoalService.remove(req.user!.id, goalId);
    if (!deleted) {
      res.status(404).json({ message: "Goal not found" });
      return;
    }
    res.json({ message: "Goal deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getGoalsByTopic = async (req: AuthRequest, res: Response) => {
  const topicId = req.params.topicId;
  if (!topicId) {
    res.status(400).json({ message: "Missing topic ID in request URL" });
    return;
  }

  try {
    const goals = await GoalService.getByTopic(req.user!.id, topicId);
    res.status(200).json({ goals });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getGoalsByTopicWithStats = async (
  req: AuthRequest,
  res: Response,
) => {
  const topicId = req.params.topicId;

  if (!topicId) {
    res.status(400).json({ message: "Missing topic ID in request URL" });
    return;
  }

  // Check for valid ObjectId format BEFORE querying
  if (!mongoose.Types.ObjectId.isValid(topicId)) {
    res.status(400).json({ message: "Invalid topic ID format" });
    return;
  }

  try {
    const topic = await TopicService.getById(req.user!.id, topicId);
    if (!topic) {
      res.status(404).json({ message: "Topic not found" });
      return;
    }

    const goals = await GoalService.getByTopicWithStats(req.user!.id, topicId);
    res.status(200).json({ goals });
    return;
  } catch (err: any) {
    console.error("Error getting goals by topic:", err);
    res.status(500).json({ message: err.message });
    return;
  }
};

export const reorderGoals = async (req: AuthRequest, res: Response) => {
  const updates: { _id: string; order: number }[] = req.body;

  if (!Array.isArray(updates)) {
    res.status(400).json({ message: "Invalid input format" });
    return;
  }

  try {
    await GoalService.reorder(req.user!.id, updates);
    res.status(200).json({ message: "Goal order updated" });
    return;
  } catch (err: any) {
    console.error("Error reordering goals:", err);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export const getDefaultGoal = async (req: AuthRequest, res: Response) => {
  const topicId = req.params.topicId;

  if (!topicId) {
    res.status(400).json({ message: "Missing topic ID in request URL" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(topicId)) {
    res.status(400).json({ message: "Invalid topic ID format" });
    return;
  }

  try {
    const defaultGoal = await GoalService.getDefault(req.user!.id, topicId);

    if (!defaultGoal) {
      res.status(404).json({ message: "Default goal not found" });
      return;
    }

    res.status(200).json({ goal: defaultGoal });
  } catch (err: any) {
    console.error("Error fetching default goal:", err);
    res.status(500).json({ message: "Server error" });
  }
};
