import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from "./home-routing.module";
import { HomeHeaderComponent } from "./home-header.component";
import { HomeContentComponent } from "./home-content.component";
import { SharedModule } from '../shared';
import { HomeDetailsComponent } from "./home-details.component";
import { AboutComponent } from "../about/about-component";
import { HomeSideMenuComponent } from "./home-sidemenu.component";
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { HighlightJsModule } from 'ngx-highlight-js';
import { FormsModule } from "@angular/forms";
@NgModule({
    imports: [
        CommonModule,
        FormsModule, 
        NgProgressModule.forRoot(),
        NgProgressHttpModule,
        SharedModule,
        HomeRoutingModule,
        HighlightJsModule
    ],
    declarations: [
        HomeHeaderComponent,
        HomeContentComponent,
        HomeSideMenuComponent,
        HomeDetailsComponent,
        AboutComponent
    ]
})
export class HomeModule { }