import {GoalWithStats} from 'astrea-shared/types/goal.type.ts';
import styles from "./goal.module.css"

type GoalProps = {
    goal: GoalWithStats;
    onSelectGoal: (goalId: string) => void;
};

function Goal({goal, onSelectGoal}: GoalProps) {
    return (
        <div className={styles.goalContainer} onClick={() => onSelectGoal(goal._id)}>
            {goal.dueToday ? (
                <span className={styles.todayCount}>{goal.dueToday}</span>
            ) : ""}
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
        </div>
    );
}

export default Goal;
