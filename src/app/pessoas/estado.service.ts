import { environment } from 'src/environments/environment';
import { Estado } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  //  estadoUrl = 'http://localhost:8080/estados';

   estadoUrl: string;

  constructor(private http: HttpClient) {
    this.estadoUrl = `${environment.apiUrl}/estados`;
   }

  consultar(): Promise<any> {
      return this.http.get(this.estadoUrl)
      .toPromise()
      .then(response => response);
  }

  adicionar(estado: any): Promise<any> {
    return this.http.post(this.estadoUrl, estado)
      .toPromise()
      .then(response => response);
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.estadoUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  editar(estado: Estado): Promise<Estado> {
    return this.http.put(`${this.estadoUrl}/${estado.id}`, estado)
      .toPromise()
      .then(e => estado);
  }

}
