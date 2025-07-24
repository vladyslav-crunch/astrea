import TopicBoard from "../../components/topic/topic-board/topic-board.tsx";
import styles from './topic.module.css';
import GoalsPreview from "../../components/topic/goals/goals-preview.tsx";

const Topic = () => {
    return (
        <div className={styles.topicContainer}>
            <GoalsPreview/>
            <TopicBoard/>
        </div>
    );
};

export default Topic;
