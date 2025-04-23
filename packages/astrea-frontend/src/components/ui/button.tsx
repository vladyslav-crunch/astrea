import * as React from "react";
import styles from "./button.module.css"


export enum BUTTON_TYPE_CLASSES {
    base = "base",
    purple = "purple",
    google = "google",
}


type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    buttonType?: BUTTON_TYPE_CLASSES;
};

function Button({children, onClick, buttonType = BUTTON_TYPE_CLASSES.base}: ButtonProps) {
    const buttonClass = `${styles.button} ${styles[buttonType]}`;
    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;