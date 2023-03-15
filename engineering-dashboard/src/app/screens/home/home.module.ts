import { NgModule, APP_INITIALIZER, ErrorHandler } from "@angular/core";
import { DatePipe } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { PbdsProgressSpinnerModule } from "pb-design-system/progress-spinner";
import { PbdsDatavizModule } from "pb-design-system/dataviz";
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JsonAppConfigService } from "@app/config/json-app-config.service";
import { AppConfiguration } from "@app/config/app-configuration";

import { DashboardThumbnailListComponent } from "./dashboard/dashboard-thumbnail-list/dashboard-thumbnail-list.component";
import { DashboardCardListComponent } from "./dashboard/dashboard-card-list/dashboard-card-list.component";
import { DashboardThumbnailComponent } from "./dashboard/dashboard-thumbnail/dashboard-thumbnail.component";
import { DashboardCardComponent } from "./dashboard/dashboard-card/dashboard-card.component";
import { BarChartWidgetComponent } from "./card-screen-view/bar-chart-widget/bar-chart-widget.component";
import { DataGridPageComponent } from "./full-screen-view/data-grid-page/data-grid-page.component";
import { SentWelcomeEmailPageComponent } from "./full-screen-view/sent-welcome-email-page/sent-welcome-email-page.component";
import { SentWelcomeEmailComponent } from "./card-screen-view/sent-welcome-email/sent-welcome-email.component";
import { RecentLoginsComponent } from "./card-screen-view/recent-logins/recent-logins.component";
import { RecentImpersonationComponent } from "./card-screen-view/recent-impersonation/recent-impersonation.component";
import { NewGuamUsersComponent } from "./card-screen-view/new-guam-users/new-guam-users.component";
import { MigrationWelcomeEmailComponent } from "./card-screen-view/migration-welcome-email/migration-welcome-email.component";
import { RecentDeviceUsageComponent } from "./card-screen-view/recent-device-usage/recent-device-usage.component";

@NgModule({
    imports: [
        SharedModule,
        HomeRoutingModule,
        CardModule,
        TableModule,
        PbdsProgressSpinnerModule,
        PbdsDatavizModule,
    ],
    declarations: [
        HomeComponent,
        DashboardThumbnailListComponent,
        DashboardCardListComponent,
        DashboardThumbnailComponent,
        DashboardCardComponent,
        BarChartWidgetComponent,
        DataGridPageComponent,
        SentWelcomeEmailComponent,
        SentWelcomeEmailPageComponent,
        RecentLoginsComponent,
        RecentImpersonationComponent,
        NewGuamUsersComponent,
        MigrationWelcomeEmailComponent,
        RecentDeviceUsageComponent
    ],
    providers: [
        DatePipe,
        {
            provide: AppConfiguration,
            deps: [HttpClient],
            useExisting: JsonAppConfigService,
        },
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [JsonAppConfigService],
            useFactory: initializerFn,
        },
    ],
    exports: [],
})
export class HomeModule {}

export function initializerFn(jsonAppConfigService: JsonAppConfigService) {
    return () => {
        return jsonAppConfigService.load();
    };
}
