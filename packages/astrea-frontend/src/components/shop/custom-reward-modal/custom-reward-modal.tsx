import Modal from "@/components/ui/common/modal/modal";
import Input, {
  INPUT_OPTION_CLASSES,
} from "@/components/ui/common/input/input";
import { useEffect, useState } from "react";
import { CircleDollarSign, Trash2 } from "lucide-react";
import styles from "./custom-reward-modal.module.css";

interface CustomRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
  initialCoins: number;
  initialDescription?: string;
  onSave: (title: string, coins: number, description?: string) => void;
  onDelete?: () => void;
}

function CustomRewardModal({
  isOpen,
  onClose,
  initialTitle,
  initialCoins,
  initialDescription,
  onSave,
  onDelete,
}: CustomRewardModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [coins, setCoins] = useState(initialCoins.toString());
  const [description, setDescription] = useState(initialDescription || "");

  // Update state when modal opens with new values
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setCoins(initialCoins.toString());
      setDescription(initialDescription || "");
    }
  }, [isOpen, initialTitle, initialCoins, initialDescription]);

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const coinsValue = parseInt(coins);

    if (trimmedTitle && coinsValue > 0 && !isNaN(coinsValue)) {
      onSave(trimmedTitle, coinsValue, trimmedDescription || undefined);
    }
  };

  const handleCoinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCoins(value);
    }
  };

  const isValid = title.trim() !== "" && coins !== "" && parseInt(coins) > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="400px">
      <Modal.Title>
        <h2 className={styles.modalTitle}>Edit Custom Reward</h2>
      </Modal.Title>

      <Modal.Content>
        <div className={styles.modalContent}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Title</label>
            <Input
              option={INPUT_OPTION_CLASSES.modal}
              type="text"
              placeholder="Enter reward title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Description (optional)</label>
            <Input
              option={INPUT_OPTION_CLASSES.modal}
              type="text"
              placeholder="Enter reward description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Coins</label>
            <div className={styles.coinsInputWrapper}>
              <Input
                option={INPUT_OPTION_CLASSES.modal}
                type="text"
                placeholder="Enter coin value"
                value={coins}
                onChange={handleCoinsChange}
              />
              <CircleDollarSign
                size={20}
                color={"#ef9f23"}
                className={styles.coinIcon}
              />
            </div>
          </div>
        </div>
      </Modal.Content>

      <Modal.Footer>
        <div className={styles.footerButtons}>
          {onDelete && (
            <button
              className={styles.deleteButton}
              onClick={onDelete}
              type="button"
            >
              <Trash2 size={18} />
            </button>
          )}
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={!isValid}
          >
            SAVE
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomRewardModal;
