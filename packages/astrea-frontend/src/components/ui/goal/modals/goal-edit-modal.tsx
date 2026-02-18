import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../common/modal/modal.tsx";
import Input, { INPUT_OPTION_CLASSES } from "../../common/input/input.tsx";
import { GoalWithStats } from "astrea-shared/types/goal.type.ts";
import { UpdateGoalInput, updateGoalSchema } from "astrea-shared";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./goal-edit-modal.module.css";
import Textarea, {
  TEXTAREA_OPTION_CLASSES,
} from "../../common/textarea/textarea.tsx";
import { useEffect, useState } from "react";
import Select from "../../common/select/select.tsx";
import Button, {
  BUTTON_COLOR,
  BUTTON_VARIANT,
} from "../../common/button/button.tsx";
import { Trash } from "lucide-react";
import { useDeleteGoal, useUpdateGoal } from "@/hooks/useGoal.ts";
import ConfirmModal from "../../common/confirm-modal/confirm-modal.tsx";
import { toast } from "sonner";

type GoadEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  goal: GoalWithStats;
};

function GoalEditModal({ isOpen, onClose, goal }: GoadEditModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<UpdateGoalInput>({
    resolver: zodResolver(updateGoalSchema),
    defaultValues: {
      title: goal.title,
      description: goal.description,
      modifier: {
        easy: goal.modifier?.easy,
        medium: goal.modifier?.medium,
        hard: goal.modifier?.hard,
        epic: goal.modifier?.epic,
      },
    },
  });

  useEffect(() => {
    if (goal) {
      reset({
        title: goal.title || "",
        description: goal.description || "",
        topicId: goal.topicId ?? undefined,
        modifier: {
          easy: goal.modifier?.easy ?? 1,
          medium: goal.modifier?.medium ?? 1,
          hard: goal.modifier?.hard ?? 1,
          epic: goal.modifier?.epic ?? 1,
        },
      });
    }
  }, [goal, reset]);

  const optionsOfMultipliers = [
    { label: "x0.25", value: 0.25 },
    { label: "x0.50", value: 0.5 },
    { label: "x0.75", value: 0.75 },
    { label: "x1", value: 1 },
    { label: "x1.25", value: 1.25 },
    { label: "x1.50", value: 1.5 },
    { label: "x1.75", value: 1.75 },
    { label: "x2.00", value: 2 },
  ];
  const levels = ["easy", "medium", "hard", "epic"] as const;
  const updateGoalMutation = useUpdateGoal(goal.topicId);
  const deleteGoalMutation = useDeleteGoal(goal.topicId);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<UpdateGoalInput> = (data) => {
    updateGoalMutation.mutate(
      {
        goalId: goal._id,
        body: data,
      },
      {
        onSuccess: () => {
          toast.success("Goal updated successfully.");
          onClose();
        },
        onError: (err) => {
          console.error("Update failed:", err);
          toast.error("Failed to update goal.");
        },
      },
    );
  };

  const confirmDelete = () => {
    deleteGoalMutation.mutate(goal._id, {
      onSuccess: () => {
        toast.success("Goal deleted successfully.");
        setIsConfirmOpen(false);
        onClose();
      },
      onError: (err) => {
        console.error("Delete failed:", err);
        toast.error("Failed to delete goal.");
      },
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Title>Edit Goal "{goal.title}"</Modal.Title>
        <Modal.Content>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.editGoalForm}
          >
            <div className={styles.editGoalFormInformation}>
              <h4>Information</h4>
              <Input
                {...register("title")}
                option={INPUT_OPTION_CLASSES.modal}
                placeholder="Enter goal title"
                error={errors.title?.message}
              />
              <Textarea
                {...register("description")}
                option={TEXTAREA_OPTION_CLASSES.modal}
                placeholder="Enter goal description"
                error={errors.description?.message}
              />
            </div>
            <div className={styles.editGoalFormAward}>
              <h4>Reward multipliers</h4>
              {levels.map((level) => (
                <Controller
                  key={level}
                  control={control}
                  name={`modifier.${level}` as `modifier.${typeof level}`}
                  render={({ field }) => (
                    <Select
                      label={level.charAt(0).toUpperCase() + level.slice(1)}
                      value={field.value ?? 1}
                      onChange={field.onChange}
                      options={optionsOfMultipliers}
                    />
                  )}
                />
              ))}
            </div>
          </form>
        </Modal.Content>
        <Modal.Footer>
          <div className={styles.editGoalFooter}>
            <Button
              buttonType={BUTTON_VARIANT.modal}
              buttonColor={BUTTON_COLOR.red}
              style={{ maxWidth: "65px" }}
              onClick={() => {
                setIsConfirmOpen(true);
              }}
              disabled={goal.isDefault}
            >
              <Trash color={"#fff"} size={24} />
            </Button>
            <Button
              buttonType={BUTTON_VARIANT.modal}
              style={{ width: "150px" }}
              disabled={updateGoalMutation.isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {updateGoalMutation.isPending ? "Saving..." : "Edit"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete this goal?"
        message={`Are you sure you want to delete "${goal.title}"? This cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor={BUTTON_COLOR.red}
        isLoading={deleteGoalMutation.isPending}
      />
    </>
  );
}

export default GoalEditModal;
