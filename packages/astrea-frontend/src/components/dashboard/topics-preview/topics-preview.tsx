import { useMemo } from "react";
import { useTopics } from "@/hooks/useTopic.ts";
import TopicPreviewGrid from "../topic-grid/topic-preview-grid.tsx";

function TopicsPreview() {
  const { data: fetchedTopics, isLoading, error } = useTopics();
  const displayTopics = useMemo(() => {
    return fetchedTopics ? [...fetchedTopics, null] : [];
  }, [fetchedTopics]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return <TopicPreviewGrid topics={displayTopics} />;
}

export default TopicsPreview;
