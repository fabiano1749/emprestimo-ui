import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SelectButtonModule} from 'primeng/selectbutton';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';

import { ContaComponent } from './conta/conta.component';
import { TipoEntradaComponent } from './tipo-entrada/tipo-entrada.component';
import { EntradaRetiradaComponent } from './entrada-retirada/entrada-retirada.component';
import { EmprestimoComponent } from './emprestimo/emprestimo.component';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import {InputMaskModule} from 'primeng/inputmask';
import { ParcelaComponent } from './parcela/parcela.component';
import { PesquisaEmprestimoComponent } from './pesquisa-emprestimo/pesquisa-emprestimo.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    ContaComponent,
    TipoEntradaComponent,
    EntradaRetiradaComponent,
    EmprestimoComponent,
    ParcelaComponent,
    PesquisaEmprestimoComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    TableModule,
    InputTextareaModule,
    SelectButtonModule,
    TooltipModule,
    BrowserModule,
    FormsModule,
    DropdownModule,
    DialogModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    CurrencyMaskModule,
    InputMaskModule,
    RouterModule
  ],
  exports: [
    ContaComponent, TipoEntradaComponent, EntradaRetiradaComponent
  ]
})
export class OperacaoModule { }
