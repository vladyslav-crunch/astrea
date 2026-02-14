import type { ShopItem } from "astrea-shared";
import Modal from "@/components/ui/common/modal/modal";
import { CircleDollarSign } from "lucide-react";
import styles from "./shop-item-modal.module.css";

interface ShopItemModalProps {
  item: ShopItem;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
  userLevel: number;
  userCoins: number;
  owned: boolean;
  equipped: boolean;
}

function ShopItemModal({
  item,
  isOpen,
  onClose,
  onPurchase,
  userLevel,
  userCoins,
  owned,
  equipped,
}: ShopItemModalProps) {
  const canAfford = userCoins >= item.price;
  const meetsLevel = userLevel >= (item.requiredLevel ?? 1);
  const canPurchase = !owned && canAfford && meetsLevel;

  const handlePurchase = () => {
    if (canPurchase) {
      onPurchase();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="400px">
      <Modal.Title>
        <div className={styles.modalHeader}>
          <h2 className={styles.itemName}>{item.name}</h2>
          <div className={styles.badges}>
            {item.rarity && (
              <span className={`${styles.rarityBadge} ${styles[item.rarity]}`}>
                {item.rarity}
              </span>
            )}
            {item.requiredLevel && item.requiredLevel > 1 && (
              <span className={styles.levelBadge}>
                LEVEL {item.requiredLevel}
              </span>
            )}
          </div>
        </div>
      </Modal.Title>

      <Modal.Content>
        <div className={styles.modalContent}>
          {/* Preview Section */}
          <div className={styles.previewSection}>
            {item.type === "border" && item.color && (
              <div
                className={styles.borderPreview}
                style={{
                  border: `6px solid ${item.color}`,
                  background: "#e0e0e0",
                }}
              />
            )}
            {item.type === "title" && (
              <div
                className={styles.titlePreview}
                style={{ color: item.color }}
              >
                {item.name}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className={styles.infoSection}>
            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}

            <div className={styles.priceSection}>
              <div className={styles.priceDisplay}>
                <span className={styles.priceAmount}>{item.price}</span>
                <CircleDollarSign size={22} color={"#FF9B65"} />
              </div>
              {!canAfford && !owned && (
                <span className={styles.warningText}>Not enough coins</span>
              )}
              {!meetsLevel && !owned && (
                <span className={styles.warningText}>
                  Level {item.requiredLevel} required
                </span>
              )}
            </div>

            {owned && (
              <div className={styles.ownedBadge}>
                ✓ Already Owned
                {equipped && (
                  <span className={styles.equippedText}> & Equipped</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Modal.Content>

      <Modal.Footer>
        <div className={styles.footerButtons}>
          {!owned && (
            <button
              className={styles.buyButton}
              onClick={handlePurchase}
              disabled={!canPurchase}
            >
              BUY
            </button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ShopItemModal;
