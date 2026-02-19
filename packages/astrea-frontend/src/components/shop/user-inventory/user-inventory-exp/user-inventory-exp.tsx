import styles from "./user-inventory-exp.module.css";
import { PublicUser } from "astrea-shared";

type UserInventoryProps = {
  user: PublicUser;
};

function UserInventoryExp({ user }: UserInventoryProps) {
  const currentExp = user?.exp ?? 0;
  const currentLevel = user?.level ?? 1;

  const nextLevelExp = (currentLevel - 1) * 25 + 50;
  const progress = Math.min((currentExp / nextLevelExp) * 100, 100);

  return (
    <div className={styles.expContainer}>
      <div className={styles.expHeader}>
        <div className={styles.expInfo}>
          <p className={"mb-1 text-gray-600"}>Exp</p>
          <p className={"text-sm text-gray-600"} style={{ fontWeight: 300 }}>
            {currentExp}/{nextLevelExp}
          </p>
        </div>
      </div>

      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }}>
          <div className={styles.progressGlow}></div>
        </div>
      </div>
    </div>
  );
}

export default UserInventoryExp;
