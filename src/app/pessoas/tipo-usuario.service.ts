import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/tipoUsuarios`;
  }

  consultar(): Promise<any> {
    return this.http.get(this.url)
    .toPromise()
    .then(response => response);
  }

  adicionar(tipoUsuario: any): Promise<any> {
    return this.http.post(this.url, tipoUsuario)
      .toPromise()
      .then(response => response);
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.url}/${id}`)
      .toPromise()
      .then(() => null);
  }

}
