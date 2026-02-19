import { useNavigate, useParams } from "react-router-dom";
import { useGoalsByTopic } from "@/hooks/useGoal.ts";
import { ArrowLeft, Plus } from "lucide-react";
import styles from "./goals-preview-mobile.module.css";
import GoalListItem from "./goal-list-item/goal-list-item.tsx";
import { useState } from "react";
import GoalCreateModal from "../../ui/goal/modals/goal-create-modal.tsx";
import Spinner from "@/components/ui/common/spinner/spinner.tsx";

function GoalsPreviewMobile() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { data: goals = [], isLoading, isError } = useGoalsByTopic(topicId!);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const sortedGoals = [
    ...goals.filter((g) => g.isDefault),
    ...goals.filter((g) => !g.isDefault),
  ];

  const handleBack = () => {
    navigate("/");
  };

  if (isLoading)
    return (
      <div className={styles.goalsLoading}>
        <Spinner size={45} />
      </div>
    );
  if (isError) return <div>Error loading goals</div>;

  return (
    <>
      <div className={styles.goalsPreviewMobileWrapper}>
        <div className={styles.goalsPreviewMobileHeader}>
          <ArrowLeft
            size={24}
            className={styles.backArrow}
            onClick={handleBack}
          />
          <p>Choose Goal</p>
        </div>
        <div className={styles.goalsPreviewMobileContainer}>
          {sortedGoals.length === 0 ? (
            <div className={styles.noGoalsMessage}>No goals available</div>
          ) : (
            sortedGoals.map((goal) => (
              <GoalListItem goal={goal} key={goal._id} />
            ))
          )}
        </div>
        <span
          className={styles.addGoal}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus color={"#fff"} size={30} />
        </span>
      </div>
      <GoalCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        topicId={topicId!}
      />
    </>
  );
}

export default GoalsPreviewMobile;
