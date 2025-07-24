import styles from './goal-overview.module.css'
import {GoalWithStats} from "astrea-shared/types/goal.type.ts";

type TaskBoardProps = {
    goal?: GoalWithStats;
}

function GoalOverview({goal}: TaskBoardProps) {
    if (!goal) {
        return null;
    }
    return (
        <div className={styles.boardContainer}>{goal._id}</div>
    );
}

export default GoalOverview;