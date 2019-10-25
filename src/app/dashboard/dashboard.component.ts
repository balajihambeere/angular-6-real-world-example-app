import { Component } from "@angular/core";
import { AuthService } from "../shared";
import { Router } from "@angular/router";

@Component({
    selector: 'yaaestateadmin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    mySidebar = true;
    constructor(private authService: AuthService, private router: Router) {
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.mySidebar = false;
        } else {
            this.mySidebar = true;
        }
    }
    open() {
        this.mySidebar = true;
    }
    close() {
        this.mySidebar = false;
    }


    logout() {
        this.authService.purgeAuth();
        this.router.navigateByUrl('');
    }
}