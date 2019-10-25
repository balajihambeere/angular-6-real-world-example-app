import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { DashboardContentComponent } from "./dashboard-content.component";
import { AuthGuard } from "../shared";
import { CourseModule } from "../course/course.module";
import { LessonModule } from "../lesson/lesson.module";
import { CategoryModule } from "../category/category.module";
import { TopicModule } from "../topic/topic.module";
import { LanguageModule } from "../language/language.module";


const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardContentComponent, pathMatch: 'full' },
            { path: 'categories', loadChildren: '../category/category.module#CategoryModule' },
            { path: 'courses', loadChildren: '../course/course.module#CourseModule' },
            { path: 'lessons', loadChildren: '../lesson/lesson.module#LessonModule' },
            { path: 'topics', loadChildren: '../topic/topic.module#TopicModule' },
            { path: 'languages', loadChildren: '../language/language.module#LanguageModule' }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}