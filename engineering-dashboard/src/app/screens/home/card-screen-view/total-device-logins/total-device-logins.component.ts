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
  selector: 'app-total-device-logins',
  templateUrl: './total-device-logins.component.html',
  styleUrls: ['./total-device-logins.component.scss']
})
export class TotalDeviceLoginsComponent implements OnInit, OnDestroy {
  @Input() dashboardCardItem: DashboardCardItem;
  @Output() dataLoadCompleted = new EventEmitter<string>();

  Ob$!: Subscription;

  screenCaption: string = "Since 1 month ago";

  constructor() {}

  ngOnInit(): void {
      this.loadData();
  }

  loadData() {
      this.dataLoadCompleted.emit();
  }

  ngOnDestroy(): void {
      if (
          this.Ob$ != null &&
          this.Ob$ != undefined
      ) {
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

