import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrlCashier = 'http://localhost:8080/cashier';
  private baseUrlManager = 'http://localhost:8080/manager';
  private baseUrlCashierManager = 'http://localhost:8080/cashierManager';

  constructor(private http: HttpClient, private authService: AuthService) {}

  searchProducts(query: string): Observable<any[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    };
    const url = `${this.baseUrlCashierManager}/getProducts?searchString=${query}`;
    return this.http.get<any[]>(url, requestOptions);
  }

  updateProductPrice(updatedProduct: any) {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    };
    return this.http.put(
      this.baseUrlManager + '/updatePrice',
      updatedProduct,
      requestOptions
    );
  }

  retreivePriceStats(productId: number) {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    };
    return this.http.get<any>(
      this.baseUrlManager + `/priceStats?id=${productId}`,
      requestOptions
    );
  }
}
