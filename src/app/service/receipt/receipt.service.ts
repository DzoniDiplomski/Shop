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

  calculateTotalPages(getInvoices: boolean, itemsPerPage: string) {
    var apiPath = `/calculatePages?items=${itemsPerPage}`;
    if (getInvoices) {
      apiPath = `/calculateInvoicePages?items=${itemsPerPage}`;
    }
    return this.http.get<any>(`${this.baseUrl}${apiPath}`, this.requestOptions);
  }

  loadReceipts(
    getInvoices: boolean,
    currentPage: string,
    itemsPerPage: string
  ) {
    var apiPath = `/getAllReceipts?page=${currentPage}&limit=${itemsPerPage}`;
    if (getInvoices) {
      apiPath = '/getAllInvoices';
    }
    return this.http.get<any>(`${this.baseUrl}${apiPath}`, this.requestOptions);
  }

  loadReceiptItems(receiptId: string, getItemsForInvocie: boolean) {
    var apiPath = `/getReceiptItems?id=${receiptId}`;
    if (getItemsForInvocie) {
      apiPath = `/getInvoiceItems?id=${receiptId}`;
    }
    return this.http.get<any>(`${this.baseUrl}${apiPath}`, this.requestOptions);
  }
}
