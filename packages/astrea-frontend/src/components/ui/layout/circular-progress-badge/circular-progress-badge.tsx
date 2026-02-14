import styles from "./circular-progress-badge.module.css";

interface CircularProgressBadgeProps {
  exp: number;
  level: number;
  imageSrc: string;
  size: number;
  progressColor?: string;
  backgroundColor?: string;
  showLevelBadge?: boolean;
  levelBadgeColor?: string;
  levelBadgeTextColor?: string;
}

function CircularProgressBadge({
  exp,
  level,
  imageSrc,
  size,
  progressColor = "#9769FF",
  backgroundColor = "#fff",
  showLevelBadge = false,
  levelBadgeColor = "#9769FF",
  levelBadgeTextColor = "#fff",
}: CircularProgressBadgeProps) {
  const nextLevelExp = (level - 1) * 25 + 50;
  const progress = Math.min(exp / nextLevelExp, 1);
  const radius = size / 2;
  const stroke = 5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;
  const rotationAngle = 90;
  const badgeSize = size * 0.3;

  return (
    <div
      className={styles.badgeContainer}
      style={{ position: "relative", display: "inline-block" }}
    >
      <svg
        height={radius * 2}
        width={radius * 2}
        className={styles.progressCircle}
      >
        <circle
          stroke={backgroundColor}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={progressColor}
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

      {showLevelBadge && (
        <div
          className={styles.levelBadge}
          style={{
            position: "absolute",
            top: -badgeSize / 2,
            left: "50%",
            transform: "translateX(-50%)",
            width: badgeSize,
            height: badgeSize,
            borderRadius: "50%",
            backgroundColor: levelBadgeColor,
            color: levelBadgeTextColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: badgeSize * 0.5,
            border: `2px solid ${backgroundColor}`,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          {level}
        </div>
      )}
    </div>
  );
}

export default CircularProgressBadge;
