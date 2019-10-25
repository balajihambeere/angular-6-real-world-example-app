import { Injectable } from "@angular/core";
import { ErrorModel, Lesson, KeyValue } from "../models";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";

@Injectable()
export class LessonService {
    private errorLog = new ErrorModel();
    constructor(private apiService: ApiService) {
        this.errorLog.serviceName = "LessonService";
    }
    create(item: Lesson): Observable<Lesson> {
        this.errorLog.methodName = "create";
        return this.apiService.post('api/lesson', item, this.errorLog).pipe(
            map(data => {
                return data;
            })
        );
    }

    Update(item: Lesson): Observable<boolean> {
        this.errorLog.methodName = "Update";
        return this.apiService.put('api/lesson/' + item.lessonId, item, this.errorLog).pipe
            (map(data => {
                return data;
            }));
    }
    getAll(): Observable<Array<Lesson>> {
        this.errorLog.methodName = "getAll";
        return this.apiService.get('api/lesson', new HttpParams(), this.errorLog);
    }

    getById(id: number): Observable<Lesson> {
        this.errorLog.methodName = "getById";
        return this.apiService.get('api/lesson/' + id, new HttpParams(), this.errorLog);
    }

    getByCourse(id: number): Observable<Array<Lesson>> {
        this.errorLog.methodName = "getByCourse";
        return this.apiService.get('api/lesson/getLessonByCourse/' + id, new HttpParams(), this.errorLog);
    }

    getkeyValuePair(id: number): Observable<Array<KeyValue>> {
        this.errorLog.methodName = "getKeyValueByCourse";
        return this.apiService.get('api/lesson/getKeyValueByCourse/' + id, new HttpParams(), this.errorLog);
    }
}