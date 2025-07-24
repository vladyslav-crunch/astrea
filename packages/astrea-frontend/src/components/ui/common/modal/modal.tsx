import {ReactNode, Children, isValidElement, useRef} from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import {AnimatePresence, motion} from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({isOpen, onClose, children}: ModalProps) => {
    const backdropRef = useRef<HTMLDivElement>(null);
    const mouseDownTarget = useRef<EventTarget | null>(null);

    const modalChildren = Children.map(children, (child) =>
        isValidElement(child) ? child : null
    );

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={backdropRef}
                    className={styles.backdropOverlay}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onMouseDown={(e) => {
                        mouseDownTarget.current = e.target;
                    }}
                    onMouseUp={(e) => {
                        if (
                            mouseDownTarget.current === e.target &&
                            e.target === backdropRef.current
                        ) {
                            onClose();
                        }
                    }}
                >
                    <motion.div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                        initial={{scale: 0.95, opacity: 0, y: -10}}
                        animate={{scale: 1, opacity: 1, y: 0}}
                        exit={{scale: 0.95, opacity: 0, y: -10}}
                        transition={{duration: 0.15, ease: "easeOut"}}
                    >
                        <img
                            src={"/icons/close.svg"}
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