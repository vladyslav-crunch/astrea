import type { ShopItem } from "astrea-shared";
import AstreaShopItem from "../astrea-shop-item/astrea-shop-item";
import CustomRewardInput from "../custom-reward-input/custom-reward-input";
import CustomRewardItem from "../custom-reward-item/custom-reward-item";
import { useSession } from "@/hooks/useAuth.ts";
import {
  useCustomRewards,
  useCreateCustomReward,
  useUpdateCustomReward,
  useClaimCustomReward,
  useDeleteCustomReward,
} from "@/hooks/useCustomReward.ts";
import styles from "./astrea-shop.module.css";

interface AstreaShopProps {
  items: ShopItem[];
  isLoading: boolean;
}

function AstreaShop({ items, isLoading }: AstreaShopProps) {
  const { data: sessionData } = useSession();
  const { data: customRewardsData, isLoading: loadingRewards } =
    useCustomRewards();
  const createReward = useCreateCustomReward();
  const updateReward = useUpdateCustomReward();
  const claimReward = useClaimCustomReward();
  const deleteReward = useDeleteCustomReward();

  const user = sessionData?.user;
  const userCoins = user?.coins ?? 0;
  const customRewards = customRewardsData?.rewards ?? [];

  const borders = items.filter((item) => item.type === "border");
  const titles = items.filter((item) => item.type === "title");

  const handleCreateReward = (title: string, coins: number) => {
    createReward.mutate({ title, coins });
  };

  const handleUpdateReward = (
    id: string,
    title: string,
    coins: number,
    description?: string,
  ) => {
    updateReward.mutate({ rewardId: id, title, coins, description });
  };

  const handleClaimReward = (id: string) => {
    claimReward.mutate(id);
  };

  const handleDeleteReward = (id: string) => {
    deleteReward.mutate(id);
  };

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
            <h3 className={styles.customRewardsTitle}>Custom Rewards</h3>
            <div className={styles.customRewardsContent}>
              <CustomRewardInput onCreate={handleCreateReward} />
              <div className={styles.rewardsList}>
                {loadingRewards ? (
                  <div className={styles.loadingRewards}>Loading...</div>
                ) : (
                  customRewards.map((reward) => (
                    <CustomRewardItem
                      key={reward._id}
                      reward={reward}
                      onUpdate={handleUpdateReward}
                      onClaim={handleClaimReward}
                      onDelete={handleDeleteReward}
                      userCoins={userCoins}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AstreaShop;
