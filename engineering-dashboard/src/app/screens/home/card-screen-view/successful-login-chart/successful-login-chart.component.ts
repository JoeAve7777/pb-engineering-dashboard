import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";

import { Subscription } from "rxjs";
import { DashboardCardItem } from "../../dashboard/dashboard-card-item.model";
import { ChartData, ChartOptions } from "chart.js";

@Component({
  selector: 'app-successful-login-chart',
  templateUrl: './successful-login-chart.component.html',
  styleUrls: ['./successful-login-chart.component.scss']
})
export class SuccessfulLoginChartComponent implements OnInit, OnDestroy {
  @Input() dashboardCardItem: DashboardCardItem;
  @Output() dataLoadCompleted = new EventEmitter<string>();

  @ViewChild("chartCanvas") chartCanvas: any;

  barChartOb$!: Subscription;

  screenCaption: string = "Successful Logins - Since 1 month ago";

  constructor() {}

  ngOnInit(): void {
      this.loadData();
  }

  loadData() {
      this.dataLoadCompleted.emit();
  }

  ngOnDestroy(): void {
      if (this.barChartOb$ != null && this.barChartOb$ != undefined) {
          this.barChartOb$.unsubscribe();
      }
  }

  onCopy() {

      return false;
  }

  data = {
      labels: [
          "Dec 10, 4:00pm",
          "Dec 17,4:00pm",
          "Dec 24, 4:00pm",
          "Dec 31, 4:00pm",
          "Jan 7, 4:00pm",
      ],
      datasets: [
          {
              label: 'var 1',
              fill: false,
              borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue'),
              yAxisID: "y",
              tension: 0.4,
              data: [10, 1, 20, 35, 51],
          }
      ],
  };

  options: ChartOptions = {
      plugins: {
          title: {
              display: true,
              text: this.screenCaption,
              color: getComputedStyle(
                  document.documentElement
              ).getPropertyValue("--text"),
          },
      },
  };
}
