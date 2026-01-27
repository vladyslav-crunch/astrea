import { request } from "./request.ts";
import { Goal, GoalWithStats } from "astrea-shared/types/goal.type.ts";

const BASE_URL = "/api/goals";

export type CreateGoalInput = {
  title: string;
  description?: string;
  modifier?: {
    easy?: number;
    medium?: number;
    hard?: number;
  };
};

export async function createGoal(topicId: string, body: CreateGoalInput) {
  return await request<{ message: string; goal: Goal }>(
    `${BASE_URL}/topic/${topicId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    true,
  );
}

export async function getGoalsByTopic(topicId: string) {
  return await request<{ goals: GoalWithStats[] }>(
    `${BASE_URL}/topic/${topicId}`,
    {
      method: "GET",
    },
    true,
  );
}

export async function getGoalById(goalId: string) {
  return await request<{ goal: Goal }>(
    `${BASE_URL}/${goalId}`,
    {
      method: "GET",
    },
    true,
  );
}

export async function updateGoal(
  goalId: string,
  body: Partial<CreateGoalInput>,
) {
  return await request<{ message: string; goal: Goal }>(
    `${BASE_URL}/${goalId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    true,
  );
}

export async function deleteGoal(goalId: string) {
  return await request<{ message: string }>(
    `${BASE_URL}/${goalId}`,
    {
      method: "DELETE",
    },
    true,
  );
}

export async function reorderGoals(updates: { _id: string; order: number }[]) {
  return await request<{ message: string }>(
    `${BASE_URL}/reorder`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    },
    true,
  );
}

export async function getDraftGoal(topicId: string) {
  return await request<{ goal: Goal }>(
    `${BASE_URL}/topic/${topicId}/drafts`,
    {
      method: "GET",
    },
    true,
  );
}
