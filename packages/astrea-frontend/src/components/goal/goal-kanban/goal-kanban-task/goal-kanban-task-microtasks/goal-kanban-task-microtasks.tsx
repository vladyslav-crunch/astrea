import { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import { UpdateTaskInput } from "astrea-shared";
import React, { useState } from "react";
import Input, {
  INPUT_OPTION_CLASSES,
} from "../../../../ui/common/input/input.tsx";
import GoalKanbanTaskMicrotask from "./goal-kanban-task-microtask/goal-kanban-task-microtask.tsx";
import styles from "./goal-kanban-task-microtasks.module.css";
type MicrotaskInput = NonNullable<UpdateTaskInput["microtasks"]>[number];

type GoalKanbanTaskMicrotasksProps = {
  microtasks: FieldArrayWithId<UpdateTaskInput, "microtasks", "id">[];
  register: UseFormRegister<UpdateTaskInput>;
  onAdd: (value: MicrotaskInput) => void;
  onRemove: (index: number) => void;
};

function GoalKanbanTaskMicrotasks({
  microtasks,
  register,
  onAdd,
  onRemove,
}: GoalKanbanTaskMicrotasksProps) {
  const [newTitle, setNewTitle] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAdd({
      title: newTitle.trim(),
      completed: false,
      order: microtasks?.length ?? 0,
    });
    setNewTitle("");
    requestAnimationFrame(() => {
      (document.activeElement as HTMLElement | null)?.blur();
    });
  };

  return (
    <div>
      <h4 style={{ marginBottom: 8 }}>Microtasks</h4>
      <Input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add microtask and hit Enter"
        option={INPUT_OPTION_CLASSES.modal}
      />
      <div className={styles.microtasksContainer}>
        {microtasks.map((_, index) => (
          <GoalKanbanTaskMicrotask
            key={microtasks[index].id}
            index={index}
            register={register}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}

export default GoalKanbanTaskMicrotasks;
