import { CidadeService } from './../pessoas/cidade.service';
import { EstadoService } from './../pessoas/estado.service';
import { AuthService } from './../seguranca/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TelaInicialComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    AuthService,
    EstadoService,
    CidadeService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
