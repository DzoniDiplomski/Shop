import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  private baseUrl = 'http://localhost:8080/manager';
  private requestOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getToken(),
      'Content-Type': 'application/json',
    }),
  };
  constructor(private authService: AuthService, private http: HttpClient) {}

  createCalculation(calculation: any) {
    return this.http.post(
      this.baseUrl + '/createCalculation',
      calculation,
      this.requestOptions
    );
  }
}
