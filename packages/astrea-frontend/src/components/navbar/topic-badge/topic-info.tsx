import { useTopic } from "@/hooks/useTopic";
import styles from "./topic-info.module.css";
import { useState } from "react";
import TopicEditModal from "@/components/ui/topics/modals/topic-edit-modal.tsx";

type TopicBadgeProps = {
  topicId: string;
};

function TopicInfo({ topicId }: TopicBadgeProps) {
  const { data: topic, isLoading, error, isError } = useTopic(topicId!);
  const [isEdit, setIsEdit] = useState(false);

  if (isLoading) {
    return <div className={styles.topicBadge}>Loading...</div>;
  }

  if (isError) {
    console.error("TopicInfo - Error loading topic:", error);
    return <div className={styles.topicBadge}>Error loading topic</div>;
  }

  if (!topic) {
    console.warn("TopicInfo - No topic data available");
    return null;
  }

  return (
    <>
      <div className={styles.topicWrapper} onClick={() => setIsEdit(true)}>
        <span className={styles.topicTitle}>{topic.title}</span>
      </div>
      <TopicEditModal
        isOpen={isEdit}
        onClose={() => setIsEdit(false)}
        topic={topic}
      />
    </>
  );
}

export default TopicInfo;
