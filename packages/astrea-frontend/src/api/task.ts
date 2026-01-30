import { request } from "./request";
import type { Task } from "astrea-shared/types/task.type";
import type { CreateTaskInput, UpdateTaskInput } from "astrea-shared";

/* ---------- BASE ---------- */

const BASE_URL = "/api/tasks";

/* ---------- CREATE ---------- */

export async function createTask(body: CreateTaskInput) {
  return await request<{ message: string; task: Task }>(
    BASE_URL,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    true,
  );
}

/* ---------- READ ---------- */

export async function getTasks() {
  return await request<{ tasks: Task[] }>(BASE_URL, { method: "GET" }, true);
}

export async function getTaskById(taskId: string) {
  return await request<{ task: Task }>(
    `${BASE_URL}/${taskId}`,
    { method: "GET" },
    true,
  );
}

export async function getTasksByTopic(topicId: string) {
  return await request<{ tasks: Task[] }>(
    `${BASE_URL}/topic/${topicId}`,
    { method: "GET" },
    true,
  );
}

export async function getTasksByGoal(goalId: string) {
  return await request<{ tasks: Task[] }>(
    `${BASE_URL}/goal/${goalId}`,
    { method: "GET" },
    true,
  );
}

/* ---------- UPDATE ---------- */

export async function updateTask(taskId: string, body: UpdateTaskInput) {
  return await request<{
    message: string;
    task: Task;
    reward: {
      type: "granted" | "revoked";
      exp: number;
      coins: number;
      levelChange: number;
    } | null;
  }>(
    `${BASE_URL}/${taskId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    true,
  );
}

/* ---------- DELETE ---------- */

export async function deleteTask(taskId: string) {
  return await request<{ message: string }>(
    `${BASE_URL}/${taskId}`,
    { method: "DELETE" },
    true,
  );
}

/* ---------- REORDER ---------- */
export type TaskOrderUpdate = { _id: string; order: number };

export async function reorderTasks(updates: TaskOrderUpdate[]) {
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
