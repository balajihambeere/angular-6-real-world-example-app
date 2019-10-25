import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TopicListComponent } from "./topic-list.component";
import { TopicComponent } from "./topic.component";

const paymentTypeRoutes: Routes = [
    { path: '', component: TopicListComponent },
    { path: ':topicId', component: TopicListComponent },
    { path: 'manage/:topicId', component: TopicComponent }   
];

@NgModule({
    imports: [RouterModule.forChild(paymentTypeRoutes)],
    exports: [RouterModule]
})
export class TopicRoutingModule {

}
