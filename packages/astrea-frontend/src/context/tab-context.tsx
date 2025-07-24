import {createContext, useContext, useState, ReactNode} from 'react';

export type GoalPanelType = 'drafts' | 'goals' | 'overall';

interface TabContextType {
    activeTab: GoalPanelType;
    setActiveTab: (tab: GoalPanelType) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({children}: { children: ReactNode }) {
    const [activeTab, setActiveTab] = useState<GoalPanelType>('drafts');

    return (
        <TabContext.Provider value={{activeTab, setActiveTab}}>
            {children}
        </TabContext.Provider>
    );
}

export function useTabContext() {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTabContext must be used within a TabProvider');
    }
    return context;
}
