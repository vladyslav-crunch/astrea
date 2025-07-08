import HexagonIcon from "../../ui/layout/hexaong-icon/hexagonIcon.tsx";
import {useNavigate, useLocation} from "react-router-dom";
import styles from '../../ui/layout/hexaong-icon/hexagon-icon.module.css'; // import the styles here

export type NavItemProps = {
    path: string;
    icon?: React.ReactNode;
};

function NavItem({path, icon}: NavItemProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive =
        (path === "/" && location.pathname.startsWith("/topic")) || location.pathname === path;

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
