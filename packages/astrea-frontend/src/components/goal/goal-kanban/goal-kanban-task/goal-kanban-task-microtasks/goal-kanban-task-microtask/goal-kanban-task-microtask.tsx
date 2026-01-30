import { UseFormRegister } from "react-hook-form";
import { UpdateTaskInput } from "astrea-shared";
import { X } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import styles from "./goal-kanban-task-microtask.module.css";

type Props = {
  index: number;
  register: UseFormRegister<UpdateTaskInput>;
  onRemove: (index: number) => void;
};

function GoalKanbanTaskMicrotask({ index, register, onRemove }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useLayoutEffect(() => {
    resize();
  }, []);

  const { ref: rhfRef, ...field } = register(`microtasks.${index}.title`);

  return (
    <div className={styles.microtaskContainer}>
      <input
        type="checkbox"
        {...register(`microtasks.${index}.completed`)}
        className={styles.checkbox}
      />

      <textarea
        {...field}
        ref={(el) => {
          rhfRef(el);
          textareaRef.current = el;
        }}
        placeholder="Microtask title"
        className={styles.microtaskInput}
        rows={1}
        onInput={resize}
      />

      <input type="hidden" {...register(`microtasks.${index}.order`)} />

      <button
        type="button"
        onClick={() => onRemove(index)}
        className={styles.deleteButton}
        aria-label="Remove microtask"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default GoalKanbanTaskMicrotask;
