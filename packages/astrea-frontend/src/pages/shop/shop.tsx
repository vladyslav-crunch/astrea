import { useShopItems, useInventory } from "@/hooks/useShop.ts";
import AstreaShop from "../../components/shop/astrea-shop/astrea-shop";
import UserInventory from "../../components/shop/user-inventory/user-inventory";
import styles from "./shop.module.css";

function Shop() {
  const { data: shopData, isLoading: loadingShop } = useShopItems();
  const { data: inventoryData, isLoading: loadingInventory } = useInventory();

  const shopItems = shopData?.items ?? [];
  const inventoryItems = inventoryData?.inventory ?? [];

  return (
    <div className={styles.shopContainer}>
      <div className={styles.splitLayout}>
        <AstreaShop items={shopItems} isLoading={loadingShop} />
        <UserInventory items={inventoryItems} isLoading={loadingInventory} />
      </div>
    </div>
  );
}

export default Shop;
