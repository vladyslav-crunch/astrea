import Button, { BUTTON_VARIANT } from "../../ui/common/button/button.tsx";
import { useMemo, useState } from "react";
import GoalTasksColumnContainer from "./goal-tasks-column-container.tsx";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import GoalTaskColumnTask from "./goal-task-column-task.tsx";
import { useCallback } from "react";
import { debounce } from "lodash";

export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  content: string;
  columnId: Id;
};

function GoalTasks() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns],
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>();
  const [activeTask, setActiveTask] = useState<Task | null>();
  console.log(columns);

  const tasksByColumn = useMemo(() => {
        const map: Record<Id, Task[]> = {};
        columns.forEach((column) => {
            map[column.id] = [];
        });
        tasks.forEach((task) => {
            if (!map[task.columnId]) map[task.columnId] = [];
            map[task.columnId].push(task);
        });
        return map;
    }, [tasks, columns]);


  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function generateId(): number {
    return Math.floor(Math.random() * 1000);
  }

  function onDragStart(event: DragStartEvent) {
    console.log(event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null)
    setActiveColumn(null);
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId,
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId,
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }



    const debounceHandleDragOver = useCallback(
        debounce((event: DragOverEvent) => {
            const { active, over } = event;
            if (!over) return;

            const activeId = active.id;
            const overId = over.id;

            if (activeId === overId) return;

            const isActiveATask = active.data.current?.type === "Task";
            const isOverATask = over.data.current?.type === "Task";
            const isOverAColumn = over.data.current?.type === "Column";

            if (!isActiveATask) return;

            setTasks((tasks) => {
                const activeTaskIndex = tasks.findIndex(t => t.id === activeId);
                if (activeTaskIndex === -1) return tasks;

                const activeTask = tasks[activeTaskIndex];

                if (isOverATask) {
                    const overTaskIndex = tasks.findIndex(t => t.id === overId);
                    if (overTaskIndex === -1) return tasks;
                    const overTask = tasks[overTaskIndex];

                    const updatedTasks = tasks.map((t) =>
                        t.id === activeId ? { ...t, columnId: overTask.columnId } : t
                    );

                    return arrayMove(updatedTasks, activeTaskIndex, overTaskIndex);
                }

                if (isOverAColumn) {
                    const overColumnId = overId;
                    if (activeTask.columnId === overColumnId) return tasks;

                    const updatedTasks = tasks.map((t) =>
                        t.id === activeId ? { ...t, columnId: overColumnId } : t
                    );

                    const tasksInTargetColumn = updatedTasks.filter(t => t.columnId === overColumnId && t.id !== activeId);
                    const newIndex = updatedTasks.indexOf(tasksInTargetColumn[tasksInTargetColumn.length - 1]) + 1 || 0;

                    return arrayMove(updatedTasks, activeTaskIndex, newIndex);
                }

                return tasks;
            });
        }, 100),
        [],
    );

    const handleDragOver = (event: DragOverEvent) => {
        debounceHandleDragOver(event);
    };




    function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={handleDragOver}
    >
      <div>
        <Button
          onClick={() => createNewColumn()}
          buttonType={BUTTON_VARIANT.modal}
        >
          Add column
        </Button>
        <div className="m-auto flex gap-2">
          <SortableContext items={columnsId}>
            {columns.map((column) => (
              <GoalTasksColumnContainer
                column={column}
                key={column.id}
                createTask={createTask}
                tasks={tasksByColumn[column.id] || []}
              />
            ))}
          </SortableContext>
        </div>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <GoalTasksColumnContainer
              column={activeColumn}
              createTask={createTask}
              tasks={tasksByColumn[activeColumn.id] || []}
            />
          )}
          {activeTask && <GoalTaskColumnTask task={activeTask} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}

export default GoalTasks;
