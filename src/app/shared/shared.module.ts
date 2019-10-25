import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShowAuthedDirective } from "./show-authed.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ShowAuthedDirective
    ],
    exports: [
        CommonModule,
        ShowAuthedDirective
    ]
})
export class SharedModule {

}