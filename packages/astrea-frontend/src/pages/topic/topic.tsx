import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useGoalsByTopic} from "../../hooks/useGoal.ts";
import TopicTabs from "../../components/topic/topic-tabs/topic-tabs.tsx";
import TaskBoard from "../../components/topic/task-board/task-board.tsx";
import styles from './topic.module.css';

const Topic = () => {
    const {id: topicId} = useParams<{ id: string }>();
    const {data: goals, isLoading, isError} = useGoalsByTopic(topicId!);
    const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

    useEffect(() => {
        if (goals && goals.length > 0 && !selectedGoalId) {
            setSelectedGoalId(goals[0]._id);
        }
    }, [goals, selectedGoalId]);

    if (isLoading) return <p>Loading goals...</p>;
    if (isError || !goals) return <p>Failed to load goals</p>;

    return (
        <div className={styles.topicContainer}>
            <TopicTabs goals={goals} onSelectGoal={setSelectedGoalId}/>
            <TaskBoard goalId={selectedGoalId}/>
        </div>
    );
};

export default Topic;
