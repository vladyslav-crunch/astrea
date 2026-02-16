import { Task } from "astrea-shared/types/task.type";
import styles from "./done-tasks-sheet.module.css";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/common/sheet.tsx";
import DoneTaskSheetItem from "@/components/goal/goal-kanban/done-tasks-sheet/done-task-sheet-item/done-task-sheet-item.tsx";
import { Archive } from "lucide-react";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTask.ts";
import { toast } from "sonner";
import { handleReward } from "@/utility/handleReward.ts";

interface Props {
  tasks: Task[];
  topicId: string;
  goalId: string;
}

function DoneTasksSheet({ tasks, topicId, goalId }: Props) {
  const [open, setOpen] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const { mutate: deleteTask } = useDeleteTask(topicId, goalId);
  const { mutate: updateTask } = useUpdateTask(topicId, goalId);

  // Sort tasks by completedAt (most recent first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.completedAt && !b.completedAt) return 0;
    if (!a.completedAt) return 1;
    if (!b.completedAt) return -1;
    return (
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
  });

  const handleDelete = (taskId: string) => {
    deleteTask(taskId, {
      onSuccess: () => {
        toast.success("Task deleted successfully.");
        setActiveTaskId(null);
      },
      onError: (err) => {
        console.error("Delete failed:", err);
        toast.error("Failed to delete task.");
      },
    });
  };

  const handleRestore = (taskId: string) => {
    updateTask(
      { taskId, body: { status: "upcoming", order: 0 } },
      {
        onSuccess: (res) => {
          setActiveTaskId(null);

          if (res.reward) {
            handleReward(res.reward);
          }
        },
        onError: (err) => {
          console.error("Restore failed:", err);
          toast.error("Failed to restore task.");
        },
      },
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {sortedTasks.length > 3 && (
        <SheetTrigger asChild>
          <p className={styles.showAll} onClick={() => setOpen(true)}>
            Show all completed tasks
          </p>
        </SheetTrigger>
      )}

      <SheetContent
        side="right"
        className="w-[420px] overflow-y-auto px-6 gap-0"
      >
        <SheetHeader className={"py-4 px-0  "}>
          <SheetTitle className={"text-2xl flex items-center gap-3"}>
            <Archive size={30} /> Archived
          </SheetTitle>
          <SheetDescription className={"text-red-400"}>
            Archived tasks are retained for 30 days, after which they are
            permanently deleted.
          </SheetDescription>
        </SheetHeader>

        <div className="mb-4 space-y-2">
          {sortedTasks.map((task) => (
            <DoneTaskSheetItem
              key={task._id}
              task={task}
              isActive={activeTaskId === task._id}
              onClick={() =>
                setActiveTaskId((prev) => (prev === task._id ? null : task._id))
              }
              onRestore={() => handleRestore(task._id)}
              onDelete={() => handleDelete(task._id)}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default DoneTasksSheet;
