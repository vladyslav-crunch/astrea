import styles from "./user-inventory-badge.module.css";
import CircularProgressBadge from "@/components/ui/layout/circular-progress-badge/circular-progress-badge.tsx";
import { PublicUser, ShopItem } from "astrea-shared";

type UserInventoryBadgeProps = {
  user: PublicUser;
  items: ShopItem[];
};

function UserInventoryBadge({ user, items }: UserInventoryBadgeProps) {
  const defaultAvatar = "/icons/navbar/defaultAvatar.png";

  const equippedBorder = items.find(
    (item) => item._id === user.border && item.type === "border",
  );

  const equippedTitle = items.find(
    (item) => item._id === user.title && item.type === "title",
  );

  return (
    <div className={styles.userInventoryBadgeContainer}>
      <CircularProgressBadge
        exp={10000000}
        level={user.level!}
        imageSrc={user.profilePic || defaultAvatar}
        size={90}
        showLevelBadge={true}
        progressColor={equippedBorder?.color}
        levelBadgeColor={equippedBorder?.color}
      />
      <p className={styles.userInventoryBadgeUsername}>{user.username}</p>
      <p
        className={styles.userInventoryBadgeTitle}
        style={
          equippedTitle?.color ? { color: equippedTitle.color } : undefined
        }
      >
        {equippedTitle?.name || "No title"}
      </p>
    </div>
  );
}

export default UserInventoryBadge;
