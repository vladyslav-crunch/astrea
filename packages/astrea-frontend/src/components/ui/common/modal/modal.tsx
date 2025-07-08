import {ReactNode, Children, isValidElement} from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import {AnimatePresence, motion} from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({isOpen, onClose, children}: ModalProps) => {
    const modalChildren = Children.map(children, (child) => {
        if (!isValidElement(child)) return null;
        return child;
    });

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.backdropOverlay}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    <motion.div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()} // prevent close on inner content
                        initial={{scale: 0.95, opacity: 0, y: -10}}
                        animate={{scale: 1, opacity: 1, y: 0}}
                        exit={{scale: 0.95, opacity: 0, y: -10}}
                        transition={{duration: 0.15, ease: "easeOut"}}
                    >
                        <img
                            src={"icons/close.svg"}
                            className={styles.closeButton}
                            onClick={onClose}
                            alt="close button"
                        />
                        {modalChildren}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
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