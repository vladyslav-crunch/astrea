import {ReactNode, Children, isValidElement} from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({isOpen, onClose, children}: ModalProps) => {
    if (!isOpen) return null;

    const modalChildren = Children.map(children, (child) => {
        if (!isValidElement(child)) return null;
        return child;
    });

    return ReactDOM.createPortal(
        <div className={styles.backdropOverlay} onClick={(e) => {
            onClose()
            console.log(onClose)
            e.stopPropagation()
        }}>
            <div className={styles.modal} onClick={(e) => {
                e.stopPropagation()
            }}>
                <img
                    src={"icons/close.svg"}
                    className={styles.closeButton}
                    onClick={() => onClose()}
                    alt="close button"
                />
                {modalChildren}
            </div>
        </div>,
        document.body
    );
};

const Title = ({children}: { children: ReactNode }) => (
    <div className={styles.title}>{children}</div>
);

const Content = ({children}: { children: ReactNode }) => (
    <div className={styles.content}>{children}</div>
);

const Footer = ({children}: { children: ReactNode }) => (
    <div className={styles.footer}>{children}</div>
);

Modal.Title = Title;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
