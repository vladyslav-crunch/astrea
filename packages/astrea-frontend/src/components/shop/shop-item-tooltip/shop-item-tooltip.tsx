import type { ShopItem } from "astrea-shared";
import { CircleDollarSign } from "lucide-react";
import styles from "./shop-item-tooltip.module.css";

interface ShopItemTooltipProps {
  item: ShopItem;
  position: { top: number; left: number };
}

function ShopItemTooltip({ item, position }: ShopItemTooltipProps) {
  return (
    <div
      className={styles.hoverTooltip}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateY(-50%)",
      }}
    >
      <div className={styles.tooltipContent}>
        <div className={styles.tooltipHeader}>
          <h4 className={styles.tooltipName}>{item.name}</h4>
          {item.rarity && (
            <span className={`${styles.tooltipRarity} ${styles[item.rarity]}`}>
              {item.rarity}
            </span>
          )}
        </div>

        {item.description && (
          <p className={styles.tooltipDescription}>{item.description}</p>
        )}

        <div className={styles.tooltipDetails}>
          <div className={styles.tooltipDetailRow}>
            <span className={styles.tooltipLabel}>Price:</span>
            <span className={styles.tooltipValue}>
              {item.price} <CircleDollarSign size={14} color={"#ef9f23"} />
            </span>
          </div>

          {item.requiredLevel && item.requiredLevel > 1 && (
            <div className={styles.tooltipDetailRow}>
              <span className={styles.tooltipLabel}>Level:</span>
              <span className={styles.tooltipValue}>{item.requiredLevel}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopItemTooltip;
