import {useMemo} from "react";
import {useTopics} from "../../../hooks/useTopic.ts";
import TopicGrid from "../topic-grid/topic-grid.tsx";

function Topics() {
    const {data: fetchedTopics, isLoading, error} = useTopics();

    const displayTopics = useMemo(() => {
        return fetchedTopics ? [...fetchedTopics, null] : [];
    }, [fetchedTopics]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return <TopicGrid topics={displayTopics}/>;
}

export default Topics;
