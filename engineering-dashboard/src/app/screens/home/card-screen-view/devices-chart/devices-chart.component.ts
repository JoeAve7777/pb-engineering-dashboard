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
  selector: 'app-devices-chart',
  templateUrl: './devices-chart.component.html',
  styleUrls: ['./devices-chart.component.scss']
})
export class DevicesChartComponent implements OnInit, OnDestroy {
  @Input() dashboardCardItem: DashboardCardItem;
  @Output() dataLoadCompleted = new EventEmitter<string>();

  @ViewChild("chartCanvas") chartCanvas: any;

  barChartOb$!: Subscription;

  screenCaption: string = "Devices - Since 1 month ago";

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
              label: "Created",
              fill: false,
              borderColor: getComputedStyle(
                  document.documentElement
              ).getPropertyValue("--blue"),
              yAxisID: "y",
              tension: 0.4,
              data: [10, 1, 20, 35, 51],
          },
          {
              label: "Logged In",
              fill: false,
              borderColor: getComputedStyle(
                  document.documentElement
              ).getPropertyValue("--h1_color"),
              tension: 0.4,
              data: [28, 48, 40, 19, 86, 27, 90],
          },
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

