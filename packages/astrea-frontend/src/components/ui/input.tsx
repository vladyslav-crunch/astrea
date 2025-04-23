import styles from "./input.module.css"

type InputType = {
    type: string,
    label: string,
    placeholder: string,
    icon?: string,
    hint?: string,
    onHintClick?: () => void,
}

function Input({type, label, placeholder, icon, hint, onHintClick}: InputType) {
    return (
        <>
            <label className={styles.inputLabel}>{label}</label>
            <div className={styles.inputContainer}>
                {hint && <p className={styles.inputHint} onClick={onHintClick}>{hint}</p>}
                <img className={styles.icon} src={`/icons/${icon}.svg`} alt="icon"/>
                <input className={styles.input} type={type} placeholder={placeholder}/>
            </div>
        </>
    );
}

export default Input;