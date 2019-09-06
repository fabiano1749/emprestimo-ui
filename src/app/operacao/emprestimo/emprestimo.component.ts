import { ClienteService } from './../../pessoas/cliente.service';
import { Component, OnInit } from '@angular/core';
import { EmprestimoService } from '../emprestimo.service';
import { ContaService } from '../conta.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.css']
})
export class EmprestimoComponent implements OnInit {

  emprestimo: Emprestimo;
  parcela: Parcela;
  status = [];
  contas = [];
  clientes = [];
  filtro = new FiltroParcela();
  exibirFormRenegociar = false;
  exibirFormConfirmacao = false;
  mensagemConfirmacao = '';
  parcelaAux: Parcela;
  renegociar = new RenegociarParcela();

  constructor(private emprestimoService: EmprestimoService,
              private contaService: ContaService,
              private clienteService: ClienteService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.carregarStatus();
    this.carregarContas();
    this.carregarCliente();
    this.inicio(this.route.snapshot.params['codigo']);
  }

  inicio(id: number) {
    this.emprestimo = new Emprestimo();
    this.parcela = new Parcela();
    if (id && id !== 0) {
       this.carregarEmprestimo(id);
    }
  }

  carregarEmprestimo(id) {
    this.emprestimoService.buscarPorCodigo(id)
    .then(emprestimo => {
      this.emprestimo =  this.setaDadosEmprestimo(emprestimo);
    });
  }

  setaDadosEmprestimo(emprestimo): Emprestimo {
    const data = moment(emprestimo.dataOperacao, 'YYYY-MM-DD').toDate();
    const emp2 = new Emprestimo();
    emp2.id = emprestimo.id;
    emp2.dataOperacao = data;
    emp2.valor = emprestimo.valor;
    emp2.observacao = emprestimo.observacao;
    emp2.usuario.id = emprestimo.usuario.id;
    emp2.conta.id = emprestimo.conta.id;
    emp2.status.id = emprestimo.status.id;
    emp2.status.nome = emprestimo.status.nome;
    emp2.jurosValor = emprestimo.jurosValor;
    emp2.jurosPercentual = emprestimo.jurosPercentual;
    emp2.quantParcelas = emprestimo.quantParcelas;
    emp2.intervaloEntreParcelas = emprestimo.intervaloEntreParcelas;
    emp2.cliente.id = emprestimo.cliente.id;
    emp2.parcelas = emprestimo.parcelas;
    return emp2;
  }

  exibirParcelas() {
    if (this.emprestimo.valor != null && this.emprestimo.jurosValor != null &&
      this.emprestimo.quantParcelas != null && this.emprestimo.intervaloEntreParcelas != null) {
        this.gerarParcelas();
      }
  }

  calcularJurosPercentual() {
    this.emprestimo.jurosPercentual = (this.emprestimo.jurosValor / this.emprestimo.valor) * 100;
    this.exibirParcelas();
  }

  calcularJurosValor() {
    this.emprestimo.jurosValor = (this.emprestimo.jurosPercentual * this.emprestimo.valor) / 100 ;
    this.exibirParcelas();
  }

  atualizarJuros() {
    if (this.emprestimo.jurosPercentual != null) {
      this.calcularJurosValor();
      this.exibirParcelas();
    } else {
      this.emprestimo.jurosValor = this.emprestimo.jurosPercentual = 0;
      this.emprestimo.parcelas = new Array<Parcela>();
    }
  }

  ajustaDados() {
    const data = moment(this.emprestimo.dataOperacao);
    this.emprestimo.dataOperacao = data.format('YYYY-MM-DD');
  }

  adicionar() {
    this.ajustaDados();
    this.gerarParcelas();
    this.emprestimoService.adicionar(this.emprestimo)
      .then(emprestimo => {
        this.inicio(emprestimo.id);
      });
    }

