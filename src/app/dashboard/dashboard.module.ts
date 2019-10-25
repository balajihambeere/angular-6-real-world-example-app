import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardContentComponent } from "./dashboard-content.component";
@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
    ],
    declarations: [
        DashboardComponent,
        DashboardContentComponent
    ]
})
export class DashboardModule { }