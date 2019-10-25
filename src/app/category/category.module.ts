import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryComponent } from "./category.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CategoryRoutingModule,
    ],
    declarations: [
        CategoryComponent,
    ]
})
export class CategoryModule { }