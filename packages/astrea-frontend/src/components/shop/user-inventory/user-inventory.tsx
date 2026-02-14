import type { ShopItem } from "astrea-shared";
import { useSession } from "@/hooks/useAuth.ts";
import AstreaShopItem from "../astrea-shop-item/astrea-shop-item";
import styles from "./user-inventory.module.css";
import UserInventoryBadge from "@/components/shop/user-inventory/user-inventory-badge/user-inventory-badge.tsx";
import UserInventoryExp from "@/components/shop/user-inventory/user-inventory-exp/user-inventory-exp.tsx";
import { CircleDollarSign } from "lucide-react";

interface UserInventoryProps {
  items: ShopItem[];
  isLoading: boolean;
}

function UserInventory({ items, isLoading }: UserInventoryProps) {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;
  return (
    <div className={styles.inventorySection}>
      <div className={styles.inventoryHeader}>
        <div className={styles.inventoryUserImage}>
          <UserInventoryBadge user={user!} items={items} />
        </div>
        <div className={styles.inventoryUserStats}>
          <UserInventoryExp />
          <div className={styles.inventoryCoins}>
            <p className={styles.inventoryCoinsHeader}>
              Coins: {user?.coins}
              <CircleDollarSign size={19} color={"#ef9f23"} />
            </p>
            <p className={styles.inventoryCoinsFooter}>From completed tasks</p>
          </div>
          <div className={styles.inventoryItemsQuantity}>
            Owned items: {user?.inventory?.length}/14
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading inventory...</div>
      ) : items.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>Your inventory is empty</h3>
          <p>Purchase items from the shop to fill your inventory!</p>
        </div>
      ) : (
        <div className={styles.inventoryItemsGrid}>
          {items.map((item) => (
            <AstreaShopItem key={item._id} item={item} variant="inventory" />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserInventory;
