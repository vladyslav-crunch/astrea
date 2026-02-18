import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Modal from "../../common/modal/modal.tsx";
import Input, { INPUT_OPTION_CLASSES } from "../../common/input/input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./goal-edit-modal.module.css";
import Textarea, {
  TEXTAREA_OPTION_CLASSES,
} from "../../common/textarea/textarea.tsx";
import Select from "../../common/select/select.tsx";
import Button, { BUTTON_VARIANT } from "../../common/button/button.tsx";
import { useCreateGoal } from "@/hooks/useGoal.ts";
import { toast } from "sonner";
import { z } from "zod";

const createGoalFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  modifier: z.object({
    easy: z.number(),
    medium: z.number(),
    hard: z.number(),
  }),
});

type CreateGoalFormData = z.infer<typeof createGoalFormSchema>;

type GoalCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  topicId: string;
};

function GoalCreateModal({ isOpen, onClose, topicId }: GoalCreateModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreateGoalFormData>({
    resolver: zodResolver(createGoalFormSchema),
    defaultValues: {
      title: "",
      description: "",
      modifier: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
    },
  });

  const optionsOfMultipliers = [
    { label: "x0.25", value: 0.25 },
    { label: "x0.50", value: 0.5 },
    { label: "x0.75", value: 0.75 },
    { label: "x1 (default)", value: 1 },
    { label: "x1.25", value: 1.25 },
    { label: "x1.50", value: 1.5 },
    { label: "x1.75", value: 1.75 },
    { label: "x2.00", value: 2 },
  ];
  const levels = ["easy", "medium", "hard"] as const;
  const createGoalMutation = useCreateGoal(topicId);

  const onSubmit: SubmitHandler<CreateGoalFormData> = (data) => {
    createGoalMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Goal created successfully.");
        reset();
        onClose();
      },
      onError: (err) => {
        console.error("Create failed:", err);
        toast.error("Failed to create goal.");
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Title>Create New Goal</Modal.Title>
      <Modal.Content>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.editGoalForm}>
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "0.5rem",
          }}
        >
          <Button
            buttonType={BUTTON_VARIANT.modal}
            style={{ width: "200px" }}
            disabled={createGoalMutation.isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {createGoalMutation.isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default GoalCreateModal;
