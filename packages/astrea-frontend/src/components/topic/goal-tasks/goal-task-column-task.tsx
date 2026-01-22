import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "./goal-tasks";

interface Props {
  task: Task;
}

function GoalTaskColumnTask({ task }: Props) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
      useSortable({
        id: task.id,
        data: { type: "Task", task },
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
          className="bg-white p-3 h-[75px] rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      >
        {task.content}
      </div>
  );
}

export default GoalTaskColumnTask;
