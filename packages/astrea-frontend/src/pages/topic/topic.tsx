import TopicBoard from "../../components/topic/topic-board/topic-board.tsx";
import styles from "./topic.module.css";
import GoalsPreview from "../../components/goal/goals/goals-preview.tsx";
import GoalsPreviewMobile from "../../components/goal/goals-mobile/goals-preview-mobile.tsx";
import GoalKanbanMobile from "../../components/goal/goal-kanban-mobile/goal-kanban-mobile.tsx";
import { TabProvider } from "../../context/tab-context.tsx";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";

const Topic = () => {
  const isMobile = useMediaQuery({ maxWidth: 850 });
  const { goalId } = useParams<{ goalId?: string }>();

  return (
    <TabProvider>
      <div className={styles.topicContainer}>
        {isMobile ? (
          goalId ? (
            <GoalKanbanMobile />
          ) : (
            <GoalsPreviewMobile />
          )
        ) : (
          <>
            <GoalsPreview />
            <TopicBoard />
          </>
        )}
      </div>
    </TabProvider>
  );
};

export default Topic;
