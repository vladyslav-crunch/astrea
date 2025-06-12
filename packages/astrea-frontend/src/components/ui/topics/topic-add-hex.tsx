import styles from "./topic-add-hex.module.css";


function TopicAddHex() {
    return (
        <div className={styles.topicHolder}>
            <div className={styles.progressBar}>
                <svg className={`${styles.progress} ${styles.blue} noselect`} viewBox="0 0 776 628">
                    <path className={styles.track} d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z"/>
                    <path
                        className={styles.fill}
                        d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z"
                    />
                </svg>
            </div>

            <div
                className={styles.topicContentOuter}
                style={{
                    background: '#fad096' // fallback if color not defined
                }}
            >
                <div className={styles.topicContent}>
                    <span className={styles.icon}>+</span>
                </div>
            </div>
        </div>
    );
}


export default TopicAddHex;
