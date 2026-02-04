import styles from "./topic-board.module.css";
import { useParams } from "react-router-dom";
import { useGoalsByTopic } from "@/hooks/useGoal.ts";
import GoalPanel from "../../goal/goal-panel/goal-panel.tsx";
import { useTabContext } from "@/context/tab-context.tsx";
import Spinner from "../../ui/common/spinner/spinner.tsx";

function TopicBoard() {
  const { activeTab, setActiveTab } = useTabContext();
  const { topicId } = useParams<{ topicId: string }>();
  const { data: goals = [], isLoading, isError } = useGoalsByTopic(topicId!);

  if (isError || !goals) return <p>Failed to load goals</p>;

  const draftGoalDueCounter = goals.find((goal) => goal.isDefault)?.dueToday;
  const goalsDueCounter =
    goals.reduce((prev, goal) => prev + goal.dueToday, 0) -
    (draftGoalDueCounter || 0);

  return (
    <div className={styles.boardContainer}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "drafts" ? styles.active : ""}`}
          onClick={() => setActiveTab("drafts")}
        >
          Drafts
          {draftGoalDueCounter ? (
            <span className={styles.tabDueCounter}>{draftGoalDueCounter}</span>
          ) : (
            ""
          )}
        </button>
        <button
          className={`${styles.tab} ${activeTab === "goals" ? styles.active : ""}`}
          onClick={() => setActiveTab("goals")}
        >
          Goals
          {goalsDueCounter ? (
            <span className={styles.tabDueCounter}>{goalsDueCounter}</span>
          ) : (
            ""
          )}
        </button>
        {/*<button*/}
        {/*  className={`${styles.tab} ${activeTab === "overall" ? styles.active : ""}`}*/}
        {/*  onClick={() => setActiveTab("overall")}*/}
        {/*>*/}
        {/*  Overall*/}
        {/*</button>*/}
      </div>

      <div className={styles.boardContent}>
        {isLoading ? (
          <div className={styles.goalLoading}>
            <Spinner />
          </div>
        ) : (
          <GoalPanel type={activeTab} goals={goals} />
        )}
      </div>
    </div>
  );
}

export default TopicBoard;
