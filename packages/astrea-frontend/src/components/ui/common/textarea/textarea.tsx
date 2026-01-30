import styles from "./textarea.module.css";
import * as React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum TEXTAREA_OPTION_CLASSES {
  base = "base",
  modal = "modal",
  error = "error",
}

type TextareaProps = {
  label?: string;
  hint?: string;
  error?: string | null;
  option?: `${TEXTAREA_OPTION_CLASSES}`;
  onHintClick?: () => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      hint,
      error,
      option = TEXTAREA_OPTION_CLASSES.base,
      onHintClick,
      ...rest
    },
    ref,
  ) => {
    const textareaClass = `${styles.textArea} ${option ? styles[option] : ""} ${error ? styles.inputError : ""}`;

    return (
      <>
        {label && <label className={styles.textAreaLabel}>{label}</label>}
        <div className={styles.textAreaContainer}>
          {hint && (
            <p className={styles.inputHint} onClick={onHintClick}>
              {hint}
            </p>
          )}

          <textarea ref={ref} className={textareaClass} {...rest} />
          {error && <p className={styles.textAreaErrorHint}>{error}</p>}
        </div>
      </>
    );
  },
);

export default Textarea;
