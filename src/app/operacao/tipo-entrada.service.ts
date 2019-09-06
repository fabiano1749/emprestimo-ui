import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoEntradaService {

  // url = 'http://localhost:8080/tiposEntradas';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/tiposEntradas`;
  }

  consultar(): Promise<any> {
      return this.http.get(this.url)
      .toPromise()
      .then(response => response);
  }

  adicionar(tipo: any): Promise<any> {
    return this.http.post(this.url, tipo)
      .toPromise()
      .then(response => response);
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.url}/${id}`)
      .toPromise()
      .then(() => null);
  }


}
