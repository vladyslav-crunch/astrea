import type { Response } from "express";
import type { AuthRequest } from "../middleware/isAuthenticated";
import * as TaskService from "../services/task.service";
import { createTaskSchema, updateTaskSchema } from "astrea-shared";

export const createTask = async (req: AuthRequest, res: Response) => {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.flatten() });
    return;
  }

  try {
    const task = await TaskService.create(req.user!.id, parsed.data);
    res.status(201).json({ message: "Task created", task });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await TaskService.getAll(req.user!.id);
  res.json({ tasks });
};

export const getTasksByTopic = async (req: AuthRequest, res: Response) => {
  const topicId = req.params.topicId;
  if (!topicId) {
    res.status(400).json({ message: "Missing topic ID in request URL" });
    return;
  }
  const tasks = await TaskService.getByTopic(req.user!.id, topicId);
  res.json({ tasks });
};

export const getTasksByGoal = async (req: AuthRequest, res: Response) => {
  const goalId = req.params.goalId;
  if (!goalId) {
    res.status(400).json({ message: "Missing goal ID in request URL" });
    return;
  }

  const tasks = await TaskService.getByGoal(req.user!.id, goalId);
  res.json({ tasks });
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const taskId = req.params.id;
  if (!taskId) {
    res.status(400).json({ message: "Missing task ID in request URL" });
    return;
  }

  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid input", errors: parsed.error.flatten() });
    return;
  }

  try {
    const result = await TaskService.update(req.user!.id, taskId, parsed.data);

    if (!result) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({
      message: "Task updated",
      task: result.task,
      reward: result.reward || null,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const taskId = req.params.id;
  if (!taskId) {
    res.status(400).json({ message: "Missing task ID in request URL" });
    return;
  }
  const deleted = await TaskService.remove(req.user!.id, taskId);
  if (!deleted) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.json({ message: "Task deleted" });
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  const taskId = req.params.id;

  if (!taskId) {
    {
      res.status(400).json({ message: "Task ID is required" });
      return;
    }
  }

  try {
    const task = await TaskService.getById(req.user!.id, taskId);
    if (!task) {
      {
        res.status(404).json({ message: "Task not found" });
        return;
      }
    }

    res.status(200).json({ task });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const reorderTasks = async (req: AuthRequest, res: Response) => {
  const updates = req.body;
  if (!Array.isArray(updates)) {
    res.status(400).json({ message: "Invalid payload" });
    return;
  }

  try {
    await TaskService.reorderTasks(req.user!.id, updates);
    res.json({ message: "Tasks reordered" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
