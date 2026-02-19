import { TopicWithStats } from "astrea-shared";
import styles from "./topic-list-item.module.css";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import TopicEditModal from "../../../ui/topics/modals/topic-edit-modal.tsx";

type TopicListItemProps = {
  topic: TopicWithStats;
};
function TopicListItem({ topic }: TopicListItemProps) {
  const backgroundColor = topic.color || "#ccc";
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleClick = () => {
    navigate(`topic/${topic?._id}`);
  };

  const handleKebabClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div
        className={styles.topicListItemContainer}
        style={{ backgroundColor: backgroundColor }}
      >
        <div className={styles.topicListItemInfo} onClick={handleClick}>
          <span>{topic.icon}</span>
          <div>
            <p className={styles.topicListItemTitle}>{topic.title}</p>
            <p className={styles.topicListItemTasksQuantity}>
              {topic.taskCount ? `${topic.done}/${topic.taskCount}` : 0} tasks
            </p>
          </div>
        </div>
        {topic.dueToday ? (
          <span className={styles.topicListItemDueTasks}>{topic.dueToday}</span>
        ) : (
          ""
        )}
        <div
          className={styles.topicListItemKebabMenu}
          onClick={handleKebabClick}
        >
          <MoreVertical size={20} />
        </div>
      </div>
      <TopicEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        topic={topic}
      />
    </>
  );
}

export default TopicListItem;
