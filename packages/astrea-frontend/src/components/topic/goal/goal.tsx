import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {GoalWithStats} from "astrea-shared/types/goal.type.ts";
import styles from "./goal.module.css";

type GoalProps = {
    goal: GoalWithStats;
    onSelectGoal: (goalId: string) => void;
};

function Goal({goal, onSelectGoal}: GoalProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({id: goal._id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "manipulation",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`${styles.goalContainer} ${isDragging ? styles.dragging : ''}`}
            onClick={() => onSelectGoal(goal._id)}
        >
            {goal.dueToday ? (
                <span className={styles.todayCount}>{goal.dueToday}</span>
            ) : ""}
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
        </div>
    );
}

export default Goal;
