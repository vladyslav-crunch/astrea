import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import styles from "./goal-list.module.css";
import Goal from "../goal/goal.tsx";
import { useGoalsByTopic, useReorderGoals } from "@/hooks/useGoal.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Spinner from "../../ui/common/spinner/spinner.tsx";
import { GoalWithStats } from "astrea-shared/types/goal.type.ts";
import { toast } from "sonner";

function GoalList() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const { data: goals = [], isLoading, isError } = useGoalsByTopic(topicId!);
  const { mutate: reorderGoals } = useReorderGoals(topicId!);

  const prevGoalsRef = useRef<GoalWithStats[]>([]);

  const [localGoals, setLocalGoals] = useState<GoalWithStats[]>([]);

  useEffect(() => {
    const filtered = goals.filter((goal) => !goal.isDefault);
    setLocalGoals(filtered);
  }, [goals]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setLocalGoals((items) => {
      const oldIndex = items.findIndex((g) => g._id === active.id);
      const newIndex = items.findIndex((g) => g._id === over.id);

      if (oldIndex === -1 || newIndex === -1) return items;

      const newOrder = arrayMove(items, oldIndex, newIndex);

      prevGoalsRef.current = items;

      reorderGoals(
        newOrder.map((goal, index) => ({
          _id: goal._id,
          order: index,
        })),
        {
          onError: () => {
            toast.error("Failed to reorder goals");
            setLocalGoals(prevGoalsRef.current);
          },
        },
      );

      return newOrder;
    });
  };

  if (isLoading) {
    return (
      <div className={styles.noGoalsMessage}>
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={localGoals.map((goal) => goal._id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.goalsListContainer}>
          {localGoals.length > 0 ? (
            localGoals.map((goal) => <Goal key={goal._id} goal={goal} />)
          ) : (
            <div className={styles.noGoalsMessage}>Create your first goal</div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default GoalList;
