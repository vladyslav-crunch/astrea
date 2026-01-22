import {useCallback, useState} from "react";
import {DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, UniqueIdentifier,} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {createPortal} from "react-dom";
import {debounce} from "lodash";
import styles from "./goal-kanban.module.css"
import GoalColumn from "./goal-column.tsx";
import GoalTask from "./goal-task.tsx";

/* ---------------- TYPES ---------------- */

export type Id = UniqueIdentifier;

export type Column = {
    id: Id;
    title: string;
};

export type Task = {
    id: Id;
    content: string;
    columnId: Id;
};

/* ---------------- STATIC COLUMNS ---------------- */

const COLUMNS: Column[] = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
];

/* ---------------- COMPONENT ---------------- */

function GoalKanban() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    function generateId(): Id {
        return crypto.randomUUID();
    }

    function createTask(columnId: Id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };
        setTasks((prev) => [...prev, newTask]);
    }

    /* ---------- DRAG HANDLERS ---------- */

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
        }
    }

    function onDragEnd(_: DragEndEvent) {
        setActiveTask(null);
    }

    const debouncedDragOver = useCallback(
        debounce((event: DragOverEvent) => {
            const { active, over } = event;
            if (!over) return;

            const activeId = active.id;
            const overId = over.id;

            if (activeId === overId) return;

            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                if (activeIndex === -1) return tasks;

                const activeTask = tasks[activeIndex];

                const isOverTask = over.data.current?.type === "Task";
                const isOverColumn = over.data.current?.type === "Column";

                /* ---- DROP OVER TASK ---- */
                if (isOverTask) {
                    const overIndex = tasks.findIndex((t) => t.id === overId);
                    if (overIndex === -1) return tasks;

                    const overTask = tasks[overIndex];

                    const updated = tasks.map((t) =>
                        t.id === activeId
                            ? { ...t, columnId: overTask.columnId }
                            : t,
                    );

                    return arrayMove(updated, activeIndex, overIndex);
                }

                /* ---- DROP OVER COLUMN ---- */
                if (isOverColumn) {
                    if (activeTask.columnId === overId) return tasks;

                    return tasks.map((t) =>
                        t.id === activeId ? {...t, columnId: overId} : t,
                    );
                }

                return tasks;
            });
        }, 10),
        [],
    );

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
                        tasks={tasks.filter((task)=> task.columnId === column.id)}
                        createTask={createTask}
                    />
                ))}
            </div>

            {createPortal(
                <DragOverlay>
                    {activeTask && <GoalTask task={activeTask} />}
                </DragOverlay>,
                document.body,
            )}
        </DndContext>
    );
}

export default GoalKanban;
