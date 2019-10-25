import { Injectable } from "@angular/core";
import { ErrorModel, Category, KeyValue } from "../models";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";

@Injectable()
export class CategoryService {
    private errorLog = new ErrorModel();
    constructor(private apiService: ApiService) {
        this.errorLog.serviceName = "CategoryService";
    }
    create(item: Category): Observable<Category> {
        this.errorLog.methodName = "create";
        return this.apiService.post('api/category', item, this.errorLog).pipe(
            map(data => {
                return data;
            })
        );
    }

    Update(item: Category): Observable<boolean> {
        this.errorLog.methodName = "Update";
        return this.apiService.put('api/category/' + item.categoryId, item, this.errorLog).pipe
            (map(data => {
                return data;
            }));
    }
    getAll(): Observable<Array<Category>> {
        this.errorLog.methodName = "getAll";
        return this.apiService.get('api/category', new HttpParams(), this.errorLog);
    }

    getkeyValuePair(): Observable<Array<KeyValue>> {
        this.errorLog.methodName = "getKeyValue";
        return this.apiService.get('api/category/getKeyValue', new HttpParams(), this.errorLog);
    }

    getById(id: number): Observable<Category> {
        this.errorLog.methodName = "getById";
        return this.apiService.get('api/category/' + id, new HttpParams(), this.errorLog);
    }
}