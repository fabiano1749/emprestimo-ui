import { TipoUsuarioService } from './../tipo-usuario.service';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios = [];
  tiposUsuarios = [];
  status = [];
  usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
              private tipoUsuarioService: TipoUsuarioService) { }

  ngOnInit() {
    this.carregarTiposUsuarios();
    this.carregarStatus();
    this.consultar();
    this.inicio();
  }

  inicio() {
    this.usuario = new Usuario();
  }

  consultar() {
    this.usuarioService.consultar()
    .then(usuarios => {
      this.usuarios = usuarios;
      this.inicio();
    });
  }

  adicionar() {
    this.usuarioService.adicionar(this.usuario)
    .then(usuario => {
      this.consultar();
    });
  }

  excluir(id: number) {
    this.usuarioService.excluir(id)
    .then(() => {
      this.consultar();
    });
  }

  editar(u: Usuario) {
    this.usuario = u;
  }

  carregarTiposUsuarios() {
    return this.usuarioService.consultar()
    .then(tipos => {
        this.tiposUsuarios = tipos.map(t => {
          return {label: t.nome , value: t.id};
        });
    });
  }

  carregarStatus() {
    return this.usuarioService.statusUsados()
    .then(status => {
        this.status = status.map(s => {
          return {label: s.nome , value: s.id};
        });
    });
  }

}

export class Usuario {
  nome: string;
  username: string;
  senha: string;
  tipo = new TipoUsuario();
  status = new Status();

}

export class TipoUsuario {
  id: number;
}

export class Status {
  id: number;
}
