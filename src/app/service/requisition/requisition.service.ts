import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RequisitionService {
  private baseUrl = 'http://localhost:8080/manager';
  private requestOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getToken(),
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  createRequisition(requisition: any) {
    return this.http.post(
      this.baseUrl + '/addRequisition',
      requisition,
      this.requestOptions
    );
  }

  calculateTotalPages(itemsPerPage: string) {
    var apiPath = `/calculateRequisitionPages?items=${itemsPerPage}`;
    return this.http.get<any>(`${this.baseUrl}${apiPath}`, this.requestOptions);
  }

  loadRequisitions(currentPage: string, itemsPerPage: string) {
    return this.http.get<any>(
      `${this.baseUrl}/getRequisitions?page=${currentPage}&limit=${itemsPerPage}`,
      this.requestOptions
    );
  }

  loadRequisitionItems(requisitionId: string) {
    var apiPath = `/getRequisitionItems?id=${requisitionId}`;
    return this.http.get<any>(`${this.baseUrl}${apiPath}`, this.requestOptions);
  }
}
