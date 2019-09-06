import { AuthService } from 'src/app/seguranca/auth.service';

import { EntradaService } from './../entrada.service';
import { RetiradaService } from './../retirada.service';
import { Component, OnInit} from '@angular/core';
import { TipoEntradaService } from '../tipo-entrada.service';
import { TipoRetiradaService } from '../tipo-retirada.service';
import { ContaService } from '../conta.service';
import * as moment from 'moment';

@Component({
  selector: 'app-entrada-retirada',
  templateUrl: './entrada-retirada.component.html',
  styleUrls: ['./entrada-retirada.component.css']
})
export class EntradaRetiradaComponent implements OnInit {
  selecao = [
    {label: 'Entrada', value: 1 },
    {label: 'Retirada', value: 2}
  ];

  selecionado = 1;
  operacao: Operacao;
  aux: Operacao;
  operacoes = [];
  tipos = [];
  contas = [];



  constructor(private retiradaService: RetiradaService,
              private entradaService: EntradaService,
              private tipoEntradaService: TipoEntradaService,
              private tipoRetiradaService: TipoRetiradaService,
              private contaService: ContaService,
              private auth: AuthService) { }

  ngOnInit() {
    this.carregarContas();
    this.consultar();
    this.inicio();
  }

  inicio() {
    this.operacao = new Operacao();
    this.carregarTipos();
  }

  mudaSelecao() {
    this.ngOnInit();
  }

  ajustaDados() {
    const data = moment(this.operacao.dataOperacao);
    this.aux = new Operacao();
    this.aux.dataOperacao =  data.format('YYYY-MM-DD');
    this.aux.id = this.operacao.id;
    this.aux.valor = this.operacao.valor;
    this.aux.observacao = this.operacao.observacao;
    // this.aux.usuario.id = this.operacao.id != null ? this.operacao.usuario.id : 1;
    this.aux.conta.id = this.operacao.conta.id;
    // this.aux.status.id = this.operacao.id != null ? this.operacao.status.id : 1;
    this.aux.motivoOperacao.id = this.operacao.motivoOperacao.id;

  }

    adicionar() {
      this.ajustaDados();
      if (this.selecionado === 1) {
          this.entradaService.adicionar(this.aux)
            .then(operacao => {
            this.ngOnInit();
            // this.operacao = operacao;
          });
      } else {
          this.retiradaService.adicionar(this.aux)
          .then(operacao => {
            this.ngOnInit();
            // this.operacao = operacao;
        });
      }
    }

    excluir(id: number) {
      if (this.selecionado === 1) {
        this.entradaService.excluir(id)
        .then(() => {
        this.consultar();
      });
      } else {
        this.retiradaService.excluir(id)
       .then(() => {
        this.consultar();
      });
      }
    }



  carregarTipos() {
    if (this.selecionado === 1) {
      this.carregarTipoEntradas();
    } else {
      this.carregarTipoRetiradas();
    }
  }

  consultar() {
    if (this.selecionado === 1) {
        this.entradaService.consultar()
          .then(operacoes => {
          this.operacoes = operacoes;
          this.inicio();
        });
    } else {
        this.retiradaService.consultar()
        .then(operacoes => {
        this.operacoes = operacoes;
        this.inicio();
      });
    }
  }



  carregarContas() {
    this.contaService.consultar()
      .then(contas => {
      this.contas = contas.map(c => {
        return {label: c.nome, value: c.id};
      });
    });
  }

  carregarTipoEntradas() {
    this.tipoEntradaService.consultar()
      .then(tipos => {
      this.tipos = tipos.map(t => {
        return {label: t.descricao, value: t.id};
      });
    });
  }

  carregarTipoRetiradas() {
    this.tipoRetiradaService.consultar()
      .then(tipos => {
        this.tipos = tipos.map(t => {
          return {label: t.descricao, value: t.id};
        });
    });
  }

  dataOperacao(operacao: Operacao): Operacao {
    const data = moment(operacao.dataOperacao, 'YYYY-MM-DD').toDate();
    operacao.dataOperacao = data;
    return operacao;
  }

  editar(o: Operacao) {
    this.operacao = this.dataOperacao(o);
  }
}

export class Operacao {
  id: number;
  dataOperacao: any;
  valor: number;
  observacao: string;
  usuario = new Usuario();
  conta = new Conta();
  status = new Status();
  motivoOperacao =  new MotivoOperacao () ;
}

export class Usuario {
  id: number;
}
export class Conta {
  id: number;
}

export class Status {
  id: number;
}

export class MotivoOperacao {
  id: number;
}
