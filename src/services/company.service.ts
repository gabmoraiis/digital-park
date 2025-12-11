import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:3333/empresas';
  storage: Storage;
  token: string = '';
  httpOptions: any = {};

  constructor(private http: HttpClient) {
    this.storage = window.sessionStorage;
    this.token = `Bearer ${this.storage.getItem('token')!}`;
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token,
      }),
    }
  }

  listarEmpresas(id?: string | number): Observable<any> {
    if (id) {
      return this.http.get<any[]>(`${this.apiUrl}/${id}`, this.httpOptions);
    } else {
      return this.http.get<any[]>(this.apiUrl, this.httpOptions);
    }
  }

  cadastrarEmpresa(empresa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, empresa, this.httpOptions);
  }

  editarEmpresa(id: string, disciplina: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, disciplina, this.httpOptions);
  }

  excluirEmpresa(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
