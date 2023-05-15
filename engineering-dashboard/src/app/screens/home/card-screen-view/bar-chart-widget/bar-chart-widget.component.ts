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
import { PbdsDatavizLine } from 'pb-design-system/dataviz';


@Component({
  selector: "app-bar-chart-widget",
  templateUrl: "./bar-chart-widget.component.html",
  styleUrls: ["./bar-chart-widget.component.scss"],
})
export class BarChartWidgetComponent implements OnInit, OnDestroy {
  @Input() dashboardCardItem: DashboardCardItem;
  @Output() dataLoadCompleted = new EventEmitter<string>();
  
  barChartOb$!: Subscription;

  screenCaption: string = "Since 1 week ago";

  medium: PbdsDatavizLine = {
    labels: [
      '2016-01-01T05:00:00.000Z',
      '2017-01-01T05:00:00.000Z',
      '2018-05-16T05:00:00.000Z',
      '2019-07-23T05:00:00.000Z',
      '2020-09-27T05:00:00.000Z'
    ],
    series: [
      {
        label: 'Dec 10th',
        values: [6159, 3585, 3686, 3321, 6697]
      },
      {
        label: 'Dec 17th',
        values: [4161, 3529, 6455, 5092, 2726]
      },
      {
        label: 'Dec 29',
        values: [2508, 6323, 2545, 4101, 5386]
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {
      this.loadData();
  }

  loadData() {
      this.dataLoadCompleted.emit();
  }

  ngOnDestroy(): void {
      if (
          this.barChartOb$ != null &&
          this.barChartOb$ != undefined
      ) {
          this.barChartOb$.unsubscribe();
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

  onCopy()
  {
    return false;
  }
}

