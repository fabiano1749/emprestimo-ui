import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TooltipModule} from 'primeng/tooltip';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputMaskModule} from 'primeng/inputmask';
import {DialogModule} from 'primeng/dialog';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EstadoComponent } from './estado/estado.component';
import { CidadeComponent } from './cidade/cidade.component';
import { SharedModule } from '../shared/shared.module';
import { ClienteComponent } from './cliente/cliente.component';
import { ClientePesquisaComponent } from './cliente-pesquisa/cliente-pesquisa.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';


@NgModule({
  declarations: [
    CidadeComponent,
    EstadoComponent,
    ClienteComponent,
    ClientePesquisaComponent,
    UsuarioComponent,
    AlterarSenhaComponent
  ],
  exports: [
    CidadeComponent,
    EstadoComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TabViewModule,
    InputTextareaModule,
    TooltipModule,
    BrowserModule,
    FormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    DialogModule,
    SharedModule,
    HttpClientModule,
    InputMaskModule,
    RouterModule
  ],
  providers: [
    ]
})
export class PessoasModule { }
