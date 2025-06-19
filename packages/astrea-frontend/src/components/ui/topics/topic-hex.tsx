import {useEffect, useRef, useState} from 'react';
import styles from "./topic-hex.module.css";
import {Topic as TopicType} from "astrea-shared";

function TopicHex({topic}: { topic: TopicType }) {
    const [dashOffset, setDashOffset] = useState(2160);
    const [pathLength, setPathLength] = useState(2160); // default fallback
    const fillRef = useRef<SVGPathElement>(null);
    const [progress, setProgress] = useState<number>(60);

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
            {/*<div className={styles.todayTaskCounter}>*/}
            {/*    3*/}
            {/*</div>*/}
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
                        background: topic.color || '#d9c8ff' // fallback if color not defined
                    }}
                >
                    <div className={styles.topicContent}>
                        <span className={styles.icon}>{topic.icon}</span>
                        <span className={styles.text}>{topic.title}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default TopicHex;
