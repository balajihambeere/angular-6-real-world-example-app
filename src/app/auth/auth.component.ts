import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService, MessageService } from "../shared";

@Component({
    selector: 'auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit {
    authForm: FormGroup;
    authType: String = '';
    title: String = '';
    isSubmitting = false;
    buttonTitle: String = '';

    constructor(private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService) {
        this.authForm = this.fb.group({
            'userName': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.url.subscribe(data => {
            // Get the last piece of the URL (it's either 'login' or 'register')
            this.authType = data[data.length - 1].path;
            // Set a title for the page accordingly
            this.title = (this.authType === 'login') ? 'Please login here..' : 'Create a new account';
            this.buttonTitle = (this.authType === 'login') ? 'Login' : 'Create Account';
            // add form control for username if this is the register page
            if (this.authType === 'register') {
                this.authForm.addControl('confirmPassword', new FormControl('', Validators.required));
            }
        });
    }



    submitForm() {
        this.isSubmitting = true;
        const credentials = this.authForm.value;
        this.authService.auth(this.authType, credentials).subscribe(data => {
            if (!this.messageService.messages.length) {
                if (this.authType === 'register') {
                    this.router.navigateByUrl('login');
                } else {
                    this.router.navigateByUrl(data.redirectUrl);
                }
            }
        })
    }
}