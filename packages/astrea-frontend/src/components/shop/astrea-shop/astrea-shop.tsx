import type { ShopItem } from "astrea-shared";
import AstreaShopItem from "../astrea-shop-item/astrea-shop-item";
import styles from "./astrea-shop.module.css";

interface AstreaShopProps {
  items: ShopItem[];
  isLoading: boolean;
}

function AstreaShop({ items, isLoading }: AstreaShopProps) {
  const borders = items.filter((item) => item.type === "border");
  const titles = items.filter((item) => item.type === "title");

  return (
    <div className={styles.shopSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Astra Shop</h2>
        <p className={styles.sectionSubtitle}>Browse available items</p>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading shop items...</div>
      ) : items.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No items available</h3>
          <p>Check back later for new items!</p>
        </div>
      ) : (
        <div className={styles.itemsContainer}>
          <div className={styles.categoriesWrapper}>
            {/* Borders Category */}
            {borders.length > 0 && (
              <div className={styles.categorySection}>
                <h3 className={styles.categoryTitle}>Borders</h3>
                <div className={styles.itemsGrid}>
                  {borders.map((item) => (
                    <AstreaShopItem key={item._id} item={item} variant="shop" />
                  ))}
                </div>
              </div>
            )}

            {/* Titles Category */}
            {titles.length > 0 && (
              <div className={styles.categorySection}>
                <h3 className={styles.categoryTitle}>Titles</h3>
                <div className={styles.itemsGrid}>
                  {titles.map((item) => (
                    <AstreaShopItem key={item._id} item={item} variant="shop" />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.customRewards}>
            <p>Custom Rewards</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AstreaShop;
