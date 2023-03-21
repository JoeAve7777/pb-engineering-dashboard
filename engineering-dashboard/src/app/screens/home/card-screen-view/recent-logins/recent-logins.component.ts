import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    EventEmitter,
    Output,
} from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

import { Subscription } from "rxjs";

import { DashboardCardItem } from "../../dashboard/dashboard-card-item.model";
import { ExportService } from "@app/services/export.service";
import { RecentLoginsService } from "@app/services/recent-logins.service";
import { RecentLogin } from "@app/interfaces/recent-login.interface";

@Component({
    selector: "app-recent-logins",
    templateUrl: "./recent-logins.component.html",
    styleUrls: ["./recent-logins.component.scss"],
})
export class RecentLoginsComponent implements OnInit, OnDestroy {
    @Input() dashboardCardItem: DashboardCardItem;
    @Output() dataLoadCompleted = new EventEmitter<string>();

    recentLoginsOb$!: Subscription;
    recentLoginsData: RecentLogin[] = [];
    filteredValues: any[] = [];
    cols: any[];

    screenCaption: string = "Since 1 month ago";

    constructor(
        private recentLoginsService: RecentLoginsService,
        private datePipe: DatePipe,
        private exportService: ExportService
    ) {}

    ngOnInit(): void {
        this.setupCols();
        this.loadData();
    }

    private setupCols() {
        this.cols = [
            { dataKey: "email", title: "Email" },
            { dataKey: "loginCount", title: "Login Count" },
        ];
    }
    loadData() {
        document.body.style.cursor = "wait";

        this.recentLoginsData = this.recentLoginsService.get();
        this.filteredValues = this.recentLoginsData;
    }
    onFilter(event: { filteredValue: any }, dt: any) {
        this.filteredValues = event.filteredValue;
    }
    ngOnDestroy(): void {
        if (this.recentLoginsOb$ != null && this.recentLoginsOb$ != undefined) {
            this.recentLoginsOb$.unsubscribe();
        }
    }

    onExportPdf() {
        let title = "Recent Logins - Run Date: " + new Date().toLocaleString();

        this.exportService.ExportToPdf(
            title,
            "RecentLogins",
            this.filteredValues,
            this.cols
        );

        return false;
    }
    onExportExcel() {
        let title = "Recent Logins - Run Date: " + new Date().toLocaleString();

        this.exportService.ExportToExcel(
            title,
            "RecentLogins",
            this.filteredValues,
            this.cols
        );

        return false;
    }
}
