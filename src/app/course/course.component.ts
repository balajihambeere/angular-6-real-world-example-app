import { Component, OnInit } from "@angular/core";
import { CourseService, CategoryService, KeyValue } from "../shared";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
    selector: 'learning-course',
    templateUrl: './course.component.html',
    styles: [`
    textarea {
        resize: none;
      }`]
})

export class CourseComponent implements OnInit {
    courseForm: FormGroup;
    categories = new Array<KeyValue>();
    
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '25rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        customClasses: []
    };

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private courseService: CourseService,
        private categoryService: CategoryService) {
        this.courseForm = this.fb.group({
            'courseId': 0,
            'name': ['', Validators.required],
            'description': ['', Validators.required],
            'isActive': ['', Validators.required],
            'categoryId': [0, Validators.required]
        });
    }
    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('courseId');
        if (id > 0) {
            this.courseService.getById(id).subscribe(data => {
                this.courseForm.setValue({
                    'courseId': data.courseId,
                    'name': data.name,
                    'description': data.description,
                    'isActive': data.isActive,
                    'categoryId': data.categoryId
                })
            })
        }
        this.loadCategories();
    }

    submitForm() {
        const item = this.courseForm.value;
        item.isActive = JSON.parse(item.isActive);//convert a string to boolean in JavaScript
        if (item.courseId > 0) {
            this.courseService.Update(item).subscribe(data => {
                this.router.navigate(['/dashboard/courses', item.courseId]);
            })
        } else {
            this.courseService.create(item).subscribe(data => {
                this.router.navigate(['/dashboard/courses', data.courseId]);
            })
        }
    }

    loadCategories() {
        this.categoryService.getkeyValuePair().subscribe(data => {
            this.categories = data
        })
    }
}