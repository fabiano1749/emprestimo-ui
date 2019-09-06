import { environment } from 'src/environments/environment';
import { Cidade } from './../core/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  // cidadeUrl = 'http://localhost:8080/cidades';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/cidades`;
  }

  consultar(): Promise<any> {
    return this.http.get(this.url)
    .toPromise()
    .then(response => response);
}

adicionar(cidade: any): Promise<any> {
  return this.http.post(this.url, cidade)
    .toPromise()
    .then(response => response);
}

excluir(id: number): Promise<void> {
  return this.http.delete(`${this.url}/${id}`)
    .toPromise()
    .then(() => null);
}

}
