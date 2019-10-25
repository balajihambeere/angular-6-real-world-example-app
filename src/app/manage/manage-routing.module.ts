import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VerifyPhoneComponent } from "./verify-phone.component";

const manageRoutes: Routes = [
    { path: 'verify/code/:phoneNumber', component: VerifyPhoneComponent }
];

@NgModule({
    imports: [RouterModule.forChild(manageRoutes)],
    exports: [RouterModule]
})
export class ManageRoutingModule {

}