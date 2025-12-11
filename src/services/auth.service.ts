import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3333/auth';
  private router = inject(Router);
  constructor(private http: HttpClient) { }

  loginPost(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }

  newRegisterPost(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cadastro`, body);
  }

  logout() {
    this.router.navigate(['']);
    sessionStorage.clear();
    localStorage.clear();
  }
}
