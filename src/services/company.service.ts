import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:3333/empresas';

  constructor(private http: HttpClient) { }

  listarEmpresas(id?: string | number): Observable<any[]> {
    if (id) {
      return this.http.get<any[]>(`${this.apiUrl}/${id}`);
    } else {
      return this.http.get<any[]>(this.apiUrl);
    }
  }

  cadastrarEmpresa(empresa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, empresa);
  }

  editarEmpresa(id: string, disciplina: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, disciplina);
  }

  excluirEmpresa(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
