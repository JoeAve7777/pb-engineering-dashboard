import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from "@angular/core";
import { DashboardCardItem } from "../dashboard-card-item.model";

@Component({
    selector: "app-dashboard-thumbnail",
    templateUrl: "./dashboard-thumbnail.component.html",
    styleUrls: ["./dashboard-thumbnail.component.scss"],
})
export class DashboardThumbnailComponent {
    @Input() dashboardCardItem: DashboardCardItem;
    @ViewChild("dtn") dtnElement: ElementRef;

    onClick() {
        this.dashboardCardItem.isVisible = true;
    }
}
