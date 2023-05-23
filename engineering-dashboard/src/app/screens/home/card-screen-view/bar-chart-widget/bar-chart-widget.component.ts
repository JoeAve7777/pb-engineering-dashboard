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
import { PbdsDatavizLine } from 'pb-design-system/dataviz';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
    selector: "app-bar-chart-widget",
    templateUrl: "./bar-chart-widget.component.html",
    styleUrls: ["./bar-chart-widget.component.scss"],
})
export class BarChartWidgetComponent implements OnInit, OnDestroy {
    @Input() dashboardCardItem: DashboardCardItem;
    @Output() dataLoadCompleted = new EventEmitter<string>();

    @ViewChild('chartCanvas') chartCanvas: any;

    barChartOb$!: Subscription;

    screenCaption: string = "Since 1 week ago";

    // medium: PbdsDatavizLine = {
    //     labels: [
    //         '2016-01-01T05:00:00.000Z',
    //         '2017-01-01T05:00:00.000Z',
    //         '2018-05-16T05:00:00.000Z',
    //         '2019-07-23T05:00:00.000Z',
    //         '2020-09-27T05:00:00.000Z'
    //     ],
    //     series: [
    //         {
    //             label: 'Dec 10th',
    //             values: [6159, 3585, 3686, 3321, 6697]
    //         },
    //         {
    //             label: 'Dec 17th',
    //             values: [4161, 3529, 6455, 5092, 2726]
    //         },
    //         {
    //             label: 'Dec 29',
    //             values: [2508, 6323, 2545, 4101, 5386]
    //         }
    //     ]
    // };

    constructor() { }

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
  
    data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: this.screenCaption,
                fill: false,
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--h1_color'),
                yAxisID: 'y',
                tension: 0.4,
                data: [65, 59, 80, 81, 56, 55, 10]
            },
            {
                label: this.screenCaption,
                fill: false,
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue'),
                tension: 0.4,
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    options: ChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: 'black'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'black'
                },
                grid: {
                    color: 'black'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: 'black'
                },
                grid: {
                    color: 'black'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: 'black'
                },
                grid: {
                    drawOnChartArea: false,
                    color: 'black'
                }
            }
        }
    };
}

