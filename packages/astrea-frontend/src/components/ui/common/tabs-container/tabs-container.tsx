import { ReactNode, useState } from "react";
import styles from "./tabs-container.module.css";

export type Tabs = {
  id: string;
  label: string;
  content: ReactNode;
  badgeCount?: number;
};

type TabsContainerProps = {
  tabs: Tabs[];
};

function TabsContainer({ tabs }: TabsContainerProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  console.log(tabs);
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
          >
            {tab.label}
            {tab.badgeCount ? (
              <span className={styles.tabBadgeCount}>{tab.badgeCount}</span>
            ) : (
              ""
            )}
          </button>
        ))}
      </div>

      <div className={styles.boardContent}>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export default TabsContainer;
