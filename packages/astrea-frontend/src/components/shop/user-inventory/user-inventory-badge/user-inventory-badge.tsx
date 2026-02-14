import styles from "./user-inventory-badge.module.css";
import CircularProgressBadge from "@/components/ui/layout/circular-progress-badge/circular-progress-badge.tsx";
import { PublicUser } from "astrea-shared";

type UserInventoryBadgeProps = {
  user: PublicUser;
};

function UserInventoryBadge({ user }: UserInventoryBadgeProps) {
  const defaultAvatar = "/icons/navbar/defaultAvatar.png";
  return (
    <div className={styles.userInventoryBadgeContainer}>
      <CircularProgressBadge
        exp={10000000}
        level={user.level!}
        imageSrc={user.profilePic || defaultAvatar}
        size={90}
        showLevelBadge={true}
      />
      <p className={styles.userInventoryBadgeUsername}>{user.username}</p>
      <p className={styles.userInventoryBadgeTitle}>{user.title}</p>
    </div>
  );
}

export default UserInventoryBadge;
