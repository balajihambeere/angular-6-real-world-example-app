import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseComponent } from "./course.component";
import { CourseListComponent } from "./course-list.component";

const paymentTypeRoutes: Routes = [
    { path: '', component: CourseListComponent },
    { path: ':courseId', component: CourseListComponent },
    { path: 'manage/:courseId', component: CourseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(paymentTypeRoutes)],
    exports: [RouterModule]
})
export class CourseRoutingModule {

}
