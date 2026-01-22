import { Column, Id, Task } from "./goal-kanban.tsx";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import GoalTask from "./goal-task.tsx";
import styles from './goal-column.module.css'
interface Props {
    column: Column;
    tasks: Task[];
    createTask: (columnId: Id) => void;
}

function GoalColumn({ column, tasks, createTask }: Props) {
    const taskIds = tasks.map((task) => task.id);

    const { setNodeRef } = useDroppable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    });

    return (
        <div ref={setNodeRef} className={styles.goalColumn}>
            <div>
                {column.title}
            </div>
            <div className={styles.tasksContainer}>
                <SortableContext items={taskIds}>
                    {tasks.map((task) => (
                        <GoalTask key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>
            <button
                className="px-4 py-2 bg-purple-100 border-t border-purple-300 text-purple-700 text-sm hover:bg-purple-200"
                onClick={() => createTask(column.id)}
            >
                Add new task
            </button>
        </div>
    );
}

export default GoalColumn;
