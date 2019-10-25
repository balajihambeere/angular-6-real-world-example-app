import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LanguageComponent } from "./language.component";

const languageRoutes: Routes = [
    { path: '', component: LanguageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(languageRoutes)],
    exports: [RouterModule]
})
export class LanguageRoutingModule {

}
