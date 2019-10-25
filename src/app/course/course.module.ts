import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseRoutingModule } from "./course-routing.module";
import { CourseComponent } from "./course.component";
import { CourseListComponent } from "./course-list.component";
import { AngularEditorModule } from "@kolkov/angular-editor";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CourseRoutingModule,
        AngularEditorModule
    ],
    declarations: [
        CourseComponent,
        CourseListComponent
    ]
})
export class CourseModule { }