import { Component, OnInit } from "@angular/core";
import { TopicService, Topic, CourseService, LessonService, CategoryService, KeyValue } from "../shared";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'learning-topic-list',
    templateUrl: './topic-list.component.html',
    styles: [`
    textarea {
        resize: none;
      }`]
})

export class TopicListComponent implements OnInit {
    topics = new Array<Topic>();
    courses = new Array<KeyValue>();
    lessons = new Array<KeyValue>();
    categories = new Array<KeyValue>();

    constructor(private route: ActivatedRoute,
        private topicService: TopicService,
        private courseService: CourseService,
        private lessonService: LessonService,
        private categoryService: CategoryService) {

    }
    ngOnInit() {
        this.loadCategories();
        const id = +this.route.snapshot.paramMap.get('topicId');
        if (id > 0) {
            this.topicService.getById(id).subscribe(data => {
                this.topics.push(data);
            })
        }
    }

    loadCategories() {
        this.categoryService.getkeyValuePair().subscribe(data => {
            this.categories = data
        })
    }

    categorySelectionChanged(selectedItem: number) {
        if (selectedItem > 0) {
            this.courseService.getkeyValuePair(selectedItem).subscribe(data => {
                this.courses = data
            })
        }
    }
    courseSelectionChanged(selectedItem: number) {
        if (selectedItem > 0) {
            this.lessonService.getkeyValuePair(selectedItem).subscribe(data => {
                this.lessons = data
            })
        }
    }

    lessonSelectionChanged(selectedItem: number) {
        this.topics = new Array<Topic>();
        if (selectedItem > 0) {
            this.topicService.getByLesson(selectedItem).subscribe(data => {
                this.topics = data
            })
        }
    }
}