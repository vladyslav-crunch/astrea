import {useState} from "react";
import {
    DndContext,
    closestCenter,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {GoalWithStats} from "astrea-shared/types/goal.type.ts";
import Goal from "../goal/goal.tsx";
import styles from "./goals.module.css";
import {useCreateGoal, useReorderGoals} from "../../../hooks/useGoal.ts";
import {useParams} from "react-router-dom";
import Input from "../../ui/common/input/input.tsx";
import {toast} from "sonner";

type GoalsProps = {
    goals: GoalWithStats[];
    onSelectGoal: (goalId: string) => void;
};

function Goals({goals, onSelectGoal}: GoalsProps) {
    const {id: topicId} = useParams<{ id: string }>();
    const [titleInput, setTitleInput] = useState("");
    const {mutate: reorderGoalsMutation} = useReorderGoals(topicId!);
    const {mutate: createGoalMutation} = useCreateGoal(topicId!);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 10,
            },
        })
    );
    const handleCreateGoal = () => {
        const trimmed = titleInput.trim();
        if (!trimmed) return;

        createGoalMutation(
            {title: trimmed},
            {
                onSuccess: () => {
                    setTitleInput("");
                    toast.success("Goal created successfully.");
                },
                onError: (error) => {
                    console.error("Failed to create goal:", error);
                    toast.error("Failed to create goal.");
                }
            }
        );
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCreateGoal();
        }
    };
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (active.id !== over?.id) {
            const oldIndex = goals.findIndex(goal => goal._id === active.id);
            const newIndex = goals.findIndex(goal => goal._id === over?.id);
            const reordered = arrayMove(goals, oldIndex, newIndex);

            reorderGoalsMutation(
                reordered.map((goal, index) => ({
                    _id: goal._id,
                    order: index
                }))
            );
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
        >
            <div className={styles.inputWrapper}>
                <Input
                    variant={"tabs"}
                    type="text"
                    placeholder="+ Add new goal"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
            <SortableContext
                items={goals.map(goal => goal._id)}
                strategy={verticalListSortingStrategy}
            >
                <div className={styles.goalsContainer}>
                    {goals.map(goal => (
                        <Goal key={goal._id} goal={goal} onSelectGoal={onSelectGoal}/>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}

export default Goals;
