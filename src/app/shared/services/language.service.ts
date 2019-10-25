import { Injectable } from "@angular/core";
import { ErrorModel, Language, KeyValue } from "../models";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";

@Injectable()
export class LanguageService {
    private errorLog = new ErrorModel();
    constructor(private apiService: ApiService) {
        this.errorLog.serviceName = "LanguageService";
    }
    create(item: Language): Observable<Language> {
        this.errorLog.methodName = "create";
        return this.apiService.post('api/language', item, this.errorLog).pipe(
            map(data => {
                return data;
            })
        );
    }

    Update(item: Language): Observable<boolean> {
        this.errorLog.methodName = "Update";
        return this.apiService.put('api/language/' + item.languageId, item, this.errorLog).pipe
            (map(data => {
                return data;
            }));
    }
    getAll(): Observable<Array<Language>> {
        this.errorLog.methodName = "getAll";
        return this.apiService.get('api/language', new HttpParams(), this.errorLog);
    }

    getkeyValuePair(): Observable<Array<KeyValue>> {
        this.errorLog.methodName = "getKeyValue";
        return this.apiService.get('api/language/getKeyValue', new HttpParams(), this.errorLog);
    }

    getById(id: number): Observable<Language> {
        this.errorLog.methodName = "getById";
        return this.apiService.get('api/language/' + id, new HttpParams(), this.errorLog);
    }
}