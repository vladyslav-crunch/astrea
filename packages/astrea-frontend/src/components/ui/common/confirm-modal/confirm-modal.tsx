// components/common/confirm-modal/confirm-modal.tsx
import Modal from "../modal/modal";
import Button, {BUTTON_COLOR, BUTTON_VARIANT} from "../button/button";
import styles from "./confirm-modal.module.css";

type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: BUTTON_COLOR;
    isLoading?: boolean;
};

function ConfirmModal({
                          isOpen,
                          onClose,
                          onConfirm,
                          title = "Are you sure?",
                          message = "This action cannot be undone.",
                          confirmText = "Confirm",
                          cancelText = "Cancel",
                          confirmColor = BUTTON_COLOR.red,
                          isLoading = false,
                      }: ConfirmModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Title>{title}</Modal.Title>
            <Modal.Content>
                <p className={styles.message}>{message}</p>
            </Modal.Content>
            <Modal.Footer>
                <Button
                    buttonType={BUTTON_VARIANT.modal}
                    onClick={onClose}
                    disabled={isLoading}
                    style={{maxWidth: "100px"}}
                    buttonColor={BUTTON_COLOR.cancel}
                >
                    {cancelText}
                </Button>
                <Button
                    buttonType={BUTTON_VARIANT.modal}
                    buttonColor={confirmColor}
                    onClick={onConfirm}
                    disabled={isLoading}
                    style={{maxWidth: "100px"}}
                >
                    {isLoading ? "Processing..." : confirmText}

                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;
