import Modal from "../../common/modal/modal.tsx";
import { Task } from "astrea-shared/types/task.type.ts";
import styles from "./task-edit-modal.module.css";
import "react-day-picker/style.css";

import Input, { INPUT_OPTION_CLASSES } from "../../common/input/input.tsx";
import Textarea, {
  TEXTAREA_OPTION_CLASSES,
} from "../../common/textarea/textarea.tsx";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFieldArray,
} from "react-hook-form";
import { UpdateTaskInput, updateTaskSchema } from "astrea-shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useDeleteTask, useUpdateTask } from "../../../../hooks/useTask.ts";
import Button, {
  BUTTON_COLOR,
  BUTTON_VARIANT,
} from "../../common/button/button.tsx";
import { Trash } from "lucide-react";
import ConfirmModal from "../../common/confirm-modal/confirm-modal.tsx";
import { useState } from "react";
import Select from "../../common/select/select.tsx";
import DatePicker from "../../common/date-picker/date-picker.tsx";
import GoalKanbanTaskMicrotasks from "../../../goal/goal-kanban/goal-kanban-task/goal-kanban-task-microtasks/goal-kanban-task-microtasks.tsx";

type TaskEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
};

function TaskEditModal({ isOpen, onClose, task }: TaskEditModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateTaskInput>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      difficulty: task.difficulty,
      dueDate: task.dueDate,
      microtasks: task.microtasks,
    },
  });

  const {
    fields: microtaskFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "microtasks",
  });

  const updateTaskMutation = useUpdateTask(task.topicId, task.goalId);
  const deleteTaskMutation = useDeleteTask(task.topicId, task.goalId);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const difficultyOptions = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  const onSubmit: SubmitHandler<UpdateTaskInput> = (data) => {
    updateTaskMutation.mutate(
      {
        taskId: task._id,
        body: data,
      },
      {
        onSuccess: () => {
          toast.success("Task updated successfully.");
          onClose();
        },
        onError: (err) => {
          console.error("Update failed:", err);
          toast.error("Failed to update task.");
        },
      },
    );
  };

  const confirmDelete = () => {
    deleteTaskMutation.mutate(task._id, {
      onSuccess: () => {
        toast.success("Task deleted successfully.");
        setIsConfirmOpen(false);
        onClose();
      },
      onError: (err) => {
        console.error("Delete failed:", err);
        toast.error("Failed to delete task.");
      },
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Title>Edit task</Modal.Title>
        <Modal.Content>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.editToastForm}
          >
            <div className={styles.editTaskFormLeftSide}>
              <Input
                {...register("title")}
                option={INPUT_OPTION_CLASSES.modal}
                placeholder="Enter task title"
                error={errors.title?.message}
              />
              <Textarea
                {...register("description")}
                option={TEXTAREA_OPTION_CLASSES.modal}
                placeholder="Enter task description"
                error={errors.description?.message}
              />
            </div>
            <div className={styles.editTaskFormRightSide}>
              <div className={styles.editTaskFormRightSideData}>
                <div>
                  <Controller
                    control={control}
                    name="dueDate"
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Due date"
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    control={control}
                    name="difficulty"
                    render={({ field }) => (
                      <Select
                        value={field.value ?? "easy"}
                        onChange={field.onChange}
                        options={difficultyOptions}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={styles.editTaskFormMicrotasks}>
                <GoalKanbanTaskMicrotasks
                  microtasks={microtaskFields}
                  register={register}
                  onAdd={append}
                  onRemove={remove}
                />
              </div>
            </div>
          </form>
        </Modal.Content>
        <Modal.Footer>
          <div className={styles.editTaskFooter}>
            <Button
              buttonType={BUTTON_VARIANT.modal}
              buttonColor={BUTTON_COLOR.red}
              style={{ maxWidth: "65px" }}
              onClick={() => {
                setIsConfirmOpen(true);
              }}
            >
              <Trash color={"#fff"} size={24} />
            </Button>
            <Button
              buttonType={BUTTON_VARIANT.modal}
              style={{ width: "150px" }}
              disabled={updateTaskMutation.isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {updateTaskMutation.isPending ? "Saving..." : "Edit"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete this goal?"
        message={`Are you sure you want to delete this task? This cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor={BUTTON_COLOR.red}
        isLoading={deleteTaskMutation.isPending}
      />
    </>
  );
}

export default TaskEditModal;
