import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {GoalWithStats} from "astrea-shared/types/goal.type.ts";
import styles from "./goal.module.css";
import {useNavigate} from "react-router-dom";

type GoalProps = {
    goal: GoalWithStats;
};


function Goal({goal}: GoalProps) {
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
    const navigate = useNavigate();
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`${styles.goalContainer} ${isDragging ? styles.dragging : ''}`}
            onClick={() => navigate(`/topic/${goal.topicId}/${goal._id}`)}
        >
            {goal.dueToday ? (
                <span className={styles.todayCount}>{goal.dueToday}</span>
            ) : ""}
            <h3 className={styles.goalTitle}>{goal.title}</h3>
            <p className={styles.goalDescription}>{goal.description}</p>
        </div>
    );
}

export default Goal;
