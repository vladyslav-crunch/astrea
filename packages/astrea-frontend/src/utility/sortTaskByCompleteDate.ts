import { Task } from "astrea-shared/types/task.type.ts";

export function sortTaskByCompleteDate(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    if (!a.completedAt && !b.completedAt) return 0;
    if (!a.completedAt) return 1;
    if (!b.completedAt) return -1;
    return (
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
  });
}
