import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { JwtService } from "./jwt.service";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService, HandleError } from "./errorHandler.service";
import { ErrorModel } from '../models'

@Injectable()
export class ApiService {
    private handleError: HandleError;
    constructor(private http: HttpClient,
        private jwtService: JwtService,
        private errorHandlerService: ErrorHandlerService) {
    }

    private setHttpHeaders(): HttpHeaders {
        const httpOptions = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        // if (this.jwtService.getToken()) {
        //     httpOptions['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
        // }
        return new HttpHeaders(httpOptions);
    }

    post<Object>(path: string, body: Object, errorLog: ErrorModel): Observable<any> {
        this.handleError = this.errorHandlerService.createHandleError(errorLog.serviceName);
        return this.http.post<Object>(`${environment.api_url}${path}`,
            body,
            //headers is only one parameter of the options
            { headers: this.setHttpHeaders() })
            .pipe(
                catchError(this.handleError(errorLog.methodName, body))
            );
    }

    get<Object>(path?: string, param?: HttpParams, errorLog?: ErrorModel): Observable<any> {
        this.handleError = this.errorHandlerService.createHandleError(errorLog.serviceName);
        return this.http.get(`${environment.api_url}${path}`,
            { headers: this.setHttpHeaders(), params: param })
            .pipe(
                catchError(this.handleError(errorLog.methodName, param))
            );
    }

    put<Object>(path: string, body: Object, errorLog: ErrorModel): Observable<any> {
        this.handleError = this.errorHandlerService.createHandleError(errorLog.serviceName);
        return this.http.put(`${environment.api_url}${path}`, body,
            { headers: this.setHttpHeaders() })
            .pipe(
                catchError(this.handleError(errorLog.methodName, body))
            );
    }

    delete<Object>(path: string, params: HttpParams, errorLog: ErrorModel): Observable<any> {
        this.handleError = this.errorHandlerService.createHandleError(errorLog.serviceName);
        return this.http.delete(`${environment.api_url}${path}`,
            { headers: this.setHttpHeaders(), params: params })
            .pipe(
                catchError(this.handleError(errorLog.methodName, params))
            );
    }

    filePost(path: string, files: FormData) {
        return this.getXMLHttpRequest('post', `${environment.api_url}${path}`, true, files)
    }

    getXMLHttpRequest(method, url, async, formData) {
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open(method, url, async);
        xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + this.jwtService.getToken());
        xmlHttpRequest.send(formData);
        return xmlHttpRequest;
    }

    fileDatapost<Object>(path: string, body: Object, errorLog: ErrorModel): Observable<any> {
        this.handleError = this.errorHandlerService.createHandleError(errorLog.serviceName);
        return this.http.post<Object>(`${environment.api_url}${path}`,
            body).pipe(
                catchError(this.handleError(errorLog.methodName, body))
            );
    }

    fileDataPut<Object>(path: string, body: Object, errorLog: ErrorModel): Observable<any> {
        this.handleError = this.errorHandlerService.createHandleError(errorLog.serviceName);
        return this.http.put(`${environment.api_url}${path}`,body).pipe(
                catchError(this.handleError(errorLog.methodName, body))
            );
    }
}