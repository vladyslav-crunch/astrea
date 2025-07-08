import {useState} from "react";
import Modal from "../../common/modal/modal.tsx";
import IconPicker from "../../common/icon-picker/icon-picker.tsx";
import ColorPicker from "../../common/color-picker/color-picker.tsx";
import Input from "../../common/input/input.tsx";
import Button, {BUTTON_TYPE_CLASSES} from "../../common/button/button.tsx";
import {useCreateTopic} from "../../../../hooks/useTopic.ts";
import {toast} from "sonner";
import {createTopicSchema} from "astrea-shared";


interface TopicCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TopicCreateModal = ({isOpen, onClose}: TopicCreateModalProps) => {
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("🎯");
    const [color, setColor] = useState("#d9c8ff");
    const {mutate, isPending} = useCreateTopic();

    const handleCreate = async () => {
        const result = createTopicSchema.safeParse({title, color, icon});
        if (!result.success) {
            const firstError = result.error.errors[0]?.message || "Invalid input";
            toast.error(firstError, {
                icon: "⚠️",
            });
            return;
        }
        mutate(
            {title, color, icon},
            {
                onSuccess: () => {
                    onClose();
                    setTitle("");
                    setIcon("🎯");
                    setColor("#d9c8ff");
                    toast.success("Topic created successfully.");
                },
                onError: (error) => {
                    console.error("Failed to create topic:", error);
                }
            }
        );
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Title>Create new topic</Modal.Title>
            <Modal.Content>
                <div style={{display: "flex", gap: "12px", width: "100%"}}>
                    <div style={{display: "flex", gap: "8px"}}>
                        <ColorPicker value={color} onChange={setColor}/>
                        <IconPicker value={icon} onChange={setIcon}/>
                    </div>

                    <div style={{flexGrow: 1}}>
                        <Input
                            variant="modal"
                            placeholder="Enter topic title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <Button
                        buttonType={BUTTON_TYPE_CLASSES.purple}
                        onClick={handleCreate}
                        style={{height: "50px", width: "100px", fontSize: "16px"}}
                        disabled={isPending}
                    >
                        Create
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default TopicCreateModal;
