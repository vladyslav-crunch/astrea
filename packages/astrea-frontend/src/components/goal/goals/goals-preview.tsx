// components/goals/GoalsPreview.tsx
import { useParams } from "react-router-dom";
import { useCreateGoal } from "@/hooks/useGoal.ts";
import { toast } from "sonner";
import styles from "./goals.module.css";
import GoalCreateInput from "../../ui/goal/goal-create-input/goal-create-input.tsx";
import GoalList from "../goal-list/goal-list.tsx";

function GoalsPreview() {
  const { topicId } = useParams<{ topicId: string }>();
  const { mutate: createGoal } = useCreateGoal(topicId!);

  const handleCreateGoal = (title: string) => {
    createGoal(
      { title },
      {
        onSuccess: () => toast.success("Goal created successfully."),
        onError: (err) => {
          console.error(err);
          toast.error("Failed to create goal.");
        },
      },
    );
  };

  return (
    <div className={styles.goalsPreviewContainer}>
      <div className={styles.goalsPreviewContent}>
        <GoalCreateInput onCreate={handleCreateGoal} />
        <GoalList />
      </div>
    </div>
  );
}

export default GoalsPreview;
