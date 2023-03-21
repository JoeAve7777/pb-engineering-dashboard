import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";

import { WelcomeEmail } from "@app/interfaces/welcome-email.interface";
import { SentWelcomeEmailService } from "@app/services/sent-welcome-email.service";
import { ExportService } from "@app/services/export.service";

@Component({
    selector: "app-sent-welcome-email-page",
    templateUrl: "./sent-welcome-email-page.component.html",
    styleUrls: ["./sent-welcome-email-page.component.scss"],
})
export class SentWelcomeEmailPageComponent implements OnInit {
    filteredValues: any[] = [];
    welcomeEmailOb$!: Subscription;
    welcomeEmailsData: WelcomeEmail[] = [];
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
                document.body.style.cursor = "default";
            },
        });
    }

    ngOnDestroy(): void {
        if (this.welcomeEmailOb$ != null && this.welcomeEmailOb$ != undefined) {
            this.welcomeEmailOb$.unsubscribe();
        }
    }

    private setupCols() {
        this.cols = [
            { dataKey: "datetimestamp", title: "Timestamp" },
            { dataKey: "email", title: "Email" },
        ];
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

    exportExcel() {
        this.runExportExcel();

        return false;
    }

    exportPdf() {
        let title =
            "Sent Welcome Emails - Run Date: " + new Date().toLocaleString();

        this.exportService.ExportToPdf(title, "SentWelcomeEmails", this.filteredValues, this.cols);

        return false;
    }

    runExportExcel() {
        let title =
            "Sent Welcome Emails - Run Date: " + new Date().toLocaleString();

        this.exportService.ExportToExcel(
            title,
            "SentWelcomeEmails",
            this.filteredValues,
            this.cols
        );
    }

    onFilter(event: { filteredValue: any }, dt: any) {
        this.filteredValues = event.filteredValue;
    }
}
