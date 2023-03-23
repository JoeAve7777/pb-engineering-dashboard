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
import { GuamUserService } from "@app/services/guam-user.service";
import { GuamUser } from "@app/interfaces/guam-user.interface";

@Component({
    selector: "app-new-guam-users",
    templateUrl: "./new-guam-users.component.html",
    styleUrls: ["./new-guam-users.component.scss"],
})
export class NewGuamUsersComponent implements OnInit, OnDestroy {
    @Input() dashboardCardItem: DashboardCardItem;
    @Output() dataLoadCompleted = new EventEmitter<string>();

    guamUsersOb$!: Subscription;
    guamUsersData: GuamUser[] = [];
    filteredValues: any[] = [];
    cols: any[];

    screenCaption: string = "Since 1 month ago";

    constructor(
        private guamUserService: GuamUserService,
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
            { dataKey: "email", title: "Email" },
        ];
    }
    loadData() {
        document.body.style.cursor = "wait";

        this.guamUsersData = this.guamUserService.get();
        this.guamUsersData = this.formatValues();
        this.filteredValues = this.guamUsersData;
    }
    onFilter(event: { filteredValue: any }, dt: any) {
        this.filteredValues = event.filteredValue;
    }
    ngOnDestroy(): void {
        if (this.guamUsersOb$ != null && this.guamUsersOb$ != undefined) {
            this.guamUsersOb$.unsubscribe();
        }
    }

    private formatValues() {
        let self = this;

        const formattedValues = [];

        this.guamUsersData.forEach(function (data) {
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
            "NewGuamUsers",
            this.filteredValues,
            this.cols
        );

        return false;
    }
    onExportExcel() {
        let title = "New Guam Users - Run Date: " + new Date().toLocaleString();

        this.exportService.ExportToExcel(
            title,
            "NewGuamUsers",
            this.filteredValues,
            this.cols
        );

        return false;
    }
}
