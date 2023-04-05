import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { LoginService } from '../api/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.modifyRequest(req)).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.handleUnauthorizedError(req, next);
                } else {
                    return throwError(() => error);
                }
            })
        );
    }

    public modifyRequest(req: HttpRequest<any>) {
        const userToken = Cookie.get('access_token');
        return req.clone({
            headers: req.headers.set('Authorization', `Bearer ${userToken}`),
        });
    }


    public handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return this.loginService.refreshToken().pipe(
            switchMap(() => {
                return next.handle(this.modifyRequest(request));
            }),
            catchError((error) => {
                if (error.status == '403') {
                    this.router.navigate(['/']).then(() => {
                        window.location.reload();
                    });
                }
                return throwError(() => error);
            })
        );
    }

}
