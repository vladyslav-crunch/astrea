import styles from "./topic-grid.module.css";
import HexTile from "../../ui/topics/hex-tile/hex-tile.tsx";
import type {TopicWithStats} from "astrea-shared";
import {useHexGridLayout} from "../../../hooks/useHexGridLayout.ts";
import {useRef} from "react";

type Props = {
    topics: (TopicWithStats | null)[];
};

function TopicGrid({topics}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const layout = useHexGridLayout(containerRef, topics.length);

    return (
        <div className={styles.topicGrid} ref={containerRef}>
            {topics.map((topic, index) => (
                <div
                    key={topic ? topic._id : "__add__"}
                    className={`${styles.topicItem} ${
                        layout.offset.has(index) ? styles.offset : ""
                    } ${layout.shiftUp.has(index) ? styles.shiftUp : ""}`}
                >
                    {topic ? <HexTile topic={topic}/> : <HexTile isAddTile/>}
                </div>
            ))}
        </div>
    );
}

export default TopicGrid;
