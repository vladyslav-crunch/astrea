import styles from "./navbar.module.css"
import UserBadge from "../user-badge/user-badge.tsx";
import NavItems from "../nav-items/nav-items.tsx";

function Navbar() {
    return (
        <>
            <div className={styles.navbarContainer}>
                <NavItems/>
                <UserBadge/>
            </div>

        </>
    );
}

export default Navbar;