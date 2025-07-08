import {Outlet} from "react-router-dom";
import Navbar from "../../navbar/navbar/navbar.tsx";
import styles from "./app-layout.module.css"
import Blobs from "../../ui/layout/blobs/blobs.tsx";

function AppLayout() {
    return (
        <div className={styles.appLayoutContainer}>
            <Navbar/>
            <Blobs/>
            <Outlet/>
        </div>
    );
}

export default AppLayout;