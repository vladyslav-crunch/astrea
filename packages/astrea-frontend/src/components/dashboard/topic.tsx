import {Topic as TopicType} from "astrea-shared";
import TopicHex from "../ui/topics/topic-hex.tsx";

function Topic({topic}: { topic: TopicType }) {
    return (
        <TopicHex topic={topic}/>
    )

}

export default Topic;