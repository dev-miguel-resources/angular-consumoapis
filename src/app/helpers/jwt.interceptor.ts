import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    // Interceptar y manejar una solicitud http dada
    constructor(
        private router: Router) {}

    // function intercept
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTQ4ODgzZTAxYWE5NjNjZThkOGE2ZDkwMDVkYjE1MSIsInN1YiI6IjVkNWQ0ZjQ4YTNkMDI3MDAxNDBiZDkzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w4iJG7DNBvihwHWQI4wiCPmuE-7vao2FBV9hnNRtFxg';
        req = req.clone({
            setHeaders: {
                Authorization: `${token}`
            }
        });

        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //console.log(event);
                }
            }, (err: any) => {
                if(err instanceof HttpErrorResponse) {
                    if(err.status === 401) {
                        this.router.navigate(['/auth']);
                    }
                }
            })
        );
    }
}