import styles from './hexagon-icon.module.css';

type HexagonIconProps = {
    size?: number;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

export default function HexagonIcon({size = 90, children, onClick, className = ''}: HexagonIconProps) {
    return (
        <div
            className={`${styles.hexagon} ${className}`}
            style={{
                width: size,
                height: size,
            }}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
