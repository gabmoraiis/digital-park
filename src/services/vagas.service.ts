import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private apiUrl = 'http://localhost:3333';
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

  listarVagas(id: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/vagas`, this.httpOptions);
  }

  desocuparVaga(id_empresa: string, id_vaga: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id_empresa}/vagas/${id_vaga}/desocupar`, null, this.httpOptions);
  }

  ocuparVaga(id_empresa: string, id_vaga: string, placa: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id_empresa}/vagas/${id_vaga}/ocupar`, placa, this.httpOptions);
  }
}
