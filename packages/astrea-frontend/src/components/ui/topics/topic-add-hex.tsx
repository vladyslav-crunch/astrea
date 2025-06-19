import styles from "./topic-add-hex.module.css";
import TopicCreateModal from "./modals/topic-create-modal.tsx";
import {useState} from "react";


function TopicAddHex() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className={styles.topicHolder} onClick={() => setModalOpen(true)}>
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
            <TopicCreateModal isOpen={modalOpen} onClose={() => setModalOpen(false)}/>
        </div>
    );
}


export default TopicAddHex;
