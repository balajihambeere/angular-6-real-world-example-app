import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseService, Topic, TopicService } from "../shared";

@Component({
    selector: 'home-details',
    templateUrl: './home-details.component.html',
})

export class HomeDetailsComponent implements OnInit {
    course = new Course();
    topic = new Topic();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private courseService: CourseService,
        private topicService: TopicService) {
    }
    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };

        const courseId = +this.route.snapshot.paramMap.get('courseId');
        const topicId = +this.route.snapshot.paramMap.get('topicId');
        
        if (courseId > 0) {
            this.courseService.getById(courseId).subscribe(data => {
                this.course = data
            })
        }

        if (topicId > 0) {
            this.topicService.getById(topicId).subscribe(data => {
                this.topic = data
                console.log(data);
            })
        }
    }
}