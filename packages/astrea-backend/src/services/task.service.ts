// services/task.service.ts
import * as TaskDAO from "../daos/task.dao";
import type { z } from "zod";
import { createTaskSchema } from "astrea-shared";
import * as RewardService from "./reward.service.ts";
import type { TaskForReward } from "astrea-shared/types/task-reward.type.ts";

type TaskInput = z.infer<typeof createTaskSchema>;

function mapTaskToReward(task: any): TaskForReward {
  return {
    _id: task._id.toString(),
    goalId: task.goalId?.toString(),
    difficulty: task.difficulty,
    status: task.status,
  };
}

export const create = async (userId: string, data: TaskInput) => {
  const goalId = data.goalId || "";
  await TaskDAO.incrementOrdersByGoal(userId, goalId);
  return TaskDAO.createTask({
    ...data,
    userId,
    order: 0,
  });
};

export const getAll = (userId: string) => TaskDAO.getUserTasks(userId);

export const getByTopic = (userId: string, topicId: string) =>
  TaskDAO.getTasksByTopic(userId, topicId);

export const getByGoal = (userId: string, goalId: string) =>
  TaskDAO.getTasksByGoal(userId, goalId);

export const getById = (userId: string, id: string) =>
  TaskDAO.getTaskById(userId, id);

export const update = async (userId: string, taskId: string, updates: any) => {
  // 1️⃣ Load task BEFORE update
  const existingTask = await TaskDAO.getTaskById(userId, taskId);
  if (!existingTask) return null;

  const prevStatus = existingTask.status;

  // Handle completedAt timestamp
  const updatesToApply = { ...updates };
  if (updates.status === "done" && prevStatus !== "done") {
    // Task is being completed
    updatesToApply.completedAt = new Date();
  } else if (
    updates.status &&
    updates.status !== "done" &&
    prevStatus === "done"
  ) {
    // Task is being uncompleted
    updatesToApply.completedAt = null;
  }

  // 2️⃣ Update task
  const updatedTask = await TaskDAO.updateTask(userId, taskId, updatesToApply);

  if (!updatedTask) return null;

  const nextStatus = updatedTask.status;

  // 3️⃣ Handle status transition
  let reward = null;

  if (prevStatus !== nextStatus) {
    reward = await RewardService.handleTaskStatusChange({
      userId,
      task: mapTaskToReward(updatedTask),
      from: prevStatus,
      to: nextStatus,
    });
  }

  return {
    task: updatedTask,
    reward,
  };
};

export const reorderTasks = (
  userId: string,
  updates: { _id: string; order: number }[],
) => TaskDAO.bulkReorderTasks(userId, updates);

export const remove = (userId: string, id: string) =>
  TaskDAO.deleteTask(userId, id);
