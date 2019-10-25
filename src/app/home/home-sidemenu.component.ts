import { Component, OnInit } from "@angular/core";
import { HomeService, CourseIndex } from "../shared";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'home-sidemenu',
    templateUrl: './home-sidemenu.component.html',
    styles: [`ul {
        list-style-type: none;
        margin:0;
        padding:0
      }
      a {
        text-decoration: none !important;
    }`]
})
export class HomeSideMenuComponent implements OnInit {
    mySidebar: boolean;
    routeItem = { category: '', courseId: 0, slug: '' }
    courseIndex = new CourseIndex();

    constructor(private homeService: HomeService,
        private route: ActivatedRoute) {
    }
    ngOnInit() {
        // this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.mySidebar = false;
        } else {
            this.mySidebar = true;
        }

        const id = +this.route.snapshot.paramMap.get('courseId');
        this.routeItem.courseId = id;
        this.routeItem.slug = this.route.snapshot.paramMap.get('slug');

        this.homeService.getCoursesById(id).subscribe(data => {
            this.courseIndex = data
        })
    }

    open() {
        this.mySidebar = true;
    }

    close() {
        this.mySidebar = false;
    }
}