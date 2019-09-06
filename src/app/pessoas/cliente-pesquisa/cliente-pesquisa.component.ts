import { EstadoService } from './../estado.service';
import { ClienteService } from './../cliente.service';
import { CidadeService } from './../cidade.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-cliente-pesquisa',
  templateUrl: './cliente-pesquisa.component.html',
  styleUrls: ['./cliente-pesquisa.component.css']
})
export class ClientePesquisaComponent implements OnInit {

  filtro = new Filtro();
  clientes = [];
  usuarios = [];
  estados = [];
  cidades = [];
  status = [];

  constructor(private usuarioService: UsuarioService,
              private clienteService: ClienteService,
              private cidadeService: CidadeService,
              private estadoService: EstadoService ) { }

  ngOnInit() {
    this.carregarUsusarios();
    this.carregarStatus();
    this.carregarCidades();
    this.carregarEstados();
  }

  carregarUsusarios() {
    return this.usuarioService.consultar()
    .then(usuarios => {
        this.usuarios = usuarios.map(u => {
          return {label: u.nome , value: u.nome};
        });
    });
  }

  carregarStatus() {
    return this.clienteService.statusUsados()
    .then(status => {
        this.status = status.map(s => {
          return {label: s.nome , value: s.nome};
        });
    });
  }

  carregarCidades() {
    return this.cidadeService.consultar()
    .then(cidades => {
        this.cidades = cidades.map(c => {
          return {label: c.nome , value: c.nome};
        });
    });
  }

  carregarEstados() {
    return this.estadoService.consultar()
    .then(estados => {
        this.estados = estados.map(e => {
          return {label: e.nome , value: e.nome};
        });
    });
  }

  pesquisar() {
    // console.log(JSON.stringify(this.filtro));
    return this.clienteService.pesquisar(this.filtro)
      .then(clientes => {
        this.clientes = clientes;
      });
  }

}

export class Filtro {
  nome: string;
  estado: string;
  cidade: string;
  status: string;
  usuario: string;
}
