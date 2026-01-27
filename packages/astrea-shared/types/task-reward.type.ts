import type { TaskDifficulty, TaskStatus } from "./task.type.ts";

export type TaskForReward = {
  _id: string;
  goalId?: string;
  difficulty: TaskDifficulty;
  status: TaskStatus;
};
