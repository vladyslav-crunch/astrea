import {TopicWithStats} from "astrea-shared";
import TopicHex from "../ui/topics/topic-hex.tsx";

function Topic({topic}: { topic: TopicWithStats }) {
    return (
        <TopicHex topic={topic}/>
    )

}

export default Topic;