import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {Task} from "astrea-shared/types/task.type.ts";


interface Props {
    task: Task;
}

function GoalKanbanTask({ task }: Props) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task._id,
        data: {
            type: "Task",
            task,
        },
        // disabled: task.status === "done",
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-3 h-[75px] rounded-md shadow-sm cursor-grab hover:shadow-md"
        >
            {task.title}
        </div>
    );
}

export default GoalKanbanTask;
