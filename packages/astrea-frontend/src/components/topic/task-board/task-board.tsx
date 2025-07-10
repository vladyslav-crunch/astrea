import styles from './task-board.module.css'

type TaskBoardProps = {
    goalId?: string | null;
}

function TaskBoard({goalId}: TaskBoardProps) {
    return (
        <div className={styles.boardContainer}>{goalId}</div>
    );
}

export default TaskBoard;