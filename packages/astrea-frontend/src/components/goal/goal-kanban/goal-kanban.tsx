import {
    DndContext,
    DragOverlay,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import styles from "./goal-kanban.module.css";
import GoalKanbanColumn from "./goal-kanban-column/goal-kanban-column.tsx";
import GoalKanbanTask from "./goal-kanban-task/goal-kanban-task.tsx";
import { useTasksByGoal } from "../../../hooks/useTask.ts";
import { COLUMNS } from "./goal-kanban-column/columns.ts";
import {useKanbanDnd} from "../../../hooks/useKanbanDnd.ts";


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

    const {
        tasks,
        activeTask,
        onDragStart,
        debouncedDragOver,
        onDragEnd,
    } = useKanbanDnd({
        initialTasks: fetchedTasks,
        goalId,
    });

    if (isLoading) {
        return (
            <div className={styles.state}>
                Loading tasks…
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
            onDragStart={onDragStart}
            onDragOver={debouncedDragOver}
            onDragEnd={onDragEnd}
        >
            <div className={styles.columnsContainer}>
                {COLUMNS.map((column) => (
                    <GoalKanbanColumn
                        key={column.id}
                        column={column}
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
                document.body
            )}
        </DndContext>
    );
}

export default GoalKanban;
