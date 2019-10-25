import { Component, OnInit } from "@angular/core";
import { CourseList, KeyValue, HomeService } from "../shared";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'home-content',
    templateUrl: './home-content.component.html'
})
export class HomeContentComponent implements OnInit {
    categories = new Array<KeyValue>();
    courses = new Array<CourseList>();

    constructor(private homeService: HomeService,
        private router: Router,
        private route: ActivatedRoute) {

    }
    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
        const id = +this.route.snapshot.paramMap.get('key');
        if (id > 0) {
            this.courses = new Array<CourseList>();
            this.homeService.getCoursesByCategorId(id).subscribe(data => {
                this.courses = data
            })
        } else {
            this.loadCourses();
        }
    }

    loadCourses() {
        this.homeService.getCourses().subscribe(data => {
            this.courses = data
        })
    }
}