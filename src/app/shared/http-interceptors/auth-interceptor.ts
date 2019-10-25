import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { JwtService } from "../services/jwt.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private jwtService: JwtService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.jwtService.getToken();
        const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}