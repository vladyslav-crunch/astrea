import styles from "./input.module.css";
import * as React from "react";

type InputProps = {
    label: string;
    icon?: string;
    hint?: string;
    error?: string;
    onHintClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({label, icon, hint, onHintClick, error, ...rest}, ref) => {
        return (
            <>
                <label className={styles.inputLabel}>{label}</label>
                <div className={styles.inputContainer}>
                    {hint && (
                        <p className={styles.inputHint} onClick={onHintClick}>
                            {hint}
                        </p>
                    )}
                    {error && (
                        <p className={styles.inputErrorHint}>{error}</p>
                    )
                    }

                    {icon && <img className={styles.icon} src={`/icons/${icon}.svg`} alt={icon}/>}
                    <input
                        className={`${styles.input} ${error && styles.inputError}`}
                        ref={ref}
                        {...rest}
                    />
                </div>
            </>
        );
    }
);

export default Input;
