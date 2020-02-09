import { ContaService } from './../conta.service';
import { ExtratoService } from './../extrato.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  contas = [];
  itens = [];
  filtro = new Filtro();
  resumo = new Extrato();

  constructor(private extratoService: ExtratoService, private contaService: ContaService) { }

  ngOnInit() {
    this.carregarContas();
  }

  extrato() {
    const inicio = this.dataFormatada(this.filtro.inicio);
    const fim = this.dataFormatada(this.filtro.fim);
    const idConta = this.filtro.idConta ? this.filtro.idConta : null;
    const filtro = new Filtro();
    filtro.inicio = inicio;
    filtro.fim = fim;
    filtro.idConta = idConta;
    return this.extratoService.extrato(filtro)
    .then(resumo => {
    this.resumo = resumo;
    });
  }

  carregarContas() {
    this.contaService.consultar()
      .then(contas => {
      this.contas = contas.map(c => {
        return {label: c.nome, value: c.id};
      });
    });
  }

  dataFormatada(data: any): string {
    if (data) {
      const result = moment(data);
      return result.format('YYYY-MM-DD');
    }
    return null;
  }

}

export class Filtro {
  inicio: string;
  fim: string;
  idConta: number;
}

export class Extrato {
  itens = [];
  entradas: number;
  saidas: number;
  saldo: number;
}

