import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  // url = 'http://localhost:8080/entradas';
  url: string;


  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/entradas`;
  }

  consultar(): Promise<any> {
    return this.http.get(this.url)
    .toPromise()
    .then(response => response);
}

adicionar(entrada: any): Promise<any> {
  return this.http.post(this.url, entrada)
    .toPromise()
    .then(response => response);
}

excluir(id: number): Promise<void> {
  return this.http.delete(`${this.url}/${id}`)
    .toPromise()
    .then(() => null);
}

}
