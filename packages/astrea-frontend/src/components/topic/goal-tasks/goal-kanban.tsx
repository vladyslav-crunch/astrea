import {useEffect, useState } from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import styles from "./goal-kanban.module.css";
import GoalColumn from "./goal-column.tsx";
import GoalTask from "./goal-task.tsx";
import { useTasksByGoal, useReorderTasks } from "../../../hooks/useTask.ts";
import { Task } from "astrea-shared/types/task.type.ts";
import {COLUMNS} from "./columns.ts";


type GoalKanbanProps = {
    goalId: string;
}

function GoalKanban({ goalId }: GoalKanbanProps) {
    const { data: fetchedTasks = [], isLoading, isError } = useTasksByGoal(goalId!);
    const { mutate: reorderTasksMutation } = useReorderTasks(goalId!);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    useEffect(() => {
        setTasks(fetchedTasks);
    }, [fetchedTasks, goalId]);

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
        }
    }

    const debouncedDragOver = (event: DragOverEvent) => {
            const { active, over } = event;
            if (!over || !active) return;

            const activeId = active.id;
            const overId = over.id;
            if (activeId === overId) return;

            setTasks((prevTasks) => {
                const activeTask = prevTasks.find((t) => t._id === activeId);
                if (!activeTask) return prevTasks;

                const isOverTask = over.data.current?.type === "Task";
                const isOverColumn = over.data.current?.type === "Column";

                // --- Drop over task ---
                if (isOverTask) {
                    const overTask = prevTasks.find((t) => t._id === overId);
                    if (!overTask) return prevTasks;

                    const newStatus = overTask.status;
                    const isSameColumn = activeTask.status === newStatus;

                    //full list of target column including active task
                    const fullTargetTasks = prevTasks
                        .filter((t) => t.status === newStatus)
                        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

                    const activeIndex = fullTargetTasks.findIndex((t) => t._id === activeId);
                    const overIndex = fullTargetTasks.findIndex((t) => t._id === overId);

                    if (overIndex === -1) return prevTasks;

                    let insertIndex = overIndex;

                    if (isSameColumn && activeIndex < overIndex) {
                        insertIndex += 1;
                    }

                    // Remove active task
                    const filteredTargetTasks = fullTargetTasks.filter(
                        (t) => t._id !== activeId
                    );

                    const movedTask: Task = {
                        ...activeTask,
                        status: newStatus,
                    };

                    const newTargetTasks = [
                        ...filteredTargetTasks.slice(0, insertIndex),
                        movedTask,
                        ...filteredTargetTasks.slice(insertIndex),
                    ].map((t, idx) => ({
                        ...t,
                        order: idx,
                    }));

                    return prevTasks.map(
                        (t) => newTargetTasks.find((nt) => nt._id === t._id) || t
                    );
                }

                // --- Drop over column ---
                if (isOverColumn) {
                    const newStatus = overId as Task["status"];
                    if (activeTask.status === newStatus) return prevTasks;

                    const columnTasks = prevTasks
                        .filter((t) => t.status === newStatus)
                        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

                    const updatedTask: Task = {
                        ...activeTask,
                        status: newStatus,
                        order: columnTasks.length,
                    };

                    return prevTasks.map((t) => (t._id === activeId ? updatedTask : t));
                }

                return prevTasks;
            });
        }



    function onDragEnd(_: DragEndEvent) {
        if (!activeTask) return;

        const updates = tasks.map((t) => ({
            _id: t._id,
            status: t.status,
            order: t.order ?? 0,
        }));

        reorderTasksMutation(updates);
        setActiveTask(null);
    }


    /* ---------- RENDER ---------- */
    return (
        <DndContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={debouncedDragOver}
        >
            <div className={styles.columnsContainer}>
                {COLUMNS.map((column) => (
                    <GoalColumn
                        key={column.id}
                        column={column}
                        tasks={tasks
                            .filter((task) => task.status === column.id)
                            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))}
                    />
                ))}
            </div>

            {createPortal(
                <DragOverlay>
                    {activeTask && <GoalTask task={activeTask} />}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
}

export default GoalKanban;
