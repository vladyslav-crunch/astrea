import {useEffect, useRef, useState} from 'react';
import {motion} from 'motion/react';
import type {TopicWithStats} from 'astrea-shared';
import styles from './hex-tile.module.css';
import TopicCreateModal from "../modals/topic-create-modal.tsx";
import {useNavigate} from "react-router-dom";

type HexTileProps = {
    topic?: TopicWithStats;
    isAddTile?: boolean;
};

function HexTile({topic, isAddTile = false}: HexTileProps) {
    const [dashOffset, setDashOffset] = useState(2160);
    const [pathLength, setPathLength] = useState(2160);
    const [hovered, setHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const fillRef = useRef<SVGPathElement>(null);
    const totalTasks = topic?.taskCount ?? 0;
    const progress = totalTasks === 0 ? 100 : (topic!.done / totalTasks) * 100;
    const navigate = useNavigate();
    useEffect(() => {
        if (fillRef.current && !isAddTile) {
            const length = fillRef.current.getTotalLength();
            setPathLength(length);
            const offset = ((100 - progress) / 100) * length;
            setDashOffset(offset);
        }
    }, [pathLength, progress, isAddTile]);

    const handleClick = () => {
        if (isAddTile) {
            setModalOpen(true);
        } else {
            navigate(`topic/${topic?._id}`)
        }
    };

    return (
        <div className={styles.topicContainer}>
            {!isAddTile && topic?.dueToday !== 0 && (
                <div className={styles.todayTaskCounter}>{topic?.dueToday}</div>
            )}
            <div
                className={styles.topicHolder}
                onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className={styles.progressBar}>
                    <svg className={`${styles.progress} noselect`} viewBox="0 0 776 628">
                        <path className={styles.track}
                              d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z"/>
                        <path
                            ref={fillRef}
                            className={`${styles.fill} ${!isAddTile && progress === 0 ? styles.noTransition : ''}`}
                            d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z"
                            style={!isAddTile ? {
                                strokeDasharray: pathLength,
                                strokeDashoffset: dashOffset
                            } : {
                                stroke: 'rgba(255, 242, 200, 25)',

                            }}
                        />
                    </svg>
                </div>

                <div
                    className={styles.topicContentOuter}
                    style={{
                        background: topic?.color || (isAddTile ? '#fad096' : '#F3C98B')
                    }}
                >
                    <div className={styles.topicContent}>
                        <span className={styles.icon}>{isAddTile ? '+' : topic?.icon}</span>
                        {!isAddTile && <span className={styles.text}>{topic?.title}</span>}
                    </div>

                    {!isAddTile && topic && (
                        <motion.div
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: hovered ? 1 : 0, y: hovered ? 0 : 10}}
                            transition={{duration: 0.3, ease: 'easeOut'}}
                            className={styles.statsOverlay}
                            style={{backgroundColor: topic?.color || 'rgb(215, 198, 253)'}}
                        >
                            <div className={styles.statsText}><p>Overall</p><span>{topic.taskCount}</span></div>
                            <div className={styles.statsText}><p>Upcoming</p><span>{topic.upcoming}</span></div>
                            <div className={styles.statsText}><p>In progress</p><span>{topic.in_progress}</span></div>
                            <div className={styles.statsText}><p>Done</p><span>{topic.done}</span></div>
                        </motion.div>
                    )}
                </div>
            </div>

            {isAddTile && <TopicCreateModal isOpen={modalOpen} onClose={() => setModalOpen(false)}/>}
        </div>
    );
}

export default HexTile;
