import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar/navbar.tsx";
import styles from "./app-layout.module.css"
import Blobs from "../components/ui/blobs.tsx";

function AppLayout() {
    return (
        <div className={styles.appLayoutContainer}
             style={{position: 'relative', overflow: 'hidden', minHeight: '100vh'}}>
            <Navbar/>
            <Blobs/>
            <Outlet/>
        </div>
    );
}

export default AppLayout;