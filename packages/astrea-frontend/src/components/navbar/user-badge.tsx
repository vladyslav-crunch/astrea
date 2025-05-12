import {useUser} from "../../context/user-context.tsx";
import CircularProgressBadge from "../ui/circular-progress-badge.tsx";
import styles from "./user-badge.module.css"


function UserBadge() {
    const {user} = useUser();

    if (!user) return null;

    const defaultAvatar = "/icons/navbar/defaultAvatar.png";

    return (
        <div className={styles.userBadgeContainer}>
            <CircularProgressBadge
                exp={user.exp!}
                level={user.level!}
                imageSrc={user.profilePic || defaultAvatar}
                size={90}
            />
            <div className={styles.levelBadge}>
                {user.level!}
            </div>
        </div>
    );
}

export default UserBadge;
