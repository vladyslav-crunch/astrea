import {useEffect, useMemo, useRef, useState} from "react";
import {useTopics} from "../../hooks/useTopic.ts";
import Topic from "./topic.tsx";
import styles from "./topics.module.css";
import TopicAddHex from "../ui/topics/topic-add-hex.tsx";
import ResizeObserver from "resize-observer-polyfill";


function Topics() {
    const {data: fetchedTopics, isLoading, error} = useTopics();
    const containerRef = useRef<HTMLDivElement>(null);

    const [rowStyles, setRowStyles] = useState<{
        offset: Set<number>;
        shiftUp: Set<number>;
    }>({offset: new Set(), shiftUp: new Set()});

    const displayTopics = useMemo(() => {
        return fetchedTopics ? [...fetchedTopics, null] : [];
    }, [fetchedTopics]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateOffsets = () => {
            const children = Array.from(container.children) as HTMLElement[];
            const rowMap = new Map<number, number[]>();

            children.forEach((el, i) => {
                const top = el.offsetTop;
                if (!rowMap.has(top)) rowMap.set(top, []);
                rowMap.get(top)!.push(i);
            });

            const offset = new Set<number>();
            const shiftUp = new Set<number>();
            const sortedRows = Array.from(rowMap.entries()).sort((a, b) => a[0] - b[0]);

            sortedRows.forEach(([_, indices], rowIndex) => {
                if (rowIndex > 0) {
                    indices.forEach(i => shiftUp.add(i));
                }
                if (rowIndex % 2 === 1 && indices.length > 0) {
                    offset.add(indices[0]);
                }
            });

            setRowStyles({offset, shiftUp});
        };

        const frame1 = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                updateOffsets();
            });
        });

        const observer = new ResizeObserver(() => {
            updateOffsets();
        });
        observer.observe(container);

        window.addEventListener("resize", updateOffsets);

        return () => {
            cancelAnimationFrame(frame1);
            observer.disconnect();
            window.removeEventListener("resize", updateOffsets);
        };
    }, [displayTopics]);


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className={styles.topicGrid} ref={containerRef}>
            {displayTopics.map((topic, index) => (
                <div
                    key={topic ? topic._id : "__add__"}
                    className={`${styles.topicItem} ${
                        rowStyles.offset.has(index) ? styles.offset : ""
                    } ${rowStyles.shiftUp.has(index) ? styles.shiftUp : ""}`}
                >
                    {topic ? <Topic topic={topic}/> : <TopicAddHex/>}
                </div>
            ))}
        </div>
    );
}

export default Topics;
