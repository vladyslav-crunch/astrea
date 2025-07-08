import CircularProgressBadge from "../../ui/layout/circular-progress-badge/circular-progress-badge.tsx";
import styles from "./user-badge.module.css"
import {useSession} from "../../../hooks/useAuth.ts";


function UserBadge() {
    const {data, isLoading, error} = useSession();

    if (isLoading || error || !data?.user) return null;

    const {user} = data;

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
