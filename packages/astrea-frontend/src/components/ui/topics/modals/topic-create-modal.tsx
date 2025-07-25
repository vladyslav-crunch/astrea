import {useState} from "react";
import Modal from "../../common/modal/modal.tsx";
import IconPicker from "../../common/icon-picker/icon-picker.tsx";
import ColorPicker from "../../common/color-picker/color-picker.tsx";
import Input, {INPUT_OPTION_CLASSES} from "../../common/input/input.tsx";
import Button, {BUTTON_VARIANT} from "../../common/button/button.tsx";
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

    const handleCreate = async (e?: React.FormEvent) => {
        e?.preventDefault();
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
                <form onSubmit={handleCreate}>
                    <div style={{display: "flex", gap: "12px", width: "100%"}}>
                        <div style={{display: "flex", gap: "8px"}}>
                            <ColorPicker value={color} onChange={setColor}/>
                            <IconPicker value={icon} onChange={setIcon}/>
                        </div>

                        <div style={{flexGrow: 1}}>
                            <Input
                                option={INPUT_OPTION_CLASSES.modal}
                                placeholder="Enter topic title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <Button
                            buttonType={BUTTON_VARIANT.modal}
                            type="submit" // ✅ allow form submit
                            style={{height: "50px", width: "100px", fontSize: "16px"}}
                            disabled={isPending}
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Modal.Content>
        </Modal>
    );
};

export default TopicCreateModal;
