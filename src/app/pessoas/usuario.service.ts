import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // usuarioUrl = 'http://localhost:8080/usuarios';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/usuarios`;
  }

  consultar(): Promise<any> {
    return this.http.get(this.url)
    .toPromise()
    .then(response => response);
  }

  adicionar(usuario: any): Promise<any> {
    return this.http.post(this.url, usuario)
      .toPromise()
      .then(response => response);
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.url}/${id}`)
      .toPromise()
      .then(() => null);
  }

  statusUsados(): Promise<any> {
    return this.http.get(this.url + '/status')
    .toPromise()
    .then(response => response);
  }

  alterarSenha(senha): Promise<any> {
    return this.http.get(this.url + '/alteraSenha/' + senha)
      .toPromise()
      .then(response => response);
  }


}
