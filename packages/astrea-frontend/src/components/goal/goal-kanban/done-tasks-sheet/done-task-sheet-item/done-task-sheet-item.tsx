import { Task } from "astrea-shared/types/task.type.ts";
import style from "../../goal-kanban-task/goal-kanban-task.module.css";
import { formatToMonthDay } from "@/utility/format-to-month-day.ts";
import Button, {
  BUTTON_COLOR,
  BUTTON_VARIANT,
} from "@/components/ui/common/button/button";
import { RotateCcw, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  task: Task;
  isActive: boolean;
  onClick: () => void;
  onRestore: () => void;
  onDelete: () => void;
}

function DoneTaskSheetItem({
  task,
  isActive,
  onClick,
  onRestore,
  onDelete,
}: Props) {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
      setIsExiting(false);
    } else if (shouldRender) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsExiting(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isActive, shouldRender]);

  return (
    <div className={style.doneTaskWrapper}>
      <div
        className={`${style.goalKanbanTask} ${style.doneTaskSheetItem}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
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
            <span
              className={`${style.taskDifficulty} ${style[task.difficulty]}`}
            >
              {task.difficulty}
            </span>
          </div>
        </div>
      </div>

      {shouldRender && (
        <div
          className={`${style.taskActionsWrapper} ${isExiting ? style.taskActionsWrapperExit : ""}`}
        >
          <div
            className={`${style.taskActions} ${isExiting ? style.taskActionsExit : ""}`}
          >
            <Button
              buttonType={BUTTON_VARIANT.modal}
              buttonColor={BUTTON_COLOR.cancel}
              onClick={(e) => {
                e.stopPropagation();
                onRestore();
              }}
            >
              <RotateCcw /> Restore
            </Button>

            <Button
              buttonType={BUTTON_VARIANT.modal}
              buttonColor={BUTTON_COLOR.red}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash /> Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoneTaskSheetItem;
