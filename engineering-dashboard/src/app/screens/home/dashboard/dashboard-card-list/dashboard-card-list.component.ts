import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DashboardCardItem } from "@app/screens/home/dashboard/dashboard-card-item.model";

@Component({
    selector: "app-dashboard-card-list",
    templateUrl: "./dashboard-card-list.component.html",
    styleUrls: ["./dashboard-card-list.component.scss"],
})
export class DashboardCardListComponent {
    @Input() dashboardCardItems: Array<DashboardCardItem> = [];
    @Output() dashboardCardExpanded = new EventEmitter<DashboardCardItem>();

    hasItem(dashboardCardItem: DashboardCardItem): boolean {
        const item = this.dashboardCardItems.find(
            (x) => x.id === dashboardCardItem.id
        );
        return item !== null && item !== undefined;
    }

    onDashboardCardExpanded(dashboardItem: DashboardCardItem) {
        this.dashboardCardExpanded.emit(dashboardItem);
    }
}
