import { Injectable } from "@angular/core";
import { ErrorModel, Topic, Editor } from "../models";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";

@Injectable()
export class TopicService {
    private errorLog = new ErrorModel();

    constructor(private apiService: ApiService) {
        this.errorLog.serviceName = "TopicService";
    }

    // private FormData(contents: Array<Editor>) {
    //     contents.forEach(element => {
    //         if (element.image) {
    //             const formData = new FormData();
    //             formData.append(element.image.name, element.image)
    //         }
    //     });
    // }

    create(item: Topic, contents: Array<Editor>): Observable<Topic> {
        this.errorLog.methodName = "create";
        item.contents = contents;
        const formData = new FormData();
        formData.append("source", JSON.stringify(item));
        contents.forEach(content => {
            if (content.image) {
                formData.append(content.image.name, content.image.image);
            }
        })
        return this.apiService.fileDatapost('api/topic', formData, this.errorLog).pipe(
            map(data => {
                return data;
            })
        );
    }

    Update(item: Topic, contents: Array<Editor>): Observable<boolean> {
        this.errorLog.methodName = "Update";
        item.contents = contents;
        const formData = new FormData();
        formData.append("source", JSON.stringify(item));
        contents.forEach(content => {
            if (content.image) {
                formData.append(content.image.name, content.image.image);
            }
        })
        return this.apiService.fileDataPut('api/topic/'+ item.topicId, formData, this.errorLog).pipe(
            map(data => {
                return data;
            })
        );
    }
    getAll(): Observable<Array<Topic>> {
        this.errorLog.methodName = "getAll";
        return this.apiService.get('api/topic', new HttpParams(), this.errorLog);
    }

    getById(id: number): Observable<Topic> {
        this.errorLog.methodName = "getById";
        return this.apiService.get('/api/topic/' + id, new HttpParams(), this.errorLog);
    }

    getByLesson(id: number): Observable<Array<Topic>> {
        this.errorLog.methodName = "getByCourse";
        return this.apiService.get('api/topic/getTopicByLesson/' + id, new HttpParams(), this.errorLog);
    }
}