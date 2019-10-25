import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { catchError, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { User, ErrorModel } from "../models";
import { JwtService } from "./jwt.service";
import { ApiService } from "./api.service";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";


@Injectable()
export class AuthService {

    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    private errorLog = new ErrorModel();

    constructor(private jwtService: JwtService,
        private apiService: ApiService, private router: Router) {
    }

    populate() {
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
            this.apiService.get('api/user/current', new HttpParams(), this.errorLog).subscribe(
                data => {
                    data.token = this.jwtService.getToken();
                    this.setAuth(data);
                    return data;
                },
                err => {
                    this.purgeAuth();
                    this.router.navigate(['**']);
                }
            );
        } else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }

    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next(new User());
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    }
    setAuth(user: User) {
        if (user.token == null) {
            this.purgeAuth()
        } else {
            // Save JWT sent from server in localstorage
            this.jwtService.saveToken(user.token);
            // Set current user data into observable
            this.currentUserSubject.next(user);
            // Set isAuthenticated to true
            this.isAuthenticatedSubject.next(true);
        }
    }

    auth(type, source): Observable<User> {
        this.errorLog.methodName = 'auth'
        const route = (type === 'login') ? 'api/account/login' : 'api/account/register';
        return this.apiService.post(route, source, this.errorLog)
            .pipe(map(data => {
                if (type === 'login') {
                    this.setAuth(data);
                    return data;
                } else {
                    return data;
                }
            }));
    }
}