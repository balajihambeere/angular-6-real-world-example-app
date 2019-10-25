import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TopicRoutingModule } from "./topic-routing.module";
import { TopicListComponent } from "./topic-list.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopicComponent } from "./topic.component";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { HttpClientModule } from "@angular/common/http";
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularEditorModule,
        HighlightJsModule,
        TopicRoutingModule,
    ],
    declarations: [
        TopicListComponent,
        TopicComponent,
    ]
})
export class TopicModule { }