import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  getTasksByGoal,
  getTasksByTopic,
  reorderTasks,
  TaskOrderUpdate,
  updateTask,
} from "../api/task";

import type { CreateTaskInput, UpdateTaskInput } from "astrea-shared";

/* ---------- GET ALL TASKS ---------- */

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    select: (data) => data.tasks,
    retry: false,
  });
}

/* ---------- GET TASK BY ID ---------- */

export function useTask(taskId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId),
    select: (data) => data.task,
    enabled: !!taskId && (options?.enabled ?? true),
  });
}

/* ---------- GET TASKS BY TOPIC ---------- */

export function useTasksByTopic(
  topicId: string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: ["tasks", "topic", topicId],
    queryFn: () => getTasksByTopic(topicId),
    select: (data) => data.tasks,
    enabled: !!topicId && (options?.enabled ?? true),
    retry: false,
  });
}

/* ---------- GET TASKS BY GOAL ---------- */

export function useTasksByGoal(
  goalId: string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: ["tasks", "goal", goalId],
    queryFn: () => getTasksByGoal(goalId),
    select: (data) => data.tasks,
    enabled: !!goalId && (options?.enabled ?? true),
    retry: false,
  });
}

/* ---------- CREATE TASK ---------- */

export function useCreateTask(topicId?: string, goalId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      body: Omit<
        CreateTaskInput,
        "topicId" | "goalId" | "status" | "difficulty"
      >,
    ) => {
      return await createTask({
        ...body,
        topicId: topicId!,
        goalId: goalId!,
        status: "upcoming",
        difficulty: "easy",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      if (topicId) {
        queryClient.invalidateQueries({
          queryKey: ["tasks", "topic", topicId],
        });
      }

      if (goalId) {
        queryClient.invalidateQueries({
          queryKey: ["tasks", "goal", goalId],
        });
      }
    },
  });
}

/* ---------- UPDATE TASK ---------- */

export function useUpdateTask(topicId?: string, goalId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, body }: { taskId: string; body: UpdateTaskInput }) =>
      updateTask(taskId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["goals"] });

      if (topicId) {
        queryClient.invalidateQueries({
          queryKey: ["tasks", "topic", topicId],
        });
      }

      if (goalId) {
        queryClient.invalidateQueries({
          queryKey: ["tasks", "goal", goalId],
        });
      }
    },
  });
}

/* ---------- DELETE TASK ---------- */

export function useDeleteTask(topicId?: string, goalId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      if (topicId) {
        queryClient.invalidateQueries({
          queryKey: ["tasks", "topic", topicId],
        });
      }

      if (goalId) {
        queryClient.invalidateQueries({
          queryKey: ["tasks", "goal", goalId],
        });
        queryClient.invalidateQueries({
          queryKey: ["goals", topicId],
        });
      }
    },
  });
}

export function useReorderTasks(goalId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: TaskOrderUpdate[]) => reorderTasks(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "goal", goalId],
      });
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
      queryClient.invalidateQueries({
        queryKey: ["session"],
      });
    },
  });
}
