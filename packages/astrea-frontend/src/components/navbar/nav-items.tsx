import styles from "./nav-items.module.css"
import NavItem from "./nav-item.tsx";


function NavItems() {
    return (
        <div className={styles.navItemsContainer}>
            <NavItem path={"/"} icon={<img src="/icons/navbar/todo.svg" alt="todo"/>}/>
            <NavItem path={"/shop"} icon={<img src="/icons/navbar/shop.svg" alt="shop"/>}/>
            <NavItem path={"/setting"} icon={<img src="/icons/navbar/setting.svg" alt="setting"/>}/>
        </div>
    );
}

export default NavItems;