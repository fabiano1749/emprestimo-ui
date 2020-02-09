import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  // contaUrl = 'http://localhost:8080/contas';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/contas`;
  }

  consultar(): Promise<any> {
    return this.http.get(this.url)
    .toPromise()
    .then(response => response);
}

adicionar(conta: any): Promise<any> {
  return this.http.post(this.url, conta)
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

extrato(filtro: any): Promise<any> {
  const url = 'http://localhost:8080/extrato' + '/extrato';
  let params = new HttpParams();
  params = params.append('idConta', filtro.idConta);

  if (filtro.inicio) {
    params = params.append('inicio', filtro.inicio);
  }

  if (filtro.fim) {
    params = params.append('fim', filtro.fim);
  }

  return this.http.get(`${url}?`, {params})
  .toPromise()
  .then(response => console.log(JSON.stringify(response)));
}

}
