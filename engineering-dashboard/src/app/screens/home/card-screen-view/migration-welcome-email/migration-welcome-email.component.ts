import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    EventEmitter,
    Output,
} from "@angular/core";

import { Subscription } from "rxjs";
import { DashboardCardItem } from "../../dashboard/dashboard-card-item.model";

@Component({
    selector: "app-migration-welcome-email",
    templateUrl: "./migration-welcome-email.component.html",
    styleUrls: ["./migration-welcome-email.component.scss"],
})
export class MigrationWelcomeEmailComponent implements OnInit, OnDestroy {
    @Input() dashboardCardItem: DashboardCardItem;
    @Output() dataLoadCompleted = new EventEmitter<string>();

    migrationWelcomeEmailOb$!: Subscription;

    screenCaption: string = "Since 1 month ago";

    constructor() {}

    ngOnInit(): void {
        this.loadData();
        this.dataLoadCompleted.emit();

        window.addEventListener("afterprint", (event) => {
            document.getElementById("print-div").innerHTML = "";
        });

        window.addEventListener("beforeprint", (event) => {
            let cardHtlm = document.getElementById("card-id-1").innerHTML;

            document.getElementById("print-div").innerHTML = cardHtlm;
        });
    }

    loadData() {}

    ngOnDestroy(): void {
        if (
            this.migrationWelcomeEmailOb$ != null &&
            this.migrationWelcomeEmailOb$ != undefined
        ) {
            this.migrationWelcomeEmailOb$.unsubscribe();
        }
    }

    onPrint() {
        window.print();

        return false;
    }
}
