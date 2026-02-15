import { CircleDollarSign } from "lucide-react";
import { useState } from "react";
import styles from "./custom-reward-item.module.css";
import CustomRewardModal from "../custom-reward-modal/custom-reward-modal";
import { CustomReward } from "astrea-shared";
import { toast } from "sonner";

interface CustomRewardItemProps {
  reward: CustomReward;
  onUpdate: (
    id: string,
    title: string,
    coins: number,
    description?: string,
  ) => void;
  onClaim: (id: string) => void;
  onDelete: (id: string) => void;
  userCoins: number;
}

function CustomRewardItem({
  reward,
  onUpdate,
  onClaim,
  onDelete,
  userCoins,
}: CustomRewardItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const canAfford = userCoins >= reward.coins;

  const handleClaim = () => {
    if (!canAfford) {
      toast("Not enough coins to claim this reward");
      return;
    }
    if (canAfford && reward._id) {
      onClaim(reward._id);
    }
  };

  const handleUpdate = (title: string, coins: number, description?: string) => {
    if (reward._id) {
      onUpdate(reward._id, title, coins, description);
      setIsModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (reward._id) {
      onDelete(reward._id);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className={styles.customRewardItem}>
        <div
          className={styles.rewardContent}
          onClick={() => setIsModalOpen(true)}
        >
          <span className={styles.rewardTitle}>{reward.title}</span>
          <span className={styles.rewardDescription}>{reward.description}</span>
        </div>
        <button className={styles.claimButton} onClick={handleClaim}>
          <CircleDollarSign size={22} color={"#F6BC5E"} />
          {reward.coins}
        </button>
      </div>

      <CustomRewardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTitle={reward.title}
        initialCoins={reward.coins}
        initialDescription={reward.description}
        onSave={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  );
}

export default CustomRewardItem;
