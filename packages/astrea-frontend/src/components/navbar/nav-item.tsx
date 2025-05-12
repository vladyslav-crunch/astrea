import HexagonIcon from "../ui/hexagonIcon.tsx";
import {useNavigate, useLocation} from "react-router-dom";
import styles from '../ui/hexagon-icon.module.css'; // import the styles here

export type NavItemProps = {
    path: string;
    icon?: React.ReactNode;
};

function NavItem({path, icon}: NavItemProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname === path;

    return (
        <HexagonIcon
            onClick={() => navigate(path)}
            className={isActive ? styles.active : ''}
        >
            {icon}
        </HexagonIcon>
    );
}

export default NavItem;
