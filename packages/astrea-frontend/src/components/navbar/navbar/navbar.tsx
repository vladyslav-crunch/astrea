import styles from "./navbar.module.css";
import UserBadge from "../user-badge/user-badge.tsx";
import NavItems from "../nav-items/nav-items.tsx";
import TopicInfo from "@/components/navbar/topic-badge/topic-info.tsx";
import { useParams } from "react-router-dom";

function Navbar() {
  const { topicId } = useParams<{ topicId: string }>();

  return (
    <>
      <div className={styles.navbarContainer}>
        <NavItems />
        <div className={styles.navbarContainerRightSide}>
          {topicId && <TopicInfo topicId={topicId} />}
          <UserBadge />
        </div>
      </div>
    </>
  );
}

export default Navbar;
