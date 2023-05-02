export interface DashboardCardItem {
    id: string;
    label: string;
    description: string;
    iconClass: string;
    isExpandable: boolean;
    isAvailable: boolean;
    isVisible: boolean;
    isSearchable:boolean;
    isExportable:boolean;
    isPrintable:boolean;
    isCopy:boolean;
}
