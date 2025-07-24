import {useEffect, useState} from 'react';

type GoalProgressRingProps = {
    taskCount: number;
    in_progress: number;
    done: number;
};

const COLORS = {
    done: '#f5a1cd',
    inProgress: '#b0dce7',
    remaining: '#d9d9d9',
};

function GoalProgressRing({taskCount, in_progress, done}: GoalProgressRingProps) {
    const radius = 60;
    const stroke = 12;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const percentDone = taskCount ? done / taskCount : 0;
    const percentInProgress = taskCount ? in_progress / taskCount : 0;

    const targetDashDone = percentDone * circumference;
    const targetDashInProgress = percentInProgress * circumference;

    const [dashDone, setDashDone] = useState(0);
    const [dashInProgress, setDashInProgress] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDashDone(targetDashDone);
            setDashInProgress(targetDashInProgress);
        }, 100);
        return () => clearTimeout(timeout);
    }, [targetDashDone, targetDashInProgress]);

    return (
        <svg height={radius * 2} width={radius * 2}>
            {taskCount === 0 ? (
                <circle
                    stroke={COLORS.remaining}
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            ) : (
                <>
                    {/* Remaining */}
                    <circle
                        stroke={COLORS.remaining}
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    {/* Done */}
                    <circle
                        stroke={COLORS.done}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={`${dashDone} ${circumference}`}
                        strokeDashoffset={0}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        transform={`rotate(-90 ${radius} ${radius})`}
                        style={{transition: 'stroke-dasharray 0.8s ease'}}
                    />
                    {/* In Progress */}
                    <circle
                        stroke={COLORS.inProgress}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={`${dashInProgress} ${circumference}`}
                        strokeDashoffset={-dashDone}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        transform={`rotate(-90 ${radius} ${radius})`}
                        style={{transition: 'stroke-dasharray 0.8s ease, stroke-dashoffset 0.8s ease'}}
                    />
                </>
            )}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="20"
                fontWeight="500"
                fill="#555555"
            >
                {done}/{taskCount}
            </text>
        </svg>
    );
}

export default GoalProgressRing;