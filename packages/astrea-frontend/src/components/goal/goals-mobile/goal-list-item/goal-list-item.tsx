import { GoalWithStats } from "astrea-shared/types/goal.type.ts";
import styles from "./goal-list-item.module.css";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import GoalEditModal from "../../../ui/goal/modals/goal-edit-modal.tsx";

type GoalListItemProps = {
  goal: GoalWithStats;
};

function GoalListItem({ goal }: GoalListItemProps) {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleClick = () => {
    navigate(`/topic/${goal.topicId}/${goal._id}`);
  };

  const handleKebabClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className={styles.goalListItemContainer} onClick={handleClick}>
        <div className={styles.goalListItemInfo}>
          <div>
            <p className={styles.goalListItemTitle}>{goal.title}</p>
            <p className={styles.goalListItemDescription}>{goal.description}</p>
            <p className={styles.goalListItemTasksQuantity}>
              {goal.taskCount
                ? `${goal.done}/${goal.taskCount} tasks`
                : "0 tasks"}
            </p>
          </div>
        </div>
        {goal.dueToday ? (
          <span className={styles.goalListItemDueTasks}>{goal.dueToday}</span>
        ) : (
          ""
        )}
        <div
          className={styles.goalListItemKebabMenu}
          onClick={handleKebabClick}
        >
          <MoreVertical size={20} />
        </div>
      </div>
      <GoalEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        goal={goal}
      />
    </>
  );
}

export default GoalListItem;
