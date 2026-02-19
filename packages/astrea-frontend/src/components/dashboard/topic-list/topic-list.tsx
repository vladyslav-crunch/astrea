import type { TopicWithStats } from "astrea-shared";
import TopicListItem from "@/components/dashboard/topic-list/topic-list-item/topic-list-item.tsx";
import styles from "./topic-list.module.css";
import { Plus } from "lucide-react";
import { useState } from "react";
import TopicCreateModal from "../../ui/topics/modals/topic-create-modal.tsx";

type TopicListProps = {
  topics: (TopicWithStats | null)[];
};

function TopicList({ topics }: TopicListProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return (
    <>
      <div className={styles.topicListWrapper}>
        {topics.length > 0 && <p>Choose Activity</p>}
        <div className={styles.topicListContainer}>
          {topics.length === 0 ? (
            <div className={styles.topicListNoTopic}>No topics created yet</div>
          ) : (
            topics.map((topic) =>
              topic ? <TopicListItem topic={topic} key={topic._id} /> : null,
            )
          )}
        </div>
        <span
          className={styles.addTopic}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus color={"#fff"} size={30} />
        </span>
      </div>
      <TopicCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}

export default TopicList;
