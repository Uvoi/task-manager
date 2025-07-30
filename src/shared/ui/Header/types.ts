export interface Tabs {
    name: TabNames;
    path: TabPaths;
    type?: 'text' | 'icon' | 'text-icon';
    icon?: React.ReactNode;
    isActive?: boolean;
}

export type TabNames = 'Home' | 'To Do' | 'In Progress' | 'Done' | 'Settings';
export type TabPaths = '/' | '/todo' | '/in-progress' | '/done' | '/settings';