import { Component, OnInit } from '@angular/core';
import { ContaService } from '../conta.service';
import { UsuarioService } from 'src/app/pessoas/usuario.service';
import { container } from '@angular/core/src/render3';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  conta: Conta;
  contas = new Array<Conta>();
  usuarios = new Array<Usuario>();
  status = new Array<Status>();

  constructor(private contaService: ContaService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.inicio();
    this.carregarStatus();
    this.carregarUsusarios();
    this.consultar();
  }

  inicio() {
    this.conta = new Conta();
  }

  consultar() {
    this.contaService.consultar()
    .then(contas => {
      this.contas = contas;
      this.inicio();
    });
  }

  adicionar() {
    this.contaService.adicionar(this.conta)
    .then(conta => {
      this.consultar();
    });
}

excluir(id: number) {
  this.contaService.excluir(id)
  .then(() => {
    this.consultar();
  });
}

editar(c: Conta) {
  this.conta = this.ajustaDados(c);
}

carregarUsusarios() {
  return this.usuarioService.consultar()
  .then(usuarios => {
      this.usuarios = usuarios.map(u => {
        return {label: u.nome , value: u.id};
      });
  });
}

carregarStatus() {
  return this.contaService.statusUsados()
  .then(status => {
      this.status = status.map(s => {
        return {label: s.nome , value: s.id};
      });
  });
}

ajustaDados(conta: Conta): Conta {
  const aux = new Conta();
  aux.id = conta.id;
  aux.nome = conta.nome;
  aux.saldoInicial = conta.saldoInicial;
  aux.administrador.id = conta.administrador.id;
  aux.status.id = conta.status.id;
  return aux;
}

}

export class Conta {
  id: number;
  nome: string;
  saldoInicial: number;
  administrador = new Usuario();
  status = new Status();
}

export class Usuario {
  id: number;
}

export class Status {
  id: number;
}
