import { Task } from "astrea-shared/types/task.type.ts";
import { startOfDay } from "date-fns";

export const isTaskDueOrOverdue = (task: Task) => {
  if (!task.dueDate) return false;
  const taskDate = startOfDay(new Date(task.dueDate));
  const today = startOfDay(new Date());
  return taskDate <= today;
};

export const isTaskOverdue = (task: Task) => {
  if (!task.dueDate || task.status === "done") return false;
  const taskDate = startOfDay(new Date(task.dueDate));
  const today = startOfDay(new Date());
  return taskDate < today;
};
