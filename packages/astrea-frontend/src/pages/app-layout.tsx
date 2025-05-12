import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar/navbar.tsx";
import styles from "./app-layout.module.css"

function AppLayout() {
    return (
        <div className={styles.appLayoutContainer}>
            <Navbar/>
            <Outlet/>
        </div>
    );
}

export default AppLayout;