import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CustomHttpUrlEncodingCodec, UserVO } from '../models/models';
import { ApiService } from './api.service';
import { JwtService } from './auth/jwt.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<UserVO>({} as UserVO);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/auth/me')
        .subscribe(
          data => {this.setAuth(data);
        },
          err => {
            this.purgeAuth();
          }
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: UserVO) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.accessToken);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as UserVO);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credentials): Observable<UserVO> {
    return this.apiService.post('/auth/login', credentials)
      .pipe(map(
        data => {
          this.setAuth(data);
          return data;
        }
      ));
  }

  signUp(credentials, code?: string): Observable<UserVO> {
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (code !== undefined && code !== null) {
        queryParameters = queryParameters.set('code', <any>code);
    }
    
    return this.apiService.post('/auth/signup', credentials,queryParameters)
      .pipe(map(
        data => {
          this.setAuth(data);
          return data;
        }
      ));
  }


  initTwitter(path:string): Observable<any> {
    return this.apiService.get(path)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  initLinkedIn(path:string): Observable<any> {
    return this.apiService.get(path)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }


  verifyLinkedIn(path:string,oauth_token: string): Observable<any> {
    return this.apiService.post(path, {
      requestToken: oauth_token,
      oauthVerifier: ''
    })
      .pipe(map(
        data => {
          this.setAuth(data);
          return data;
        }
      ));
  }

  verifyTwitter(path:string,oauth_token: string, oauth_verifier: string): Observable<any> {
    return this.apiService.post(path, {
      requestToken: oauth_token,
      oauthVerifier: oauth_verifier
    })
      .pipe(map(
        data => {
          this.setAuth(data);
          console.log(data);
          return data;
        }
      ));
  }

  getCurrentUser(): UserVO {
    return this.currentUserSubject.value;
  }

  logout() {
    this.purgeAuth();
    this.router.navigate(['/auth']);
  }


}
