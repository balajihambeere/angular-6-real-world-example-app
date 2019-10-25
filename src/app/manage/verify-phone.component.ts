import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'Learningtv-verify-phone',
    templateUrl: './verify-phone.component.html',
    styleUrls: ['./verify-phone.component.css']
})

export class VerifyPhoneComponent implements OnInit {
    verifyCodeForm: FormGroup;
    phoneNumber: string = '';

    constructor(private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder) {
        // use FormBuilder to create a form group
        this.verifyCodeForm = this.fb.group({
            'code': ['', Validators.required],
            'phoneNumber': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['phoneNumber']) {
                this.phoneNumber = params['phoneNumber'];
                this.verifyCodeForm.controls['phoneNumber'].setValue(params['phoneNumber']);
            }
        });
    }

    submitForm() { }
}