import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headersConfig = {
      // 'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.jwtService.getToken();

    if (token && !req.headers.get("skip")) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    } else {
      // headersConfig = null;
      req.headers.delete("skip");
      req = req.clone({ headers: req.headers.delete('Content-Type', 'application/json') });
      req = req.clone({ headers: req.headers.delete('skip', 'true') });
    }

    const request = req.clone({ setHeaders: headersConfig, withCredentials: false });

    return next.handle(request).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401) {
            this.handleAuthError();
            throw err;
          } else if (err.status == 0) {
            err.error = {
              message: "Server not reachable"
            }
          }
          throw err;
        }
      )
    );
  }
  private handleAuthError() {
    this.jwtService.destroyToken();
    this.router.navigateByUrl('/auth');
  }
}
