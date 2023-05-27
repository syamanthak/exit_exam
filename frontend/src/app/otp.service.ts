import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  sendOtp(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/send-otp`, { email });
  }

  verifyOtp(email: string, otp: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/verify-otp`, { email, otp });
  }
  
}
