import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CourseService, LessonService, TopicService, CategoryService, KeyValue, Editor, ImageModel, CodeModel, ContentModel, CommunicationService, LanguageService } from "../shared";
import { AngularEditorConfig } from "@kolkov/angular-editor";


@Component({
    selector: 'Learningtv-topic',
    templateUrl: './topic.component.html'
})

export class TopicComponent implements OnInit {
    postForm: FormGroup;
    courses = new Array<KeyValue>();
    lessons = new Array<KeyValue>();
    categories = new Array<KeyValue>();
    editorArray = new Array<Editor>();
    codeAction: string;

    //Content code Starts here
    htmlContent: string;
    contentObject = new ContentModel();

    // content code starts here
    code: string;
    languages = new Array<KeyValue>();
    langSelected: string;
    codeObject = new CodeModel();

    //image code starst here
    imageString: string;
    imageObject = new ImageModel();

    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '25rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        customClasses: []
    };

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private courseService: CourseService,
        private lessonService: LessonService,
        private topicService: TopicService,
        private categoryService: CategoryService,
        private languageService: LanguageService) {
        this.postForm = this.fb.group({
            'topicId': 0,
            'title': ['', Validators.required],
            'isActive': ['false', Validators.required],
            'lessonId': [0, Validators.required],
            'categoryId': [0, Validators.required],
            'courseId': [0, Validators.required],
        });

    }
    ngOnInit() {
        this.codeAction = "Add";
        this.loadCategories();
        this.loadLanguages();
        const id = +this.route.snapshot.paramMap.get('topicId');
        if (id > 0) {
            this.topicService.getById(id).subscribe(data => {
                this.editorArray = data.contents;
                this.courseService.getkeyValuePair(data.categoryId).subscribe(data => {
                    this.courses = data
                })
                this.lessonService.getkeyValuePair(data.lessonId).subscribe(data => {
                    this.lessons = data
                })
                this.postForm.setValue({
                    'topicId': data.topicId,
                    'title': data.title,
                    'isActive': data.isActive.toString(),
                    'lessonId': data.lessonId,
                    'courseId': data.courseId,
                    'categoryId': data.categoryId
                })
            })
        }

    }

    submitForm() {
        const item = this.postForm.value;

        if (item.topicId > 0) {
            this.topicService.Update(item, this.editorArray).subscribe(data => {
                this.router.navigate(['/dashboard/topics', item.topicId]);
            })

        } else {
            this.topicService.create(item, this.editorArray).subscribe(data => {
                this.router.navigate(['/dashboard/topics', item.topicId]);
            })
        }
    }

    loadCategories() {
        this.categoryService.getkeyValuePair().subscribe(data => {
            this.categories = data
        })
    }

    categorySelectionChanged(selectedItem: number) {
        this.courseService.getkeyValuePair(selectedItem).subscribe(data => {
            this.courses = data
        })
    }
    courseSelectionChanged(selectedItem: number) {
        this.lessonService.getkeyValuePair(selectedItem).subscribe(data => {
            this.lessons = data
        })
    }

    // Content code starts here
    openContentPopUp() {
        this.htmlContent = "";
        this.contentObject = null;
        document.getElementById('contentId').style.display = 'block';
    }

    onContentAdd(contentModel: ContentModel) {
        if (!contentModel) {
            contentModel = new ContentModel();
            contentModel.key = this.editorArray.length;
            contentModel.htmlContent = this.htmlContent;
            var editor = new Editor();
            editor.htmlContent = contentModel;
            this.editorArray.push(editor);
        } else {
            this.editorArray.forEach(element => {
                if (element.htmlContent.htmlContent) {
                    if (element.htmlContent.key === contentModel.key) {
                        element.htmlContent.htmlContent = this.htmlContent;
                    }
                }
            });
        }
        document.getElementById('contentId').style.display = 'none';
    }

    onContentUpdate(contentModel: ContentModel) {
        document.getElementById('contentId').style.display = 'block';
        this.htmlContent = contentModel.htmlContent;
        this.contentObject = contentModel;
    }
    //Ends here

    //content code starts here
    openCodePopUp() {
        this.code = "";
        this.codeObject = null;
        document.getElementById('codeId').style.display = 'block';
    }

    onCodeAdd(codeModel: CodeModel) {
        if (!codeModel) {
            codeModel = new CodeModel();
            codeModel.key = this.editorArray.length;
            codeModel.code = this.code;
            codeModel.language = this.langSelected;
            var editor = new Editor();
            editor.code = codeModel;
            this.editorArray.push(editor);
        } else {
            this.editorArray.forEach(element => {
                if (element.code.code) {
                    if (element.code.key === codeModel.key) {
                        element.code.code = this.code;
                    }
                }
            });
        }
        document.getElementById('codeId').style.display = 'none';
    }

    onCodeUpdate(codeModel: CodeModel) {
        document.getElementById('codeId').style.display = 'block';
        this.code = codeModel.code;
        this.codeObject = codeModel;
    }

    loadLanguages() {
        this.languageService.getkeyValuePair().subscribe(data => {
            this.languages = data
        })
    }

    languageSelectionChanged(selectedItem: string) {
        this.langSelected = selectedItem;
    }

    //ends here

    //Image code starts here
    openImagePopUp() {
        this.imageString = "";
        this.imageObject = null;
        document.getElementById('imageId').style.display = 'block';
    }

    onImageAdd(imageModel: ImageModel) {
        if (!(imageModel.key || imageModel.key == 0)) {
            let imageM = new ImageModel();
            imageM.key = this.editorArray.length;
            imageM.imageUrl = this.imageString;
            imageM.image = imageModel.image;
            imageM.name = imageModel.name;
            var editor = new Editor();
            editor.image = imageM;
            this.editorArray.push(editor);
        }
        else {
            this.editorArray.forEach(element => {
                if (element.image) {
                    if (element.image.key === imageModel.key) {
                        element.image = imageModel;
                        element.image.imageUrl = this.imageString;
                    }
                }
            });
        }

        document.getElementById('imageId').style.display = 'none';
    }

    onImageUpdate(imageModel: ImageModel) {
        document.getElementById('imageId').style.display = 'block';
        this.imageString = imageModel.imageUrl;
        this.imageObject = imageModel;
    }

    onImageChanged(event: any) {
        if (!this.imageObject) {
            this.imageObject = new ImageModel();
        }
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            this.imageObject.image = file;
            var reader = new FileReader();
            reader.onload = (e: any) => {
                this.imageObject.imageUrl = e.target.result;
                this.imageString = e.target.result;
                this.imageObject.name = file.name;
            };
            reader.readAsDataURL(file);
        }
    }
    //ends here
}