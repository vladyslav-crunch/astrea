import React, { useState, useEffect } from "react";
import Modal from "../../common/modal/modal.tsx";
import IconPicker from "../../common/icon-picker/icon-picker.tsx";
import ColorPicker from "../../common/color-picker/color-picker.tsx";
import Input, { INPUT_OPTION_CLASSES } from "../../common/input/input.tsx";
import Button, {
  BUTTON_VARIANT,
  BUTTON_COLOR,
} from "../../common/button/button.tsx";
import { useUpdateTopic, useDeleteTopic } from "@/hooks/useTopic.ts";
import { toast } from "sonner";
import { Topic, updateTopicSchema } from "astrea-shared";
import ConfirmModal from "../../common/confirm-modal/confirm-modal.tsx";
import { Trash } from "lucide-react";

interface TopicEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic;
}

const TopicEditModal = ({ isOpen, onClose, topic }: TopicEditModalProps) => {
  const [title, setTitle] = useState(topic.title);
  const [icon, setIcon] = useState(topic.icon || "📝");
  const [color, setColor] = useState(topic.color || "#000000");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { mutate, isPending } = useUpdateTopic();
  const deleteTopicMutation = useDeleteTopic();

  useEffect(() => {
    setTitle(topic.title);
    setIcon(topic.icon || "📝");
    setColor(topic.color || "#000000");
  }, [topic]);

  const handleUpdate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const result = updateTopicSchema.safeParse({ title, color, icon });
    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Invalid input";
      toast.error(firstError, {
        icon: "⚠️",
      });
      return;
    }
    mutate(
      { topicId: topic._id, body: { title, color, icon } },
      {
        onSuccess: () => {
          onClose();
          toast.success("Topic updated successfully.");
        },
        onError: (error) => {
          console.error("Failed to update topic:", error);
          toast.error("Failed to update topic.");
        },
      },
    );
  };

  const confirmDelete = () => {
    deleteTopicMutation.mutate(topic._id, {
      onSuccess: () => {
        toast.success("Topic deleted successfully.");
        setIsConfirmOpen(false);
        onClose();
      },
      onError: (err) => {
        console.error("Delete failed:", err);
        toast.error("Failed to delete topic.");
      },
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Title>Edit topic</Modal.Title>
        <Modal.Content>
          <form
            onSubmit={handleUpdate}
            style={{
              width: "100%",
            }}
          >
            <div style={{ display: "flex", gap: "12px", width: "100%" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <ColorPicker value={color} onChange={setColor} />
                <IconPicker value={icon} onChange={setIcon} />
              </div>

              <div style={{ flexGrow: 1 }}>
                <Input
                  option={INPUT_OPTION_CLASSES.modal}
                  placeholder="Enter topic title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <Button
                buttonType={BUTTON_VARIANT.modal}
                buttonColor={BUTTON_COLOR.red}
                style={{ height: "50px", width: "50px" }}
                onClick={() => setIsConfirmOpen(true)}
                type="button"
              >
                <Trash color="#fff" size={20} />
              </Button>

              <Button
                buttonType={BUTTON_VARIANT.modal}
                type="submit"
                style={{ height: "50px", width: "100px", fontSize: "16px" }}
                disabled={isPending}
              >
                Update
              </Button>
            </div>
          </form>
        </Modal.Content>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete this topic?"
        message={`Are you sure you want to delete "${topic.title}"? This cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor={BUTTON_COLOR.red}
        isLoading={deleteTopicMutation.isPending}
      />
    </>
  );
};

export default TopicEditModal;
