import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import GoalKanbanTask from "../goal-kanban-task/goal-kanban-task.tsx";
import styles from "./goal-kanban-column.module.css";
import { Task } from "astrea-shared/types/task.type.ts";
import { Column } from "./columns.ts";
import TaskCreateInput from "../../../ui/task/task-create-input.tsx";
import { useCreateTask } from "@/hooks/useTask.ts";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import DoneTasksSheet from "@/components/goal/goal-kanban/done-tasks-sheet/done-tasks-sheet.tsx";
import { isTaskDueOrOverdue } from "@/utility/taskDateHandlers.ts";
interface Props {
  column: Column;
  tasks: Task[];
  goalId: string;
}

function GoalKanbanColumn({ column, tasks, goalId }: Props) {
  const taskIds = tasks.map((task) => task._id);
  const { topicId } = useParams<{ topicId: string }>();

  const { mutate: createTask } = useCreateTask(topicId!, goalId!);

  const handleCreateTask = (title: string) => {
    createTask(
      { title },
      {
        onSuccess: () => toast.success("Task created successfully."),
        onError: (err) => {
          console.error(err);
          toast.error("Failed to create task.");
        },
      },
    );
  };

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const sortedTasks = [
    ...tasks.filter((t) => isTaskDueOrOverdue(t)),
    ...tasks.filter((t) => !isTaskDueOrOverdue(t)),
  ];

  return (
    <div ref={setNodeRef} className={styles.goalColumn}>
      <div>{column.title}</div>
      <div className={styles.tasksContainer}>
        {column.id === "upcoming" && (
          <TaskCreateInput onCreate={handleCreateTask} />
        )}

        <SortableContext
          items={column.id === "done" ? taskIds.slice(0, 3) : taskIds}
        >
          {(column.id === "done" ? sortedTasks.slice(0, 3) : sortedTasks).map(
            (task) => (
              <GoalKanbanTask key={task._id} task={task} />
            ),
          )}
        </SortableContext>
      </div>
      {column.id === "done" && (
        <DoneTasksSheet
          tasks={sortedTasks}
          topicId={topicId!}
          goalId={goalId}
        />
      )}
    </div>
  );
}

export default GoalKanbanColumn;
