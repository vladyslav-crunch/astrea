import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import styles from "./goal-kanban.module.css";
import GoalKanbanColumn from "./goal-kanban-column/goal-kanban-column.tsx";
import GoalKanbanTask from "./goal-kanban-task/goal-kanban-task.tsx";
import { useTasksByGoal } from "@/hooks/useTask.ts";
import { COLUMNS } from "./goal-kanban-column/columns.ts";
import { useKanbanDnd } from "@/hooks/useKanbanDnd.ts";
import Spinner from "@/components/ui/common/spinner/spinner.tsx";

type GoalKanbanProps = {
  goalId: string;
};

function GoalKanban({ goalId }: GoalKanbanProps) {
  const {
    data: fetchedTasks = [],
    isLoading,
    isError,
    error,
  } = useTasksByGoal(goalId);

  const { tasks, activeTask, onDragStart, debouncedDragOver, onDragEnd } =
    useKanbanDnd({
      initialTasks: fetchedTasks,
      goalId,
    });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  if (isLoading) {
    return (
      <div className={styles.state}>
        <Spinner size={45} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.stateError}>
        Failed to load tasks
        <br />
        <small>{(error as Error)?.message}</small>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      autoScroll={false}
      onDragStart={onDragStart}
      onDragOver={debouncedDragOver}
      onDragEnd={onDragEnd}
    >
      <div className={styles.columnsContainer}>
        {COLUMNS.map((column) => (
          <GoalKanbanColumn
            key={column.id}
            column={column}
            goalId={goalId}
            tasks={tasks
              .filter((t) => t.status === column.id)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))}
          />
        ))}
      </div>

      {createPortal(
        <DragOverlay>
          {activeTask && <GoalKanbanTask task={activeTask} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}

export default GoalKanban;
