// goal-panel.tsx
import styles from './goal-panel.module.css'
import {useParams} from "react-router-dom";
import {GoalWithStats} from "astrea-shared/types/goal.type.ts";
import GoalProgressRing from "../../ui/goal/goal-progress-ring/goal-progress-ring.tsx";
import {useState} from "react";
import GoalEditModal from "../../ui/goal/modals/goal-edit-modal.tsx";
import GoalKanban from "../goal-tasks/goal-kanban.tsx";

export type GoalPanelType = 'goals' | 'drafts' | 'overall';


type GoalPanelProps = {
    type: GoalPanelType;
    goals: GoalWithStats[];
};

function GoalPanel({type = 'drafts', goals}: GoalPanelProps) {
    const {goalId} = useParams<{ goalId: string }>();
    const [isOpen, setIsOpen] = useState(false);

    let selectedGoal: GoalWithStats | undefined;
    if (type === 'drafts') {
        selectedGoal = goals.find(goal => goal.isDefault);
    }


    if (type === 'goals') {
        if (goalId) {
            selectedGoal = goals.find(goal => goal._id === goalId);
        } else {
            selectedGoal = goals.find(goal => !goal.isDefault);
        }
    }


    return (
        <div className={styles.goalPanelContainer}>
            <div className={styles.goalPanelHeader}>
                {(type === 'drafts' || type === "goals") && selectedGoal && (
                    <>
                        <div className={styles.goalPanelInfo}>
                            <h2 className={styles.goalPanelTitle}>{selectedGoal.title}</h2>
                            <p className={styles.goalPanelDescrtiption}>{selectedGoal.description}</p>
                        </div>
                        <div className={styles.goalPanelStats}>
                            <GoalProgressRing taskCount={selectedGoal.taskCount} in_progress={selectedGoal.in_progress}
                                              done={selectedGoal.done}/>
                            <span onClick={() => setIsOpen(true)} className={styles.goalKebabMenu}>⋮</span>
                        </div>
                    </>
                )}
            </div>

            {type === 'overall' && <li>Overall view will go here</li>}
            {!selectedGoal && type !== 'overall' &&
                <div className={styles.noGoalMessage}>No goal selected yet — create a new one or pick from the sidebar
                    to begin.</div>
            }
            {selectedGoal && (<>
                <div className={styles.goalPanelDivider}/>
                <GoalKanban goalId={selectedGoal._id} />
                <GoalEditModal isOpen={isOpen} onClose={() => setIsOpen(false)} goal={selectedGoal}/></>)}
        </div>
    );
}

export default GoalPanel;
