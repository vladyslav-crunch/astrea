import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import styles from "./goal-kanban-mobile.module.css";
import GoalKanban from "../goal-kanban/goal-kanban.tsx";
import { useGoalsByTopic } from "@/hooks/useGoal.ts";

function GoalKanbanMobile() {
  const { topicId, goalId } = useParams<{ topicId: string; goalId: string }>();
  const navigate = useNavigate();
  const { data: goals = [] } = useGoalsByTopic(topicId!);

  const selectedGoal = goals.find((goal) => goal._id === goalId);

  const handleBack = () => {
    navigate(`/topic/${topicId}`);
  };

  return (
    <div className={styles.goalKanbanMobileWrapper}>
      <div className={styles.goalKanbanMobileHeader}>
        <ArrowLeft
          size={24}
          className={styles.backArrow}
          onClick={handleBack}
        />
        <div className={styles.goalKanbanMobileHeaderInfo}>
          <p className={styles.goalTitle}>{selectedGoal?.title || "Goal"}</p>
        </div>
      </div>
      <div className={styles.goalKanbanMobileContent}>
        {goalId && <GoalKanban goalId={goalId} />}
      </div>
    </div>
  );
}

export default GoalKanbanMobile;
