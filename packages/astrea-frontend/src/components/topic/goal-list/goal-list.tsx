import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";

import styles from "./goal-list.module.css";
import Goal from "../goal/goal.tsx";
import {useGoalsByTopic, useReorderGoals} from "../../../hooks/useGoal.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useHandleGoalReorder} from "../../../hooks/useHandleGoarReorder.ts";
import {useEffect} from "react";
import Spinner from "../../ui/common/spinner/spinner.tsx";


function GoalList() {
    const {topicId} = useParams<{ topicId: string }>();
    const {data: goals = [], isLoading, isError, error} = useGoalsByTopic(topicId!);
    const {mutate: reorderGoals} = useReorderGoals(topicId!);
    const navigate = useNavigate();
    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);

    const handleReorder = useHandleGoalReorder(goals, reorderGoals);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {delay: 100, tolerance: 10}
        })
    );

    const filteredGoals = goals.filter(goal => !goal.isDefault);

    if (isLoading) {
        return (
            <div className={styles.noGoalsMessage}>
                <Spinner/>
            </div>
        );
    }


    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleReorder}
            modifiers={[restrictToVerticalAxis]}
        >


            <SortableContext
                items={filteredGoals.map(goal => goal._id)}
                strategy={verticalListSortingStrategy}
            >
                <div className={styles.goalsListContainer}>

                    {filteredGoals.length > 0 ? (
                        filteredGoals.map(goal => (
                            <Goal key={goal._id} goal={goal}/>
                        ))
                    ) : (
                        <div className={styles.noGoalsMessage}>Create your first goal</div>
                    )}
                </div>
            </SortableContext>
        </DndContext>
    );
}

export default GoalList;
