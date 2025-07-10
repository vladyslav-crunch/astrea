import {useState} from 'react';
import styles from './topic-tabs.module.css';
import Goals from "../goals/goals.tsx";
import {GoalWithStats} from "astrea-shared/types/goal.type.ts";

type Tab = 'goals' | 'tasks';

type TopicTabProps = {
    goals: GoalWithStats[];
    onSelectGoal: (goalId: string) => void;
}


function TopicTabs({goals, onSelectGoal}: TopicTabProps) {
    const [activeTab, setActiveTab] = useState<Tab>('goals');

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabHeader}>
                <button
                    className={`${styles.tab} ${activeTab === 'goals' ? styles.active : ''}`}
                    onClick={() => setActiveTab('goals')}
                >
                    Goals
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'tasks' ? styles.active : ''}`}
                    onClick={() => setActiveTab('tasks')}
                >
                    Tasks
                </button>
            </div>

            <div className={styles.tabContent}>
                {activeTab === 'goals' && <Goals goals={goals} onSelectGoal={onSelectGoal}/>}
            </div>
        </div>
    );
}

export default TopicTabs;
