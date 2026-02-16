import { useMemo } from "react";
import { useTopics } from "@/hooks/useTopic.ts";
import TopicPreviewGrid from "../topic-grid/topic-preview-grid.tsx";
import { useMediaQuery } from "react-responsive";
import TopicList from "@/components/dashboard/topic-list/topic-list.tsx";
function TopicsPreview() {
  const { data: fetchedTopics, isLoading, error } = useTopics();
  const displayTopics = useMemo(() => {
    return fetchedTopics ? [...fetchedTopics, null] : [];
  }, [fetchedTopics]);

  const isMobile = useMediaQuery({ maxWidth: 850 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  if (isMobile) {
    return <TopicList topics={displayTopics} />;
  }

  return <TopicPreviewGrid topics={displayTopics} />;
}

export default TopicsPreview;
