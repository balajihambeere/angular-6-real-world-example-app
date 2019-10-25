import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { LanguageRoutingModule } from "./language-routing.module";
import { LanguageComponent } from "./language.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LanguageRoutingModule,
    ],
    declarations: [
        LanguageComponent,
    ]
})
export class LanguageModule { }