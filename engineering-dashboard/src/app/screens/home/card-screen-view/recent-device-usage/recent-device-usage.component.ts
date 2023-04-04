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
import { RecentDeviceService } from "@app/services/recent-device-usage.service";
import { RecentDeviceUsage } from "@app/interfaces/recent-device-usage.interface";

@Component({
    selector: "app-recent-device-usage",
    templateUrl: "./recent-device-usage.component.html",
    styleUrls: ["./recent-device-usage.component.scss"],
})
export class RecentDeviceUsageComponent implements OnInit, OnDestroy {
    @Input() dashboardCardItem: DashboardCardItem;
    @Output() dataLoadCompleted = new EventEmitter<string>();

    recentDeviceUsageOb$!: Subscription;
    recentDeviceUsageData: RecentDeviceUsage[] = [];
    filteredValues: any[] = [];
    cols: any[];

    screenCaption: string = "Since 1 month ago";

    constructor(
        private recentDeviceService: RecentDeviceService,
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
            { dataKey: "deviceName", title: "DeviceName" },
        ];
    }
    loadData() {
        document.body.style.cursor = "wait";

        this.recentDeviceUsageData = this.recentDeviceService
            .get()
            .sort((a, b) => (a.dateTimeStamp > b.dateTimeStamp ? -1 : 1));

        this.recentDeviceUsageData = this.formatValues();
        this.filteredValues = this.recentDeviceUsageData;

        this.dataLoadCompleted.emit();
    }
    onFilter(event: { filteredValue: any }, dt: any) {
        this.filteredValues = event.filteredValue;
    }
    ngOnDestroy(): void {
        if (
            this.recentDeviceUsageOb$ != null &&
            this.recentDeviceUsageOb$ != undefined
        ) {
            this.recentDeviceUsageOb$.unsubscribe();
        }
    }

    private formatValues() {
        let self = this;

        const formattedValues = [];

        this.recentDeviceUsageData.forEach(function (data) {
            data["datetimestamp"] = self.datePipe.transform(
                data["dateTimeStamp"],
                "MMM d, yy, h:mm a"
            );

            formattedValues.push(data);
        });

        return formattedValues;
    }
    onExportPdf() {
        let title = "New Guam Users - Run Date: " + new Date().toLocaleString();

        this.exportService.ExportToPdf(
            title,
            "Recent Device Usage",
            this.filteredValues,
            this.cols
        );

        return false;
    }
    onExportExcel() {
        let title =
            "Recent Device Usage - Run Date: " + new Date().toLocaleString();

        this.exportService.ExportToExcel(
            title,
            "RecentDeviceUsage",
            this.filteredValues,
            this.cols
        );

        return false;
    }
}
