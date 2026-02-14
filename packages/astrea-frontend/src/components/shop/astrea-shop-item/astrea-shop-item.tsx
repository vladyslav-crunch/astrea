import type { ShopItem } from "astrea-shared";
import { useSession } from "@/hooks/useAuth.ts";
import { usePurchaseItem, useEquipItem } from "@/hooks/useShop.ts";
import styles from "./astrea-shop-item.module.css";
import { CircleDollarSign } from "lucide-react";
import { useRef, useState } from "react";
import ShopItemTooltip from "../shop-item-tooltip/shop-item-tooltip";
import ShopItemModal from "../shop-item-modal/shop-item-modal";

interface AstreaShopItemProps {
  item: ShopItem;
  variant?: "shop" | "inventory";
}

function AstreaShopItem({ item, variant = "shop" }: AstreaShopItemProps) {
  const { data: sessionData } = useSession();
  const purchaseItem = usePurchaseItem();
  const equipItem = useEquipItem();
  const itemRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = sessionData?.user;
  const userCoins = user?.coins ?? 0;
  const userLevel = user?.level ?? 1;
  const userInventory = user?.inventory ?? [];
  const equippedBorder = user?.border;
  const equippedTitle = user?.title;

  const owned = userInventory.includes(item._id!);
  const equipped =
    item.type === "border"
      ? equippedBorder === item._id
      : item.type === "title"
        ? equippedTitle === item._id
        : false;

  const handlePurchase = () => {
    if (item._id) {
      purchaseItem.mutate(item._id);
    }
  };

  const handleEquip = () => {
    if (item._id && (item.type === "border" || item.type === "title")) {
      equipItem.mutate({ itemId: item._id, type: item.type });
    }
  };

  const handleUnequip = () => {
    if (item.type === "border" || item.type === "title") {
      equipItem.mutate({ itemId: "", type: item.type });
    }
  };

  const handleItemClick = () => {
    // For shop variant, always open modal
    if (variant === "shop") {
      setShowTooltip(false); // Hide tooltip when opening modal
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      setIsModalOpen(true);
      return;
    }

    // For inventory variant, handle equip/unequip
    if (
      variant === "inventory" &&
      owned &&
      (item.type === "border" || item.type === "title")
    ) {
      if (equipped) {
        handleUnequip();
      } else {
        handleEquip();
      }
    }
  };

  const handleMouseEnter = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + rect.height / 2, // Center vertically with the item
        left: rect.right + 10, // Position to the right with 10px gap
      });

      // Set a timer to show tooltip after 500ms
      hoverTimerRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, 300);
    }
  };

  const handleMouseLeave = () => {
    // Clear the timer if mouse leaves before 500ms
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setShowTooltip(false);
  };

  return (
    <>
      <div
        ref={itemRef}
        className={`${styles.shopItem} ${styles[variant]} ${owned ? styles.owned : ""} ${equipped ? styles.equipped : ""} ${variant === "inventory" && owned && (item.type === "border" || item.type === "title") ? styles.clickableItem : ""}`}
        onClick={handleItemClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={
          variant === "inventory" &&
          owned &&
          (item.type === "border" || item.type === "title")
            ? equipped
              ? "Click to unequip"
              : "Click to equip"
            : variant === "shop" && owned
              ? "Already owned"
              : undefined
        }
      >
        {/* Hover Tooltip */}
        {showTooltip && (
          <ShopItemTooltip item={item} position={tooltipPosition} />
        )}

        <div className={styles.itemPreview}>
          {item.type === "border" && item.color && (
            <div
              className={styles.borderPreview}
              style={{
                border: `4px solid ${item.color}`,
                background: "#ddd",
              }}
            />
          )}
          {item.type === "title" && (
            <div className={styles.titlePreview} style={{ color: item.color }}>
              {item.name}
            </div>
          )}
        </div>

        {/* Footer - always show */}
        <div
          className={`${styles.itemFooter} ${!item.requiredLevel || item.requiredLevel <= 1 ? styles.centered : ""}`}
        >
          <div className={styles.itemPrice}>
            <span>
              {item.price} <CircleDollarSign size={19} color={"#ef9f23"} />
            </span>
          </div>
          {item.requiredLevel && item.requiredLevel > 1 && (
            <div className={styles.levelRequirement}>
              {item.requiredLevel} lvl
            </div>
          )}
        </div>
      </div>

      {/* Shop Item Modal - rendered outside shop item div */}
      <ShopItemModal
        item={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPurchase={handlePurchase}
        userLevel={userLevel}
        userCoins={userCoins}
        owned={owned}
        equipped={equipped}
      />
    </>
  );
}

export default AstreaShopItem;
