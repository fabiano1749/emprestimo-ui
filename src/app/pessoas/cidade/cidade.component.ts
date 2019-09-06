import { Cidade } from './../../core/model';
import { CidadeService } from './../cidade.service';
import { Component, OnInit} from '@angular/core';
import { EstadoService } from '../estado.service';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css']
})

export class CidadeComponent implements OnInit {
  cidade: Cidade;
  cidades = [];
  estados = [];

  constructor(private cidadeService: CidadeService,
              private estadoService: EstadoService) {}

  ngOnInit() {
    this.consultar();
    this.carregarEstados();
    this.inicio();
  }

  inicio() {
    this.cidade = new Cidade();
  }

  consultar() {
    this.cidadeService.consultar()
    .then(cidades => {
      this.cidades = cidades;
      this.inicio();
    });
  }

  adicionar() {
    this.cidadeService.adicionar(this.cidade)
      .then(cidade => {
        this.consultar();
      });
    }

  carregarEstados() {
    return this.estadoService.consultar()
    .then(estados => {
        this.estados = estados.map(e => {
          return {label: e.nome , value: e.id};
        });
    });
  }

  excluir(id: number) {
    this.cidadeService.excluir(id)
    .then(() => {
      this.consultar();
    });
  }

  editar(c: Cidade) {
    this.cidade = c;
  }


}
