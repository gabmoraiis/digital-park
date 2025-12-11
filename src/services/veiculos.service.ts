import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veículos } from '../interface/veículos';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {
  private apiUrl = 'http://localhost:3333/veiculos';
  storage: Storage;
  token: string = '';
  httpOptions: any = {};

  constructor(private http: HttpClient) {
    this.storage = window.sessionStorage;
    this.token = this.storage.getItem('token')!;
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token,
      }),
    }
  }

  listarVeiculos(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl, this.httpOptions);
  }

  cadastrarVeiculo(veiculo: Veículos): Observable<any> {
    return this.http.post<any>(this.apiUrl, veiculo, this.httpOptions);
  }

  editarVeiculo(id: number, veiculo: Veículos): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, veiculo, this.httpOptions);
  }

  excluirVeiculo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }
}
