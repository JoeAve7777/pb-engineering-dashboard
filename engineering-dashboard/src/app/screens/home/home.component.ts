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


    // dashboardCardItems: Array<DashboardCardItem> = [
    //     {
    //         id: "1",
    //         label: "Sent Welcome Emails",
    //         iconClass: "fa-share",
    //         isExpandable: true,
    //         isAvailable: true,
    //         isVisible: true,
    //     },
    //     {
    //         id: "2",
    //         label: "Successful Logins",
    //         iconClass: "fa-duotone fa-users",
    //         isExpandable: false,
    //         isAvailable: true,
    //         isVisible: true,
    //     },
    //     {
    //         id: "3",
    //         label: "Recent Login",
    //         iconClass: "fa-sharp fa-solid fa-user",
    //         isExpandable: false,
    //         isAvailable: true,
    //         isVisible: true,
    //     },
    //     {
    //         id: "4",
    //         label: "Recent Impersonation",
    //         iconClass: "fa-regular fa-user-secret",
    //         isExpandable: false,
    //         isAvailable: true,
    //         isVisible: true,
    //     },
    //     {
    //         id: "5",
    //         label: "Bulk Mail Stats",
    //         iconClass: "fa-envelope",
    //         isExpandable: false,
    //         isAvailable: true,
    //         isVisible: true,
    //     },
    //     {
    //         id: "6",
    //         label: "Carrier Performance",
    //         iconClass: "fa-truck",
    //         isExpandable: false,
    //         isAvailable: true,
    //         isVisible: true,
    //     },
    // ];


}
