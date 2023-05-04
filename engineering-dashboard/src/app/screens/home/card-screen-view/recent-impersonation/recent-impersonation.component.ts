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
import { RecentImpersonationService } from "@app/services/recent-impersonation.service";
import { RecentImpersonation } from "@app/interfaces/recent-impersonation.interface";

@Component({
    selector: "app-recent-impersonation",
    templateUrl: "./recent-impersonation.component.html",
    styleUrls: ["./recent-impersonation.component.scss"],
})
export class RecentImpersonationComponent implements OnInit, OnDestroy {
    @Input() dashboardCardItem: DashboardCardItem;
    @Output() dataLoadCompleted = new EventEmitter<string>();

    observable$!: Subscription;
    recentImpersonationData: RecentImpersonation[] = [];
    filteredValues: any[] = [];
    cols: any[];

    screenCaption: string = "Since 1 month ago";

    constructor(
        private recentImpersonationService: RecentImpersonationService,
        private datePipe: DatePipe,
        private exportService: ExportService
    ) {}

    ngOnInit(): void {
        this.setupCols();
        this.loadData();
    }

    private setupCols() {
        this.cols = [
            { dataKey: "dateTimeStamp", title: "Timestamp" },
            { dataKey: "email", title: "Admin User" },
        ];
    }
    loadData() {
        document.body.style.cursor = "wait";

        this.recentImpersonationData = this.recentImpersonationService
            .get()
            .sort((a, b) => (a.dateTimeStamp > b.dateTimeStamp ? -1 : 1));

        this.recentImpersonationData = this.formatValues();
        this.filteredValues = this.recentImpersonationData;

        this.dataLoadCompleted.emit();
    }
    onFilter(event: { filteredValue: any }, dt: any) {
        this.filteredValues = event.filteredValue;
    }
    ngOnDestroy(): void {
        if (this.observable$ != null && this.observable$ != undefined) {
            this.observable$.unsubscribe();
        }
    }

    private formatValues() {
        let self = this;

        const formattedValues = [];

        this.recentImpersonationData.forEach(function (data) {
            data["datetimestamp"] = self.datePipe.transform(
                data["dateTimeStamp"],
                "MMM d, yy, h:mm a"
            );

            formattedValues.push(data);
        });

        return formattedValues;
    }
    onExportPdf() {
        let title =
            "Recent Impersonation - Run Date: " + new Date().toLocaleString();

        this.exportService.ExportToPdf(
            title,
            "RecentImpersonation",
            this.filteredValues,
            this.cols
        );

        return false;
    }
    onExportExcel() {
        let title =
            "Recent Impersonation - Run Date: " + new Date().toLocaleString();

        this.exportService.ExportToExcel(
            title,
            "RecentImpersonation",
            this.filteredValues,
            this.cols
        );

        return false;
    }
}
