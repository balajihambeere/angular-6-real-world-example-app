import { Component } from "@angular/core";
import { HomeService, KeyValue } from "../shared";

@Component({
    selector: 'home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {
    mySidebar = false;
    categories = new Array<KeyValue>();

    constructor(private homeService: HomeService) {

    }
    ngOnInit() {
        this.loadCategories();
    }
    loadCategories() {
        this.homeService.getCategories().subscribe(data => {
            this.categories = data;
        })
    }
    open() {
        this.mySidebar = true;
    }
    close() {
        this.mySidebar = false;
    }
}