import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ParcelaService {

  // url = 'http://localhost:8080/parcelas';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/parcelas`;
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

  receber(filtro: any): Promise<any> {
    const url = this.url + '/recebe';
    let params = new HttpParams();
    params = params.append('id', filtro.id);
    params = params.append('idConta', filtro.idConta);
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

    return this.http.get(`${url}?`, { params })
    .toPromise()
    .then(response => {
      return response;
    });
  }

  renegocia(renegocia: any): Promise<any> {
    const url = this.url + '/renegocia';
    let params = new HttpParams();
    params = params.append('idParcela', renegocia.idParcela);
    params = params.append('jurosRecebido', renegocia.jurosRecebido);
    params = params.append('novoValorParcela', renegocia.novoValorParcela);
    params = params.append('proximoVencimento', renegocia.proximoVencimento);
    params = params.append('observacao', renegocia.observacao);
    params = params.append('idConta', renegocia.idConta);

    return this.http.get(`${url}?`, { params })
    .toPromise()
    .then(() => null);
  }




  statusUsados(): Promise<any> {
    return this.http.get(this.url + '/status')
    .toPromise()
    .then(response => response);
  }

  relatorio(filtro: any): Promise<any> {
    const url = this.url + '/relatorioParcela';
    let params = new HttpParams();
    if (filtro.idConta) {
      params = params.append('idConta', filtro.idConta);
    }
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

    return this.http.get(`${url}?`, {params, responseType: 'blob'})
    .toPromise()
    .then(response => response);
  }


}
