import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyPhoneComponent } from "./verify-phone.component";
import { ManageRoutingModule } from "./manage-routing.module";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ManageRoutingModule,
    ],
    declarations: [
        VerifyPhoneComponent
    ]
})
export class ManageModule { }