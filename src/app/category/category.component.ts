import { Component, OnInit } from "@angular/core";
import { Category, CategoryService } from "../shared";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'learning-category',
    templateUrl: './category.component.html'
})

export class CategoryComponent implements OnInit {
    categoryForm: FormGroup;
    httpCommand: string;
    categories = new Array<Category>();

    constructor(private fb: FormBuilder,
        private router: Router,
        private categoryService: CategoryService) {
        this.categoryForm = this.fb.group({
            'categoryId': 0,
            'name': ['', Validators.required],
            'isActive': ['', Validators.required]
        });
    }
    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
        this.call();
    }
    open(command, id) {
        this.httpCommand = command;
        if (command === "update") {
            this.categoryService.getById(id).subscribe(data => {
                this.categoryForm.setValue({
                    'categoryId': data.categoryId,
                    'name': data.name,
                    'isActive': data.isActive.toString()
                })
                document.getElementById('id01').style.display = 'block';
            })
        } else {
            this.categoryForm = this.fb.group({
                'categoryId': 0,
                'name': ['', Validators.required],
                'isActive': ['', Validators.required]
            });
            document.getElementById('id01').style.display = 'block';
        }
    }

    close(command) {
        this.httpCommand = command;
        document.getElementById('id01').style.display = 'none';
    }

    submitForm() {
        const item = this.categoryForm.value;
        item.isActive = JSON.parse(item.isActive);//convert a string to boolean in JavaScript
        if (this.httpCommand === "create") {
            this.categoryService.create(item).subscribe(data => {
                document.getElementById('id01').style.display = 'none';
                this.call();
            })
        } else if (this.httpCommand === "update") {
            this.categoryService.Update(item).subscribe(data => {
                document.getElementById('id01').style.display = 'none';
                this.call();
            })
        }
    }

    call() {
        this.categoryService.getAll().subscribe(data => {
            this.categories = data
        })
    }
}