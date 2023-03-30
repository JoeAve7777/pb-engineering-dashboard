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
    selector: "app-total-users",
    templateUrl: "./total-users.component.html",
    styleUrls: ["./total-users.component.scss"],
})
export class TotalUsersComponent implements OnInit, OnDestroy {
    @Input() dashboardCardItem: DashboardCardItem;
    @Output() dataLoadCompleted = new EventEmitter<string>();

    totalUsersOb$!: Subscription;

    screenCaption: string = "";

    constructor() {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.dataLoadCompleted.emit();
    }

    ngOnDestroy(): void {
        if (
            this.totalUsersOb$ != null &&
            this.totalUsersOb$ != undefined
        ) {
            this.totalUsersOb$.unsubscribe();
        }
    }
}
