import { Component, OnInit } from "@angular/core";
import { CourseService, Course, CategoryService, KeyValue } from "../shared";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'learning-course-list',
    templateUrl: './course-list.component.html'
})

export class CourseListComponent implements OnInit {
    courses = new Array<Course>();
    categories = new Array<KeyValue>();
    selectedItem = 0;

    constructor(private courseService: CourseService,
        private route: ActivatedRoute,
        private router: Router,
        private categoryService: CategoryService) {
    }
    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
        this.loadCategories();
        const id = +this.route.snapshot.paramMap.get('courseId');
        if (id > 0) {
            this.courseService.getById(id).subscribe(data => {
                this.selectedItem = data.categoryId;
                this.courses.push(data);
            })
        }
    }
    loadCategories() {
        this.categoryService.getkeyValuePair().subscribe(data => {
            this.categories = data
        })
    }

    categorySelectionChanged(selectedItem: number) {
        this.courseService.getByCategory(selectedItem).subscribe(data => {
            this.courses = data
        })
    }
}