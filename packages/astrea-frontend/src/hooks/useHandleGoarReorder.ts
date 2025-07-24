import {arrayMove} from "@dnd-kit/sortable";
import {DragEndEvent} from "@dnd-kit/core";
import {GoalWithStats} from "astrea-shared/types/goal.type";

export function useHandleGoalReorder(goals: GoalWithStats[], reorder: (payload: {
    _id: string,
    order: number
}[]) => void) {
    return (event: DragEndEvent) => {
        const {active, over} = event;
        if (active.id !== over?.id) {
            const oldIndex = goals.findIndex(g => g._id === active.id);
            const newIndex = goals.findIndex(g => g._id === over?.id);
            const reordered = arrayMove(goals, oldIndex, newIndex);
            reorder(reordered.map((goal, i) => ({_id: goal._id, order: i})));
        }
    };
}
