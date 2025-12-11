import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veículos } from '../interface/veículos';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {
  private apiUrl = 'http://localhost:3333/veiculos';

  constructor(private http: HttpClient) { }

  listarVeiculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  cadastrarVeiculo(veiculo: Veículos): Observable<any> {
    return this.http.post<any>(this.apiUrl, veiculo);
  }

  editarVeiculo(id: number, veiculo: Veículos): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, veiculo);
  }

  excluirVeiculo(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
