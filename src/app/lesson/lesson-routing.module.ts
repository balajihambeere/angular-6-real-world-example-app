import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LessonComponent } from "./lesson.component";
import { LessonListComponent } from "./lesson-list.component";


const paymentTypeRoutes: Routes = [
    { path: '', component: LessonListComponent },
    { path: ':lessonId', component: LessonListComponent },
    { path: 'manage/:lessonId', component: LessonComponent }
];

@NgModule({
    imports: [RouterModule.forChild(paymentTypeRoutes)],
    exports: [RouterModule]
})
export class LessonRoutingModule {

}
