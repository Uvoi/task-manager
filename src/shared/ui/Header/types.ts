export interface Tabs {
    name: string;
    path: string;
    type?: 'text' | 'icon' | 'text-icon';
    icon?: React.ReactNode;
    isActive?: boolean;
}