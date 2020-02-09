import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  // contaUrl = 'http://localhost:8080/extrato';
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/extrato`;
  }

extrato(filtro: any): Promise<any> {
  const url =  this.url + '/extrato';
  let params = new HttpParams();
  if (filtro.idConta) {
    params = params.append('idConta', filtro.idConta);
  }

  if (filtro.inicio) {
    params = params.append('inicio', filtro.inicio);
  }

  if (filtro.fim) {
    params = params.append('fim', filtro.fim);
  }

  return this.http.get(`${url}?`, {params})
  .toPromise()
  .then(response => {
    return response;
  });
}

}

