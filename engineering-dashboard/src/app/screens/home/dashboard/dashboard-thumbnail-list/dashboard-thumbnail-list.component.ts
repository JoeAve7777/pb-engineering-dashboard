import { Component, Input, OnInit } from "@angular/core";
import { DashboardCardItem } from "@app/screens/home/dashboard/dashboard-card-item.model";

@Component({
    selector: "app-dashboard-thumbnail-list",
    templateUrl: "./dashboard-thumbnail-list.component.html",
    styleUrls: ["./dashboard-thumbnail-list.component.scss"],
})
export class DashboardThumbnailListComponent implements OnInit {
    @Input() dashboardCardItems: Array<DashboardCardItem>;

    constructor() {}

    ngOnInit(): void {}
}
