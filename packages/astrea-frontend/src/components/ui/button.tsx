import * as React from "react";
import styles from "./button.module.css"


export enum BUTTON_TYPE_CLASSES {
    base = "base",
    purple = "purple",
    google = "google",
}


type ButtonProps = {
    children: React.ReactNode;
    buttonType?: BUTTON_TYPE_CLASSES;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({children, buttonType = BUTTON_TYPE_CLASSES.base, ...rest}: ButtonProps) {
    const buttonClass = `${styles.button} ${styles[buttonType]}`;
    return (
        <button className={buttonClass} {...rest}>
            {children}
        </button>
    );
}

export default Button;