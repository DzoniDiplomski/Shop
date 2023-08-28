import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  private baseUrl = 'http://localhost:8080/cashier';
  private requestOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getToken(),
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  createReceipt(receipt: any): Observable<any> {
    const url = `${this.baseUrl}/addReceipt`;

    return this.http.post(url, receipt, this.requestOptions).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
