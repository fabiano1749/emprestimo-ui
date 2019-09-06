import { CidadeService } from './../cidade.service';
import { ClienteService } from './../cliente.service';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  id: number;
  cliente: Cliente;
  clienteEdicao: Cliente;
  endereco: Endereco;
  contato: Contato;
  usuarios = [];
  status = [];
  cidades = [];
  tipos = [{label: 'COMERCIAL' , value: 'COMERCIAL'},
                  {label: 'PESSOAL' , value: 'PESSOAL'}];



  constructor(private usuarioService: UsuarioService,
              private clienteService: ClienteService,
              private cidadeService: CidadeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.carregarUsusarios();
    this.carregarStatus();
    this.carregarCidades();
    this.inicio(this.route.snapshot.params['codigo']);
  }

  inicio(id: number) {
    this.cliente  = this.novoCliente();
    this.endereco = new Endereco();
    this.contato = new Contato();
    if (id && id !== 0) {
      this.carregarCliente(id);
    }
  }

  clienteNovo() {
    return this.cliente.id == null;
  }

  novoCliente(): Cliente {
    const c = new Cliente();
    c.status = new Status();
    c.usuario = new Usuario();
    c.enderecos = [];
    c.contatos = [];
    return c;
  }


  adicionar() {
    this.clienteService.adicionar(this.cliente)
      .then(cliente => {
        this.cliente = cliente;
      });
    }

    carregarCliente(id) {
      this.clienteService.buscarClientePorCodigo(id)
      .then(cliente => {
        this.setaDadosCliente(cliente);
      });
    }

    setaDadosCliente(cliente) {
      this.cliente.id = cliente.id;
      this.cliente.nome = cliente.nome;
      this.cliente.cpf = cliente.cpf;
      this.cliente.nomeComercio = cliente.nomeComercio;
      this.cliente.usuario.id = cliente.usuario.id;
      this.cliente.status.id = cliente.status.id;
      this.cliente.observacao = cliente.observacao;
      this.cliente.enderecos = cliente.enderecos;
      this.cliente.contatos = cliente.contatos;
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
    return this.clienteService.statusUsados()
    .then(status => {
        this.status = status.map(s => {
          return {label: s.nome , value: s.id};
        });
    });
  }

  carregarCidades() {
    return this.cidadeService.consultar()
    .then(cidades => {
        this.cidades = cidades.map(c => {
          return {label: c.nome , value: c.id};
        });
    });
  }

  adicionarContato() {
    if (this.contato.id != null) {
      const index =  this.cliente.contatos.findIndex(c => c.id === this.contato.id);
      this.cliente.contatos.splice(index, 1);
    }

    this.cliente.contatos.push((this.contato));
    this.contato = new Contato();
    this.adicionar();
   }

  adicionarEndereco(form: NgForm) {
    if (this.endereco.id != null) {
      const index =  this.cliente.enderecos.findIndex(end => end.id === this.endereco.id);
      this.cliente.enderecos.splice(index, 1);
    }

    this.cliente.enderecos.push((this.endereco));
    this.endereco = new Endereco();
    this.adicionar();
   }

   getNomeCidade(id: number) {
    const cidade = this.cidades.find(c => c.value === id);
    return cidade.label;
   }

   editarEndereco(e: Endereco) {
    this.endereco = e;
  }

  editarContato(c: Contato) {
    this.contato = c;
  }

  excluirEndereco(e: Endereco) {
    const index =  this.cliente.enderecos.findIndex(end => end === e);
    this.cliente.enderecos.splice(index, 1);
    this.adicionar();
  }

  excluirContato(c: Contato) {
    const index =  this.cliente.contatos.findIndex(cont => cont === c);
    this.cliente.contatos.splice(index, 1);
    this.adicionar();
  }
}

export class Endereco {
  id: number;
  tipo: 'Comercial';
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  referencia: string;
  cidade = new Cidade();
}

export class Contato {
  id: number;
  tipo = 'Comercial';
  email: string;
  fixo: string;
  celular: string;
}

export class Cidade {
  id: number;
  // nome: string;
}

export class Cliente {
  id: number;
  nome: string;
  observacao: string;
  cpf: string;
  nomeComercio: string;
  usuario: Usuario;
  status: Status;
  enderecos = new Array<Endereco>();
  contatos = new Array<Contato>();
}

export class Usuario {
  id: number;
}

export class Status {
  id: number;
}
