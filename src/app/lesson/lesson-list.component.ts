import { Component, OnInit } from "@angular/core";
import { Lesson, LessonService, CourseService, CategoryService, KeyValue } from "../shared";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'learing-lesson-list',
    templateUrl: './lesson-list.component.html'
})

export class LessonListComponent implements OnInit {
    lessons = new Array<Lesson>();
    courses = new Array<KeyValue>();
    categories = new Array<KeyValue>();
    selectedItem = 0;

    constructor(private route: ActivatedRoute,
        private lessonService: LessonService,
        private courseService: CourseService,
        private categoryService: CategoryService) {
    }
    ngOnInit() {
        this.loadCategories();
        const id = +this.route.snapshot.paramMap.get('lessonId');
        if (id > 0) {
            this.lessonService.getById(id).subscribe(data => {
                this.lessons.push(data);
            })
        }
    }

    loadCategories() {
        this.categoryService.getkeyValuePair().subscribe(data => {
            this.categories = data
        })
    }

    categorySelectionChanged(selectedItem: number) {
        if (selectedItem > 0) {
            this.courses = new Array<KeyValue>();
            this.courseService.getkeyValuePair(selectedItem).subscribe(data => {
                this.courses = data
            })
        }
    }
    courseSelectionChanged(selectedItem: number) {
        if (selectedItem > 0) {
            this.lessons = new Array<Lesson>();
            this.lessonService.getByCourse(selectedItem).subscribe(data => {
                this.lessons = data
            })
        }
    }
}