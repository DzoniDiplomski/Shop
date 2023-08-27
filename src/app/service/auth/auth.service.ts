import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private backendApi = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.backendApi + '/login', { username, password })
      .pipe(
        tap((response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.isLoggedInSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  checkAuthentication(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }
}
