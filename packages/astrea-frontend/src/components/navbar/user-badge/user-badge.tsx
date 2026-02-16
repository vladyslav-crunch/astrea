import CircularProgressBadge from "../../ui/layout/circular-progress-badge/circular-progress-badge.tsx";
import styles from "./user-badge.module.css";
import { useSession } from "@/hooks/useAuth.ts";
import { useState, useEffect } from "react";

function UserBadge() {
  const { data, isLoading, error } = useSession();
  const [badgeSize, setBadgeSize] = useState(90);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBadgeSize(60);
      } else if (window.innerWidth <= 1024) {
        setBadgeSize(75);
      } else {
        setBadgeSize(90);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading || error || !data?.user) return null;

  const { user } = data;

  const defaultAvatar = "/icons/navbar/defaultAvatar.png";

  return (
    <div className={styles.userBadgeContainer}>
      <CircularProgressBadge
        exp={user.exp!}
        level={user.level!}
        imageSrc={user.profilePic || defaultAvatar}
        size={badgeSize}
      />
      <div className={styles.levelBadge}>{user.level!}</div>
    </div>
  );
}

export default UserBadge;