  carregarStatus() {
    return this.emprestimoService.statusUsados()
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

  carregarCliente() {
    this.clienteService.consultar()
      .then(clientes => {
      this.clientes = clientes.map(c => {
        return {label: c.nome, value: c.id};
      });
    });
  }

  gerarParcelas() {

    if (this.emprestimo.id == null || this.emprestimo.status.id === 1) {
      this.emprestimo.parcelas = new Array<Parcela>();
      const quantP = this.emprestimo.quantParcelas;
      const diasEP = this.emprestimo.intervaloEntreParcelas;
      const valor = this.emprestimo.valor;
      const jurosValor = this.emprestimo.jurosValor;
      const valorParcela = (valor + jurosValor) / quantP;
      const data = moment(this.emprestimo.dataOperacao);

      for (let i = 1; i <= quantP; i++) {
        const p = new Parcela();
        p.numero = i;
        p.valorPrevisto = valorParcela;
        p.status.id = 1;
        p.vencimento = moment(data.add(diasEP, 'day')).format('YYYY-MM-DD');
        this.emprestimo.parcelas.push(p);
      }
    }
  }

  empretimoAberto() {
    return this.emprestimo.status.id !== 3 && this.emprestimo.status.id !== 7;
  }

  confirmaRecebeParcela(resposta) {
    if (resposta === 'Sim') {
      this.recebeParcela();
    }
    this.parcelaAux = new Parcela();
    this.exibirFormConfirmacao = false;
  }

  recebeParcela() {
      this.filtro.id = this.parcelaAux.id;
      return this.emprestimoService.recebeParcela(this.filtro)
      .then(emprestimo => {
        this.emprestimo = this.setaDadosEmprestimo(emprestimo);
      });
  }

  setaValoresRenegociar(parcela: Parcela) {
    const ultimaParcela = this.emprestimo.parcelas[this.emprestimo.parcelas.length - 1];
    const data = moment(ultimaParcela.vencimento);
    this.renegociar.proximoVencimento = moment(data.add(this.emprestimo.intervaloEntreParcelas, 'day')).toDate();
    this.renegociar.jurosRecebido = this.emprestimo.jurosValor / this.emprestimo.quantParcelas;
    this.renegociar.novoValorParcela = parcela.valorPrevisto;
  }

  criaRenegociarParcela(parcela: Parcela) {
    this.renegociar = new RenegociarParcela();
    this.renegociar.idParcela = parcela.id;
    this.setaValoresRenegociar(parcela);
    this.exibirFormRenegociar = true;
  }

  renegociarP() {
    const data = moment(this.renegociar.proximoVencimento);
    const renegociar = {...this.renegociar};
    renegociar.proximoVencimento = data.format('YYYY-MM-DD');
    this.exibirFormRenegociar = false;
    return this.emprestimoService.renegociaParcela(renegociar)
    .then(emprestimo => {
      this.emprestimo = this.setaDadosEmprestimo(emprestimo);
    });
  }

  confirmaRecebe(parcela: Parcela) {
    this.parcelaAux = parcela;
    if (parcela.status.id === 1) {
      this.mensagemConfirmacao = 'Confirma o recebimento dessa parcela ?';
    } else if (parcela.status.id === 3) {
      this.mensagemConfirmacao = 'Confirma a reabertura dessa parcela ?';
    } else if (parcela.status.id === 8) {
      this.mensagemConfirmacao = 'Essa ação cancelará essa parcela. Deseja continuar ?';
    }
    this.exibirFormConfirmacao = true;
  }
}

export class Emprestimo {
  id: number;
  dataOperacao: any;
  valor: number;
  observacao: string;
  usuario = new Usuario();
  conta = new Conta();
  status =  new Status();
  jurosValor: number;
  jurosPercentual: number;
  quantParcelas: number;
  intervaloEntreParcelas: number;
  cliente = new Cliente();
  parcelas = new Array<Parcela>();
}

export class Usuario {
  id: number;
}

export class Cliente {
  id: number;
}

export class Status {
  id: number;
  nome: string;
}

export class Conta {
  id: number;
  nome: string;
}

export class Parcela {
  id: number;
  valorPrevisto: number;
  valorRecebido: number;
  numero: number;
  vencimento: any;
  recebimento: any;
  conta = new Conta();
  parent: number;
  status = new Status();
  observacao: string;
}

export class FiltroParcela {
  cliente: string;
  inicio: string;
  fim: string;
  status: number;
  id: number;
}

export class RenegociarParcela {
  idParcela: number;
  jurosRecebido: number;
  novoValorParcela: number;
  proximoVencimento: any;
  observacao: string;
  idConta: number;
}

