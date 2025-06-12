import {useTopics} from "../../hooks/useTopic.ts";
import Topic from "./topic.tsx";
import styles from "./topics.module.css"
import TopicAddHex from "../ui/topics/topic-add-hex.tsx";

function Topics() {
    const {data: topics, isLoading, error} = useTopics();

    if (isLoading) return <div></div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className={styles.topicGrid}>
            {topics && topics.map(topic => (
                <div key={topic._id}><Topic topic={topic}/></div>
            ))}
            <TopicAddHex/>
        </div>
    );
}


export default Topics;