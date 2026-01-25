import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "astrea-shared/types/task.type.ts";
import style from "./goal-kanban-task.module.css";
import { formatToMonthDay } from "../../../../utility/format-to-month-day.ts";

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

  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={dndStyle}
      {...attributes}
      {...listeners}
      className={`${style.goalKanbanTask} ${task.status === "done" ? style.goalKanbanTaskDone : ""}`}
    >
      <div className={style.taskHeader}>
        <p className={style.taskTitle}>{task.title}</p>
        <p className={style.taskDescription}>{task.description}</p>
      </div>
      <div className={style.taskFooter}>
        <div className={style.taskFooterLeft}>
          {task.microtasks.length > 0 && (
            <span className={style.microtaskCounter}>
              {task.microtasks.filter((t) => t.completed).length}/
              {task.microtasks.length}
            </span>
          )}
        </div>
        <div className={style.taskFooterRight}>
          {task.dueDate && (
            <span className={style.taskDueDate}>
              {formatToMonthDay(task.dueDate)}
            </span>
          )}
          <span className={`${style.taskDifficulty} ${style[task.difficulty]}`}>
            {task.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GoalKanbanTask;
