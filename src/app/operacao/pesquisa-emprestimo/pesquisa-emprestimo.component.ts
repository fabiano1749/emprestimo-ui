import { EmprestimoService } from './../emprestimo.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-pesquisa-emprestimo',
  templateUrl: './pesquisa-emprestimo.component.html',
  styleUrls: ['./pesquisa-emprestimo.component.css']
})
export class PesquisaEmprestimoComponent implements OnInit {

  emprestimos = new Array<Emprestimo>();
  filtro = new Filtro();
  status = [];
  inicio: any;
  fim: any;
  sta: any;
  total: number;
  exibirDialogoStatusNaoAberto = false;


  constructor(private emprestimoService: EmprestimoService) { }

  ngOnInit() {
    this.carregarStatus();

  }

  dataFormatada(data: any): string {
    if (data) {
      const result = moment(data);
      return result.format('YYYY-MM-DD');
    }
    return null;
  }

  dadosFormatados() {
    this.filtro.inicio = this.dataFormatada(this.inicio);
    this.filtro.fim = this.dataFormatada(this.fim);
    this.filtro.status = this.sta;
  }

  pesquisar() {
    this.dadosFormatados();
    return this.emprestimoService.pesquisar(this.filtro)
      .then(emprestimos => {
        this.emprestimos = emprestimos;
        this.calculatotal();
      });
  }

  calculatotal() {
    if (this.emprestimos.length > 0) {
      this.total = 0;
      for ( let e of this.emprestimos) {
          this.total = this.total + e.valor;
      }
    } else {
      this.total = 0;
    }
  }
  carregarStatus() {
    return this.emprestimoService.statusUsados()
    .then(status => {
        this.status = status.map(s => {
          return {label: s.nome , value: s.id};
        });
    });
  }

  excluir(id: number, status: string) {
    if (status === 'Aberto') {
      this.emprestimoService.excluir(id)
      .then(() => {
        this.pesquisar();
      });
    } else {
      this.exibirDialogoStatusNaoAberto = true;
    }
  }

  fechaDialogoStatusNaoAberto() {
    this.exibirDialogoStatusNaoAberto = false;
  }

}

export class Emprestimo {
  id: number;
  dataOperacao: any;
  valor: number;
  usuario: string;
  status: string;
  cliente: string;
}

export class Status {
  id: number;
  nome: string;
}

export class Filtro {
  cliente: string;
  inicio: string;
  fim: string;
  status: number;
}
