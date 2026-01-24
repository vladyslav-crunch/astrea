import styles from "./input.module.css";
import * as React from "react";

export enum INPUT_OPTION_CLASSES {
    base = "base",
    modal = "modal",
    tabs = "tabs",
    error = "error",
    kanban = "kanban",
}

type InputProps = {
    label?: string;
    icon?: string;
    hint?: string;
    error?: string | null;
    option?: `${INPUT_OPTION_CLASSES}`;
    onHintClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;


const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({label, icon, hint, onHintClick, error, option = INPUT_OPTION_CLASSES.base, ...rest}, ref) => {
        const inputClass = `${styles.input} ${option ? styles[option] : ""} ${error ? styles.inputError : ""}`;
        return (
            <>

                {label && <label className={styles.inputLabel}>{label}</label>}
                <div className={styles.inputContainer}>
                    {hint && (
                        <p className={styles.inputHint} onClick={onHintClick}>
                            {hint}
                        </p>
                    )}

                    {icon && <img className={styles.icon} src={`/icons/auth/${icon}.svg`} alt={icon}/>}
                    <input className={inputClass} ref={ref} {...rest}/>
                    {error && (
                        <p className={option === INPUT_OPTION_CLASSES.modal ? styles.inputModalErrorHint : styles.inputErrorHint}>{error}</p>
                    )
                    }
                </div>
            </>
        );
    }
);

export default Input;
