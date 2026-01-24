import TopicBoard from "../../components/topic/topic-board/topic-board.tsx";
import styles from './topic.module.css';
import GoalsPreview from "../../components/goal/goals/goals-preview.tsx";
import {TabProvider} from "../../context/tab-context.tsx";

const Topic = () => {

    return (
        <TabProvider>
            <div className={styles.topicContainer}>
                <GoalsPreview/>
                <TopicBoard/>
            </div>
        </TabProvider>
    );
};

export default Topic;
