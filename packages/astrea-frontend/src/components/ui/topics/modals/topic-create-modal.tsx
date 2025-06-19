// components/modals/TopicCreateModal.tsx
import Modal from "../../modal";

interface TopicCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TopicCreateModal = ({isOpen, onClose}: TopicCreateModalProps) => {
    console.log("onClose", onClose);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Title>Create Topic</Modal.Title>
            <Modal.Content>
                Do you want to create a new topic here?
            </Modal.Content>
        </Modal>
    );
};

export default TopicCreateModal;
