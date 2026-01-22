import {Column, Id, Task} from "./goal-tasks.tsx";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import GoalTaskColumnTask from "./goal-task-column-task.tsx";
import {useMemo} from "react";

interface Props {
    column: Column;
    createTask: (columnId: Id) => void;
    tasks: Task[];
}

function GoalTasksColumnContainer(props: Props) {
    const { column, createTask, tasks } = props;
    const tasksIds = useMemo(() => tasks.map(task => task.id), [tasks]);
    const {setNodeRef,  attributes, listeners, transition, transform, isDragging} = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if(isDragging){
        return <div ref={setNodeRef} style={style} className="bg-purple-50 w-[350px] h-[500px] max-h-[500px] rounded-lg shadow-md flex flex-col overflow-hidden"></div>
    }

    return (
        <div ref={setNodeRef} style={style} className="bg-purple-50 w-[350px] h-[500px] max-h-[500px] rounded-lg shadow-md flex flex-col overflow-hidden">
            {/* Header */}
            <div {...attributes} {...listeners} className="bg-purple-200 px-4 py-3 font-semibold text-lg text-purple-900 border-b border-purple-300">
                {column.title}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-4 gap-3 overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map(task => (
                        <GoalTaskColumnTask task={task} key={task.id}/>
                    ))}
                </SortableContext>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-purple-100 border-t border-purple-300 text-purple-700 text-sm text-center" onClick={() => {createTask(column.id)}}>
                Add new task
            </div>
        </div>
    );
}

export default GoalTasksColumnContainer;
