import {useEffect, useRef, useState} from 'react';
import styles from "./topic-hex.module.css";
import {type TopicWithStats} from "astrea-shared";
import {motion} from "motion/react"

function TopicHex({topic}: { topic: TopicWithStats }) {
    const [dashOffset, setDashOffset] = useState(2160);
    const [pathLength, setPathLength] = useState(2160);
    const [hovered, setHovered] = useState(false);
    const fillRef = useRef<SVGPathElement>(null);
    const totalTasks = topic.taskCount;
    const progress = totalTasks === 0
        ? 100
        : (topic.done / totalTasks) * 100;

    useEffect(() => {
        if (fillRef.current) {
            const length = fillRef.current.getTotalLength();
            setPathLength(length);
            const offset = ((100 - progress) / 100) * pathLength;
            setDashOffset(offset);
        }
    }, [pathLength]);

    return (
        <div className={styles.topicContainer}>
            {topic.dueToday != 0 && <div className={styles.todayTaskCounter}>
                {topic.dueToday}
            </div>}
            <div className={styles.topicHolder}>
                <div className={styles.progressBar}>
                    <svg className={`${styles.progress} noselect`} viewBox="0 0 776 628">
                        <path className={styles.track}
                              d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z"/>
                        <path
                            ref={fillRef}
                            className={`${styles.fill} ${progress === 0 ? styles.noTransition : ''}`}
                            d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z"
                            style={{
                                strokeDasharray: pathLength,
                                strokeDashoffset: dashOffset
                            }}
                        />
                    </svg>
                </div>

                <div
                    className={styles.topicContentOuter}
                    style={{
                        background: topic.color || '#d9c8ff'
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <div className={styles.topicContent}>
                        <span className={styles.icon}>{topic.icon}</span>
                        <span className={styles.text}>{topic.title}</span>
                    </div>

                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: hovered ? 1 : 0, y: hovered ? 0 : 10}}
                        transition={{duration: 0.3, ease: 'easeOut'}}
                        className={styles.statsOverlay}
                        style={{
                            backgroundColor: topic.color || 'rgb(215, 198, 253)'
                        }}
                    >
                        <div className={styles.statsText}><p>Overall</p><span>{topic.taskCount}</span></div>
                        <div className={styles.statsText}><p>Upcoming</p><span>{topic.upcoming}</span></div>
                        <div className={styles.statsText}><p>In progress</p><span>{topic.in_progress}</span>
                        </div>
                        <div className={styles.statsText}><p>Done</p><span>{topic.done}</span></div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}


export default TopicHex;
