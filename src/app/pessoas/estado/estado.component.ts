import { Estado } from './../../core/model';
import { EstadoService } from './../estado.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  estados = [];
  estado: Estado;

  constructor(private estadoService: EstadoService) {}

  ngOnInit() {
    this.inicio();
    this.consultar();
  }

  inicio() {
    this.estado = new Estado();
  }

  consultar() {
    this.estadoService.consultar()
    .then(estados => {
      this.estados = estados;
      this.inicio();
    });
  }

    adicionar() {
        this.estadoService.adicionar(this.estado)
        .then(estado => {
          this.consultar();
        });
    }

    excluir(id: number) {
      this.estadoService.excluir(id)
      .then(() => {
        this.consultar();
      });
    }

    editar(e: Estado) {
      this.estado = e;
    }
}

