import {useEffect, useState} from "react";
import ResizeObserver from "resize-observer-polyfill";

export function useHexGridLayout(containerRef: React.RefObject<HTMLElement | null>, itemCount: number) {
    const [rowStyles, setRowStyles] = useState({
        offset: new Set<number>(),
        shiftUp: new Set<number>()
    });

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

        const observer = new ResizeObserver(updateOffsets);
        observer.observe(container);
        window.addEventListener("resize", updateOffsets);

        // wait 2 frames
        const frame1 = requestAnimationFrame(() => {
            requestAnimationFrame(updateOffsets);
        });

        return () => {
            cancelAnimationFrame(frame1);
            observer.disconnect();
            window.removeEventListener("resize", updateOffsets);
        };
    }, [containerRef, itemCount]);

    return rowStyles;
}
