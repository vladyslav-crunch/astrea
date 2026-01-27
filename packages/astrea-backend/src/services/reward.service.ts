import * as GoalDAO from "../daos/goal.dao";
import * as UserDAO from "../daos/user.dao";
import { calculateTaskReward } from "./reward.calculator";
import type { TaskStatus } from "astrea-shared/types/task.type.ts";
import type { TaskForReward } from "astrea-shared/types/task-reward.type.ts";

export const handleTaskStatusChange = async ({
  userId,
  task,
  from,
  to,
}: {
  userId: string;
  task: TaskForReward;
  from: TaskStatus;
  to: TaskStatus;
}) => {
  if (from === to) return null;

  if (from !== "done" && to === "done") {
    return grantReward(userId, task);
  }

  if (from === "done" && to !== "done") {
    return revokeReward(userId, task);
  }

  return null;
};

async function grantReward(userId: string, task: TaskForReward) {
  const goal = task.goalId
    ? await GoalDAO.getGoalById(userId, task.goalId)
    : null;

  const modifier = goal?.modifier?.[task.difficulty] ?? 1;

  const reward = calculateTaskReward(task.difficulty, modifier);

  await UserDAO.incrementRewards(userId, reward);

  return { type: "granted", ...reward };
}

async function revokeReward(userId: string, task: TaskForReward) {
  const goal = task.goalId
    ? await GoalDAO.getGoalById(userId, task.goalId)
    : null;

  const modifier = goal?.modifier?.[task.difficulty] ?? 1;

  const reward = calculateTaskReward(task.difficulty, modifier);

  await UserDAO.incrementRewards(userId, {
    exp: -reward.exp,
    coins: -reward.coins,
  });

  return { type: "revoked", ...reward };
}
