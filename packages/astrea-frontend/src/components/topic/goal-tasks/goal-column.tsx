import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import GoalTask from "./goal-task.tsx";
import styles from './goal-column.module.css'
import {Task} from "astrea-shared/types/task.type.ts";
import {Column} from "./columns.ts";
interface Props {
    column: Column;
    tasks: Task[];
}

function GoalColumn({ column, tasks }: Props) {
    const taskIds = tasks.map((task) => task._id);

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
                        <GoalTask key={task._id} task={task} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}

export default GoalColumn;
