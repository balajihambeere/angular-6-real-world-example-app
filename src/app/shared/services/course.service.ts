import { Injectable } from "@angular/core";
import { ErrorModel, Course, KeyValue } from "../models";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";

@Injectable()
export class CourseService {
    private errorLog = new ErrorModel();
    constructor(private apiService: ApiService) {
        this.errorLog.serviceName = "CourseService";
    }
    create(item: Course): Observable<Course> {
        this.errorLog.methodName = "create";
        return this.apiService.post('api/course', item, this.errorLog).pipe(
            map(data => {
                return data;
            })
        );
    }

    Update(item: Course): Observable<boolean> {
        this.errorLog.methodName = "Update";
        return this.apiService.put('api/course/' + item.courseId, item, this.errorLog).pipe
            (map(data => {
                return data;
            }));
    }
    getAll(): Observable<Array<Course>> {
        this.errorLog.methodName = "getAll";
        return this.apiService.get('api/course', new HttpParams(), this.errorLog);
    }

    getById(id: number): Observable<Course> {
        this.errorLog.methodName = "getById";
        return this.apiService.get('api/course/' + id, new HttpParams(), this.errorLog);
    }
    getkeyValuePair(id: number): Observable<Array<KeyValue>> {
        this.errorLog.methodName = "getkeyValuePair";
        return this.apiService.get('api/course/getKeyValueByCategory/' + id, new HttpParams(), this.errorLog);
    }

    getByCategory(id: number): Observable<Array<Course>> {
        this.errorLog.methodName = "getByCategory";
        return this.apiService.get('api/course/getCourseByCategory/' + id, new HttpParams(), this.errorLog);
    }
}