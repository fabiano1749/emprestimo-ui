import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  // url = 'http://localhost:8080/emprestimos';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/emprestimos`;
  }

  consultar(): Promise<any> {
    return this.http.get(this.url)
    .toPromise()
    .then(response => response);
}

adicionar(emprestimo: any): Promise<any> {
  return this.http.post(this.url, emprestimo)
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

pesquisar(filtro: any): Promise<any> {
  let params = new HttpParams();
  if (filtro.cliente) {
    params = params.append('cliente', filtro.cliente);
  }
  if (filtro.inicio) {
    params = params.append('inicio', filtro.inicio);
  }

  if (filtro.fim) {
    params = params.append('fim', filtro.fim);
  }
  if (filtro.status) {
    params = params.append('idStatus', filtro.status);
  }

  const url = this.url + '/pesquisa';

  return this.http.get(`${url}?resumo`, { params })
  .toPromise()
  .then(response => {
    return response;
  });
}

buscarPorCodigo(id: number): Promise<any> {
  return this.http.get(`${this.url}/${id}`)
  .toPromise()
  .then(response => response);
}

recebeParcela(filtro: any): Promise<any> {
  const url = this.url + '/recebeParcela';
  let params = new HttpParams();
  params = params.append('id', filtro.id);

  return this.http.get(`${url}?`, { params })
  .toPromise()
  .then(response => {
    return response;
  });
}

renegociaParcela(renegocia: any): Promise<any> {
  const url = this.url + '/renegociaParcela';
  let params = new HttpParams();
  params = params.append('idParcela', renegocia.idParcela);
  params = params.append('jurosRecebido', renegocia.jurosRecebido);
  params = params.append('novoValorParcela', renegocia.novoValorParcela);
  params = params.append('proximoVencimento', renegocia.proximoVencimento);
  params = params.append('observacao', renegocia.observacao);
  params = params.append('idConta', renegocia.idConta);

  return this.http.get(`${url}?`, { params })
  .toPromise()
  .then(response => {
    return response;
  });
}
}
