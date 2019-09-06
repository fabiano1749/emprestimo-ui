import { ClienteService } from './../../pessoas/cliente.service';
import { ContaService } from './../conta.service';
import { EmprestimoService } from './../emprestimo.service';
import { ParcelaService } from './../parcela.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-parcela',
  templateUrl: './parcela.component.html',
  styleUrls: ['./parcela.component.css']
})
export class ParcelaComponent implements OnInit {

  parcelas = new Array<Parcela>();
  inicio: any;
  fim: any;
  sta: any;
  filtro = new Filtro();
  status = [];
  contas = [];
  total: number;
  exibirFormRenegociar = false;
  exibirFormConfirmacao = false;
  exibirDialogoContaNaoInformada = false;
  exibirFormEnderecos = false;
  mensagemConfirmacao = '';
  parcelaAux: Parcela;
  renegociar = new RenegociarParcela();
  emprestimo: any;
  enderecoContato = new EnderecoContato();


  constructor(private parcelaService: ParcelaService,
              private emprestimoService: EmprestimoService,
              private contaService: ContaService,
              private clienteService: ClienteService) { }

  ngOnInit() {
    this.carregarStatus();
    this.carregarContas();
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
    return this.parcelaService.pesquisar(this.filtro)
      .then(parcelas => {
        this.parcelas = parcelas;
        this.calculatotal();
      });
  }

  calculatotal() {
    if (this.parcelas.length > 0) {
      this.total = 0;
      for ( let p of this.parcelas) {
          this.total = this.total + p.valorPrevisto;
      }
    } else {
      this.total = 0;
    }
  }

  carregarStatus() {
    return this.parcelaService.statusUsados()
    .then(status => {
        this.status = status.map(s => {
          return {label: s.nome , value: s.id};
        });
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

  receber() {
    return this.parcelaService.receber(this.filtro)
    .then(parcelas => {
      this.parcelas = parcelas;
    });
  }

  confirmaRecebeParcela(resposta) {
    if (resposta === 'Sim') {
      this.receber();
    }
    this.parcelaAux = new Parcela();
    this.exibirFormConfirmacao = false;
  }

  confirmaRecebe(parcela) {
    this.filtro.id = parcela.id;
    if (this.filtro.idConta || parcela.idStatus !== 1) {
      if (parcela.idStatus === 1) {
        this.mensagemConfirmacao = 'Confirma o recebimento dessa parcela ?';
      } else if (parcela.idStatus === 3) {
        this.mensagemConfirmacao = 'Confirma a reabertura dessa parcela ?';
      } else if (parcela.idStatus === 8) {
        this.mensagemConfirmacao = 'Essa ação cancelará essa parcela. Deseja continuar ?';
      }
      this.exibirFormConfirmacao = true;
    } else {
      this.exibirDialogoContaNaoInformada = true;
    }
  }

  carregarEmprestimo(id) {
    this.emprestimoService.buscarPorCodigo(id)
    .then(emprestimo => {
      this.setaValoresRenegociar(emprestimo);
    });
  }

  criaRenegociarParcela(parcela) {
    this.carregarEmprestimo(parcela.idEmprestimo);
    this.renegociar = new RenegociarParcela();
    this.renegociar.idParcela = parcela.id;
    this.exibirFormRenegociar = true;
  }

  setaValoresRenegociar(emprestimo) {

    const ultimaParcela = emprestimo.parcelas[emprestimo.parcelas.length - 1];
    const data = moment(ultimaParcela.vencimento);
    this.renegociar.proximoVencimento = moment(data.add(emprestimo.intervaloEntreParcelas, 'day')).toDate();
    this.renegociar.jurosRecebido = emprestimo.jurosValor / emprestimo.quantParcelas;
    this.renegociar.novoValorParcela = ultimaParcela.valorPrevisto;
  }

  renegociarP() {
    const data = moment(this.renegociar.proximoVencimento);
    const renegociar = {...this.renegociar};
    renegociar.proximoVencimento = data.format('YYYY-MM-DD');
    this.exibirFormRenegociar = false;
    return this.parcelaService.renegocia(renegociar)
    .then(() => {
      this.pesquisar();
    });
  }

  fechaDialogoContaNaoInformda() {
    this.exibirDialogoContaNaoInformada = false;
  }

  exibeEndereco(id) {
    return this.clienteService.dadosCliente(id)
    .then(e => {
      this.enderecoContato = e;
      this.exibirFormEnderecos = true;
    });
  }
}

export class Parcela {
  id: number;
  valorPrevisto: number;
  valorRecebido: number;
  numero: number;
  vencimento: Date;
  recebimento: Date;
  parent: number;
  status = new Status();
  observacao: string;
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
  id: number;
  idConta: number;
}

export class RenegociarParcela {
  idParcela: number;
  jurosRecebido: number;
  novoValorParcela: number;
  proximoVencimento: any;
  observacao: string;
  idConta: number;
}

export class EnderecoContato {
  endereco: string;
  contato: string;
}

