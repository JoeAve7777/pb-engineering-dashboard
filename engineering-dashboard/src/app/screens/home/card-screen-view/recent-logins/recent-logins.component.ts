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
import { WelcomeEmail } from "@app/interfaces/welcome-email.interface";
import { SentWelcomeEmailService } from "@app/services/sent-welcome-email.service";
import { ExportService } from "@app/services/export.service";

@Component({
    selector: "app-recent-logins",
    templateUrl: "./recent-logins.component.html",
    styleUrls: ["./recent-logins.component.scss"],
})
export class RecentLoginsComponent implements OnInit, OnDestroy {
    @Input() dashboardCardItem: DashboardCardItem;
    @Output() dataLoadCompleted = new EventEmitter<string>();

    welcomeEmailOb$!: Subscription;
    welcomeEmailsData: WelcomeEmail[] = [];
    filteredValues: any[] = [];
    cols: any[];

    screenCaption: string = "Since 1 month ago";

    constructor(
        private sentWelcomeEmailService: SentWelcomeEmailService,
        private datePipe: DatePipe,
        private exportService: ExportService
    ) {}

    ngOnInit(): void {
        this.setupCols();
        this.loadWelcomeEmailData();
    }

    private setupCols() {
        this.cols = [
            { dataKey: "datetimestamp", title: "Timestamp" },
            { dataKey: "email", title: "Email" },
        ];
    }
    loadWelcomeEmailData() {
        document.body.style.cursor = "wait";

        this.welcomeEmailOb$ = this.sentWelcomeEmailService.getAll().subscribe({
            next: (data) => {
                if (data !== undefined && data !== null) {
                    this.welcomeEmailsData = data.sort((a, b) =>
                        a.datetimestamp > b.datetimestamp ? -1 : 1
                    );

                    this.welcomeEmailsData = this.formatValues();
                    this.filteredValues = this.welcomeEmailsData;
                }
            },
            error: (error: HttpErrorResponse) => {
                if (error.status == 404) {
                }
            },
            complete: () => {
                this.dataLoadCompleted.emit();
                document.body.style.cursor = "default";
            },
        });
    }
    onFilter(event: { filteredValue: any }, dt: any) {
        this.filteredValues = event.filteredValue;
    }
    ngOnDestroy(): void {
        if (this.welcomeEmailOb$ != null && this.welcomeEmailOb$ != undefined) {
            this.welcomeEmailOb$.unsubscribe();
        }
    }

    private formatValues() {
        let self = this;

        const formattedValues = [];

        this.welcomeEmailsData.forEach(function (data) {
            data["datetimestamp"] = self.datePipe.transform(
                data["datetimestamp"],
                "MMM d, y, h:mm:ss a"
            );

            formattedValues.push(data);
        });

        return formattedValues;
    }
    onExportPdf() {
        let title =
            "Sent Welcome Emails - Run Date: " + new Date().toLocaleString();

        this.exportService.ExportToPdf(title, this.filteredValues, this.cols);

        return false;
    }
    onExportExcel() {
        let title =
            "Sent Welcome Emails - Run Date: " + new Date().toLocaleString();

        this.exportService.ExportToExcel(
            title,
            "SentWelcomeEmails",
            this.filteredValues,
            this.cols
        );

        return false;
    }
}
