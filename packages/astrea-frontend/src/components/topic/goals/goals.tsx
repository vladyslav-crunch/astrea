import {GoalWithStats} from "astrea-shared/types/goal.type.ts";
import Goal from "../goal/goal.tsx";
import styles from "./goals.module.css"

type GoalsProps = {
    goals: GoalWithStats[];
    onSelectGoal: (goalId: string) => void;
}

function Goals({goals, onSelectGoal}: GoalsProps) {
    return (
        <div className={styles.goalsContainer}>
            {
                goals.map((goal: GoalWithStats) => (
                    <Goal goal={goal} onSelectGoal={onSelectGoal}/>
                ))
            }
        </div>
    );
}

export default Goals;