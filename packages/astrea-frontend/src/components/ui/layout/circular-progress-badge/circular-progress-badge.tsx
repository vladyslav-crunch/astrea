import styles from "./circular-progress-badge.module.css";

interface CircularProgressBadgeProps {
    exp: number;
    level: number;
    imageSrc: string;
    size: number;
}

function CircularProgressBadge({exp, level, imageSrc, size}: CircularProgressBadgeProps) {
    const nextLevelExp = (level - 1) * 25 + 50;
    const progress = Math.min(exp / nextLevelExp, 1);
    const radius = size / 2;
    const stroke = 5;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;
    const rotationAngle = 90;

    return (
        <svg
            height={radius * 2}
            width={radius * 2}
            className={styles.progressCircle}
        >
            <circle
                stroke="#fff"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke="#9769FF"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                transform={`rotate(${rotationAngle} ${radius} ${radius})`}
            />
            <image
                href={imageSrc}
                x={radius - size / 2}
                y={radius - size / 2}
                height={size}
                width={size}
                clipPath={`circle(${size / 2 - stroke}px at center)`}
            />
        </svg>
    );
}

export default CircularProgressBadge;
