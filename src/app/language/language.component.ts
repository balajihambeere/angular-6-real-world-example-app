import { Component, OnInit } from "@angular/core";
import { Language, LanguageService } from "../shared";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'learning-language',
    templateUrl: './language.component.html'
})

export class LanguageComponent implements OnInit {
    languageForm: FormGroup;
    httpCommand: string;
    languages = new Array<Language>();

    constructor(private fb: FormBuilder,
        private languageService: LanguageService) {
        this.languageForm = this.fb.group({
            'languageId': 0,
            'name': ['', Validators.required],
            'isActive': ['', Validators.required]
        });
    }
    ngOnInit() {
        this.call();
    }
    open(command, id) {
        this.httpCommand = command;
        if (command === "update") {
            this.languageService.getById(id).subscribe(data => {
                this.languageForm.setValue({
                    'languageId': data.languageId,
                    'name': data.name,
                    'isActive': data.isActive.toString()
                })
                document.getElementById('id01').style.display = 'block';
            })
        } else {
            this.languageForm = this.fb.group({
                'languageId': 0,
                'name': ['', Validators.required],
                'isActive': ['', Validators.required]
            });
            document.getElementById('id01').style.display = 'block';
        }
    }

    close(command) {
        this.httpCommand = command;
        document.getElementById('id01').style.display = 'none';
    }

    submitForm() {
        const item = this.languageForm.value;
        item.isActive = JSON.parse(item.isActive);//convert a string to boolean in JavaScript
        if (this.httpCommand === "create") {
            this.languageService.create(item).subscribe(data => {
                document.getElementById('id01').style.display = 'none';
                this.call();
            })
        } else if (this.httpCommand === "update") {
            this.languageService.Update(item).subscribe(data => {
                document.getElementById('id01').style.display = 'none';
                this.call();
            })
        }
    }

    call() {
        this.languageService.getAll().subscribe(data => {
            this.languages = data
        })
    }
}