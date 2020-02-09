import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // clienteUrl = 'http://localhost:8080/clientes';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/clientes`;
  }

  consultar(): Promise<any> {
    return this.http.get(this.url + '/pesquisaOrdenada')
    .toPromise()
    .then(response => response);
  }

  buscarClientePorCodigo(id: number): Promise<any> {
    return this.http.get(`${this.url}/${id}`)
    .toPromise()
    .then(response => response);
  }

adicionar(cliente: any): Promise<any> {
  return this.http.post(this.url, cliente)
    .toPromise()
    .then(response => response);
}

statusUsados(): Promise<any> {
  return this.http.get(this.url + '/status')
  .toPromise()
  .then(response => response);
}

pesquisar(filtro: any): Promise<any> {
  let params = new HttpParams();
  if (filtro.nome) {
    params = params.append('nome', filtro.nome);
  }
  if (filtro.status) {
    params = params.append('status', filtro.status);
  }

  if (filtro.estado) {
    params = params.append('estado', filtro.estado);
  }

  if (filtro.cidade) {
    params = params.append('cidade', filtro.cidade);
  }

  if (filtro.usuario) {
    params = params.append('usuario', filtro.usuario);
  }

  const url = this.url + '/pesquisa';

  return this.http.get(`${url}?resumo`, { params })
  .toPromise()
  .then(response => {
    return response;
  });
}

enderecos(id): Promise<any> {
  return this.http.get(this.url + '/enderecosCliente/' + id)
    .toPromise()
    .then(response => response);
}

dadosCliente(id): Promise<any> {
  return this.http.get(this.url + '/dadosCliente/' + id)
    .toPromise()
    .then(response => response);
}

}
