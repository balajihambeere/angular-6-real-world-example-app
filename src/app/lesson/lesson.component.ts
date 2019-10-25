import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LessonService, CourseService, CategoryService, KeyValue } from "../shared";

@Component({
    selector: 'learing-lesson',
    templateUrl: './lesson.component.html'
})

export class LessonComponent implements OnInit {
    lessonForm: FormGroup;
    courses = new Array<KeyValue>();
    categories = new Array<KeyValue>();

    constructor(private fb: FormBuilder,
        private lessonService: LessonService,
        private courseService: CourseService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router) {
        this.lessonForm = this.fb.group({
            'lessonId': 0,
            'name': ['', Validators.required],
            'isActive': ['', Validators.required],
            'courseId': [0, Validators.required],
            'categoryId': [0, Validators.required],
        });
    }
    ngOnInit() {
        this.loadCategories();
        const id = +this.route.snapshot.paramMap.get('lessonId');
        if (id > 0) {
            this.lessonService.getById(id).subscribe(data => {
                this.courseService.getkeyValuePair(data.categoryId).subscribe(data => {
                    this.courses = data
                })
                this.lessonForm.setValue({
                    'lessonId': data.lessonId,
                    'name': data.name,
                    'isActive': data.isActive.toString(),
                    'courseId': data.courseId,
                    'categoryId': data.categoryId
                })
            })
        }
    }

    submitForm() {
        const item = this.lessonForm.value;
        if (item.lessonId > 0) {
            this.lessonService.Update(item).subscribe(data => {
                this.router.navigate(['/dashboard/lessons', item.lessonId]);
            })

        } else {
            this.lessonService.create(item).subscribe(data => {
                this.router.navigate(['/dashboard/lessons', data.lessonId]);
            })
        }
    }

    loadCategories() {
        this.categoryService.getkeyValuePair().subscribe(data => {
            this.categories = data
        })
    }

    categorySelectionChanged(selectedItem: number) {
        this.courseService.getkeyValuePair(selectedItem).subscribe(data => {
            this.courses = data
        })
    }
}