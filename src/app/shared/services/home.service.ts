import { Injectable } from "@angular/core";
import { ErrorModel, KeyValue, CourseList, CourseIndex } from "../models";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class HomeService {

    private errorLog = new ErrorModel();
    constructor(private apiService: ApiService) {
        this.errorLog.serviceName = "HomeService";
    }

    getCategories(): Observable<Array<KeyValue>> {
        this.errorLog.methodName = "getCategories";
        return this.apiService.get('api/home/getCategories', new HttpParams(), this.errorLog);
    }

    getCourses(): Observable<Array<CourseList>> {
        this.errorLog.methodName = "getCourses";
        return this.apiService.get('api/home/getCourses', new HttpParams(), this.errorLog);
    }

    getCoursesByCategorId(id: number): Observable<Array<CourseList>> {
        this.errorLog.methodName = "getCoursesByCategorId";
        return this.apiService.get('api/home/getCoursesByCategorId/' + id, new HttpParams(), this.errorLog);
    }

    getCoursesById(id: number): Observable<CourseIndex> {
        this.errorLog.methodName = "getCoursesById";
        return this.apiService.get('api/home/getCourses/' + id, new HttpParams(), this.errorLog);
    }
}