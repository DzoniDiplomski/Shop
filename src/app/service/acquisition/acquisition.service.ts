import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AcquisitionService {
  private baseUrl = 'http://localhost:8080/manager';
  private requestOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getToken(),
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private authService: AuthService) {}

  calculateTotalPages(itemsPerPage: string) {
    var apiPath = `/calculateAcquisitionPages?items=${itemsPerPage}`;
    return this.http.get<any>(`${this.baseUrl}${apiPath}`, this.requestOptions);
  }

  loadAcquisitions(currentPage: string, itemsPerPage: string) {
    return this.http.get<any>(
      `${this.baseUrl}/getAcquisitions?page=${currentPage}&limit=${itemsPerPage}`,
      this.requestOptions
    );
  }

  loadAcquisition(filename: string) {
    return this.http.get<any>(
      `${this.baseUrl}/openAcquisition?filename=${filename}`,
      this.requestOptions
    );
  }
}
