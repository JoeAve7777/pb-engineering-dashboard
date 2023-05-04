import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DashboardCardItem } from "../dashboard-card-item.model";

@Component({
    selector: "app-dashboard-card",
    templateUrl: "./dashboard-card.component.html",
    styleUrls: ["./dashboard-card.component.scss"],
})
export class DashboardCardComponent implements OnInit {
    @Input() dashboardCardItem: DashboardCardItem;
    @Output() dashboardCardExpanded = new EventEmitter<DashboardCardItem>();

    showSpinner = false;

    get isExpandable(): boolean {
        return this.dashboardCardItem.isExpandable;
    }

    ngOnInit(): void {
        this.showSpinner = true;
    }

    onClick() {
        this.dashboardCardItem.isVisible = false;
    }

    onExpandClick() {
        this.dashboardCardExpanded.emit(this.dashboardCardItem);
    }

    onDataLoadedCompleted() {

        //alert();
        this.showSpinner = false;
    }
}
