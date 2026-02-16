import HexagonIcon from "../../ui/layout/hexaong-icon/hexagonIcon.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../ui/layout/hexaong-icon/hexagon-icon.module.css"; // import the styles here
import { useState, useEffect } from "react";

export type NavItemProps = {
  path: string;
  icon?: React.ReactNode;
};

function NavItem({ path, icon }: NavItemProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [iconSize, setIconSize] = useState(90);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIconSize(60);
      } else if (window.innerWidth <= 1024) {
        setIconSize(75);
      } else {
        setIconSize(90);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive =
    (path === "/" && location.pathname.startsWith("/topic")) ||
    location.pathname === path;

  return (
    <HexagonIcon
      onClick={() => navigate(path)}
      className={isActive ? styles.active : ""}
      size={iconSize}
    >
      {icon}
    </HexagonIcon>
  );
}

export default NavItem;
