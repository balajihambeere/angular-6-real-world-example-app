import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LessonRoutingModule } from "./lesson-routing.module";
import { LessonComponent } from "./lesson.component";
import { LessonListComponent } from "./lesson-list.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LessonRoutingModule,
    ],
    declarations: [
        LessonListComponent,
        LessonComponent,
    ]
})
export class LessonModule { }