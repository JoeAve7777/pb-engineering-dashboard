import { Component, OnInit } from "@angular/core";
import { AppConfiguration } from "@app/config/app-configuration";
import { DashboardCardItem } from "@app/screens/home/dashboard/dashboard-card-item.model";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    private _expandedId = "";
    private _showExpandedVersion = false;

    dashboardCardItems: Array<DashboardCardItem> = [];

    constructor(private appConfiguration: AppConfiguration) {}

    ngOnInit(): void {
        this.dashboardCardItems = this.appConfiguration.cardsMetaData;
        this.setupPrintingListener();
    }

    showSideBar = false;

    onCardListMouseEnter() {
        this.showSideBar = false;
    }

    onShimMouseEnter() {
        this.showSideBar = true;
    }

    get expandedId(): string {
        return this._expandedId;
    }

    get showExpandedVersion(): boolean {
        return this._showExpandedVersion;
    }

    onDashboardCardExpanded(dashboardCardItem: DashboardCardItem) {
        this._expandedId = dashboardCardItem.id;
        this._showExpandedVersion = true;
    }

    closeExpandedWindow() {
        this._showExpandedVersion = false;
        this._expandedId = "";
    }

    dashboardListItemSelected(dashboardCardItem: DashboardCardItem) {
        alert(dashboardCardItem.label);
    }

    setupPrintingListener() {
        window.addEventListener("afterprint", (event) => {
            document.getElementById("print-div").innerHTML = "";
        });
    }
}
