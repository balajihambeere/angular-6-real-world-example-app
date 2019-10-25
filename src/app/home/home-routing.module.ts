import { NgModule } from "@angular/core";
import { RouterModule, Routes, UrlSegment, UrlMatchResult } from "@angular/router";
import { HomeHeaderComponent } from "./home-header.component";
import { HomeContentComponent } from "./home-content.component";
import { AuthModule } from '../auth/auth.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ManageModule } from '../manage/manage.module';
import { HomeDetailsComponent } from "./home-details.component";
import { AboutComponent } from "../about/about-component";
import { HomeSideMenuComponent } from "./home-sidemenu.component";

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeHeaderComponent,
        children: [
            { path: '', component: HomeContentComponent, pathMatch: 'full' },
            { path: 'category/:key/:value', component: HomeContentComponent },
            {
                path: 'courseDetails/:courseId/:slug', component: HomeSideMenuComponent,
                children: [
                    { path: '', component: HomeDetailsComponent },
                    { path: ':topicId/:slug', component: HomeDetailsComponent }
                ]
            },
            { path: 'about', component: AboutComponent },
            { path: '', loadChildren: '../auth/auth.module#AuthModule' },
            { path: '', loadChildren: '../manage/manage.module#ManageModule' },
        ]
    },
    {
        path: 'dashboard',
        children: [
            { path: '', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}