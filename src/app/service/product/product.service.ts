import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/cashier';
  private requestOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getToken(),
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  searchProducts(query: string): Observable<any[]> {
    const url = `${this.baseUrl}/getProducts?searchString=${query}`;
    return this.http.get<any[]>(url, this.requestOptions);
  }
}
