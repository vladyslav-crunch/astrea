import type { TopicWithStats } from "astrea-shared";
import TopicListItem from "@/components/dashboard/topic-list/topic-list-item/topic-list-item.tsx";
import styles from "./topic-list.module.css";

type TopicListProps = {
  topics: (TopicWithStats | null)[];
};

function TopicList({ topics }: TopicListProps) {
  return (
    <div className={styles.topicListWrapper}>
      <p>Choose Activity</p>
      <div className={styles.topicListContainer}>
        {topics.length === 0 ? (
          <div>No topics available</div>
        ) : (
          topics.map((topic) =>
            topic ? <TopicListItem topic={topic} key={topic._id} /> : null,
          )
        )}
      </div>
    </div>
  );
}

export default TopicList;
