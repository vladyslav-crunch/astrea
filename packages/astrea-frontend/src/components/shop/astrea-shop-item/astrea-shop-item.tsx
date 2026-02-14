import type { ShopItem } from "astrea-shared";
import { useSession } from "@/hooks/useAuth.ts";
import { usePurchaseItem, useEquipItem } from "@/hooks/useShop.ts";
import styles from "./astrea-shop-item.module.css";
import { CircleDollarSign } from "lucide-react";

interface AstreaShopItemProps {
  item: ShopItem;
  variant?: "shop" | "inventory";
}

function AstreaShopItem({ item, variant = "shop" }: AstreaShopItemProps) {
  const { data: sessionData } = useSession();
  const purchaseItem = usePurchaseItem();
  const equipItem = useEquipItem();

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

  const canAfford = userCoins >= item.price;
  const meetsLevel = userLevel >= (item.requiredLevel ?? 1);

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
    if (variant === "shop" && owned) {
      return;
    }
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
    // If unowned in shop, handle purchase
    else if (
      variant === "shop" &&
      !owned &&
      canAfford &&
      meetsLevel &&
      !purchaseItem.isPending
    ) {
      handlePurchase();
    }
  };

  return (
    <div
      className={`${styles.shopItem} ${styles[variant]} ${owned ? styles.owned : ""} ${equipped ? styles.equipped : ""} ${variant === "inventory" && owned && (item.type === "border" || item.type === "title") ? styles.clickableItem : ""}`}
      onClick={handleItemClick}
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

      {/* Badges - only show in shop variant */}
      {variant === "shop" && owned && (
        <div className={styles.soldBadge}>SOLD</div>
      )}
      {variant === "shop" && equipped && (
        <div className={styles.equippedBadge}>EQUIPPED</div>
      )}
    </div>
  );
}

export default AstreaShopItem;
