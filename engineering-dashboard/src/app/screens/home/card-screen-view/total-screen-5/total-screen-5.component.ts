import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    EventEmitter,
    Output,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

import { Subscription } from "rxjs";
import { DashboardCardItem } from "../../dashboard/dashboard-card-item.model";
import { TotalScreenService } from "@app/services/total-screen-service.service";

@Component({
    selector: "app-total-screen-5",
    templateUrl: "./total-screen-5.component.html",
    styleUrls: ["./total-screen-5.component.scss"],
})
export class TotalScreen5Component implements OnInit, OnDestroy {
    @Input() dashboardCardItem: DashboardCardItem;
    @Output() dataLoadCompleted = new EventEmitter<string>();

    Ob$!: Subscription;

    screenCaption: string = "Since 1 month ago";
    screenCount = "";

    constructor(private totalScreenService: TotalScreenService) {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        document.body.style.cursor = "wait";

        this.Ob$ = this.totalScreenService.get(1).subscribe({
            next: (data) => {
                this.screenCount = data;
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

    ngOnDestroy(): void {
        if (this.Ob$ != null && this.Ob$ != undefined) {
            this.Ob$.unsubscribe();
        }
    }

    onPrint() {
        let cardHtlm = document.getElementById(
            "card-id-" + this.dashboardCardItem.id
        ).innerHTML;

        document.getElementById("print-div").innerHTML = cardHtlm;

        window.print();

        return false;
    }
}

