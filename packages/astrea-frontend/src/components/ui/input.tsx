import styles from "./input.module.css";
import * as React from "react";

type InputProps = {
    label: string;
    icon?: string;
    hint?: string;
    onHintClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({label, icon, hint, onHintClick, ...rest}, ref) => {
        return (
            <>
                <label className={styles.inputLabel}>{label}</label>
                <div className={styles.inputContainer}>
                    {hint && (
                        <p className={styles.inputHint} onClick={onHintClick}>
                            {hint}
                        </p>
                    )}
                    {icon && <img className={styles.icon} src={`/icons/${icon}.svg`} alt={icon}/>}
                    <input
                        className={styles.input}
                        ref={ref}
                        {...rest}
                    />
                </div>
            </>
        );
    }
);

export default Input;
