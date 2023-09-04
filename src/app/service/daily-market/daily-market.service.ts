import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DailyMarketService {
  private baseUrl = 'http://localhost:8080';
  private requestOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getToken(),
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchDailyMarket() {
    return this.http.get<any>(
      this.baseUrl + '/getDailyMarket',
      this.requestOptions
    );
  }
}
