import { TipoRetiradaService } from './../tipo-retirada.service';
import { Component, OnInit } from '@angular/core';
import { TipoEntradaService } from '../tipo-entrada.service';

@Component({
  selector: 'app-tipo-entrada',
  templateUrl: './tipo-entrada.component.html',
  styleUrls: ['./tipo-entrada.component.css']
})
export class TipoEntradaComponent implements OnInit {

  selecao = [
    {label: 'Entrada', value: 1 },
    {label: 'Retirada', value: 2}
  ];

  selecionado = 1;
  tipo: Tipo;
  tipos = [];

  constructor(private tipoEntradaService: TipoEntradaService,
              private tipoRetiradaService: TipoRetiradaService) { }

  ngOnInit() {
    this.consultar();
    this.inicio();
  }

  inicio() {
    this.tipo = new Tipo();
  }

  mudaSelecao() {
    this.ngOnInit();
  }

  consultar() {
    if (this.selecionado === 1) {
        this.tipoEntradaService.consultar()
          .then(tipos => {
          this.tipos = tipos;
          this.inicio();
        });
    } else {
        this.tipoRetiradaService.consultar()
        .then(tipos => {
        this.tipos = tipos;
        this.inicio();
      });
    }
  }

  adicionar() {
    if (this.selecionado === 1) {
      this.tipoEntradaService.adicionar(this.tipo)
      .then(tipo => {
        this.consultar();
      });
    } else {
      this.tipoRetiradaService.adicionar(this.tipo)
      .then(tipo => {
        this.consultar();
      });
    }
}

  excluir(id: number) {
    if (this.selecionado === 1) {
      this.tipoEntradaService.excluir(id)
      .then(() => {
      this.consultar();
    });
    } else {
      this.tipoRetiradaService.excluir(id)
     .then(() => {
      this.consultar();
    });

    }
  }

  editar(t: Tipo) {
    this.tipo = t;
  }

}

export class Tipo {
  id: number;
  descricao: string;
}
