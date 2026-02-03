import { useCallback, useEffect, useState } from "react";
import { DragStartEvent, DragOverEvent, DragEndEvent } from "@dnd-kit/core";
import { Task } from "astrea-shared/types/task.type";
import { useReorderTasks, useUpdateTask } from "./useTask.ts";
import { debounce } from "lodash";
import { toast } from "sonner";
import { handleReward } from "../utility/handleReward.ts";

type UseKanbanDndProps = {
  initialTasks: Task[];
  goalId: string;
};

export function useKanbanDnd({ initialTasks, goalId }: UseKanbanDndProps) {
  const { mutate: reorderTasks } = useReorderTasks(goalId);
  const updateTaskMutation = useUpdateTask(undefined, goalId);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }

  const debouncedDragOver = useCallback(
    debounce((event: DragOverEvent) => {
      handleDragOver(event);
    }, 10),
    [],
  );

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!active || !over) return;
    if (active.id === over.id) return;

    setTasks((prevTasks) => {
      const activeTask = prevTasks.find((t) => t._id === active.id);
      if (!activeTask) return prevTasks;

      const isOverTask = over.data.current?.type === "Task";
      const isOverColumn = over.data.current?.type === "Column";

      if (isOverTask) {
        const overTask = prevTasks.find((t) => t._id === over.id);
        if (!overTask) return prevTasks;

        const newStatus = overTask.status;
        const isSameColumn = activeTask.status === newStatus;

        const columnTasks = prevTasks
          .filter((t) => t.status === newStatus)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        const activeIndex = columnTasks.findIndex((t) => t._id === active.id);
        const overIndex = columnTasks.findIndex((t) => t._id === over.id);
        if (overIndex === -1) return prevTasks;

        let insertIndex = overIndex;
        if (isSameColumn && activeIndex < overIndex) {
          insertIndex += 1;
        }

        const withoutActive = columnTasks.filter((t) => t._id !== active.id);

        const movedTask: Task = {
          ...activeTask,
          status: newStatus,
        };

        const reordered = [
          ...withoutActive.slice(0, insertIndex),
          movedTask,
          ...withoutActive.slice(insertIndex),
        ].map((t, index) => ({ ...t, order: index }));

        return prevTasks.map(
          (t) => reordered.find((r) => r._id === t._id) || t,
        );
      }

      if (isOverColumn) {
        const newStatus = over.id as Task["status"];
        if (activeTask.status === newStatus) return prevTasks;

        const columnTasks = prevTasks.filter((t) => t.status === newStatus);

        return prevTasks.map((t) =>
          t._id === active.id
            ? { ...t, status: newStatus, order: columnTasks.length }
            : t,
        );
      }

      return prevTasks;
    });
  }

  function onDragEnd(_: DragEndEvent) {
    if (!activeTask) return;

    const updates = tasks.map((t) => ({
      _id: t._id,
      order: t.order ?? 0,
    }));

    reorderTasks(updates, {
      onError: (error) => {
        console.error("Failed to reorder tasks:", error);
        toast.error("Failed to reorder tasks");
        setTasks(initialTasks);
      },
    });

    const movedTask = tasks.find((t) => t._id === activeTask._id);
    if (movedTask && movedTask.status !== activeTask.status) {
      updateTaskMutation.mutate(
        { taskId: activeTask._id, body: { status: movedTask.status } },
        {
          onSuccess: (res) => {
            if (res.reward) {
              handleReward(res.reward);
            }
          },
        },
      );
    }

    setActiveTask(null);
  }

  return {
    tasks,
    activeTask,
    onDragStart,
    debouncedDragOver,
    onDragEnd,
  };
}
