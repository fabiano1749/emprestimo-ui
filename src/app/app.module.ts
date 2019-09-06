import { AlterarSenhaComponent } from './pessoas/alterar-senha/alterar-senha.component';
import { PesquisaEmprestimoComponent } from './operacao/pesquisa-emprestimo/pesquisa-emprestimo.component';
import { ParcelaComponent } from './operacao/parcela/parcela.component';
import { ContaComponent } from './operacao/conta/conta.component';
import { ClienteComponent } from './pessoas/cliente/cliente.component';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { CidadeComponent } from './pessoas/cidade/cidade.component';
import { EstadoComponent } from './pessoas/estado/estado.component';
import { Routes, RouterModule } from '@angular/router';
import { TokenInterceptor } from './seguranca/token.interceptor';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {TabViewModule} from 'primeng/tabview';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SegurancaModule } from './seguranca/seguranca.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientePesquisaComponent } from './pessoas/cliente-pesquisa/cliente-pesquisa.component';
import { OperacaoModule } from './operacao/operacao.module';
import { TipoEntradaComponent } from './operacao/tipo-entrada/tipo-entrada.component';
import { EntradaRetiradaComponent } from './operacao/entrada-retirada/entrada-retirada.component';
import { EmprestimoComponent } from './operacao/emprestimo/emprestimo.component';
import { UsuarioComponent } from './pessoas/usuario/usuario.component';
import { TelaInicialComponent } from './core/tela-inicial/tela-inicial.component';

const routes: Routes = [
  { path: 'estado', component: EstadoComponent},
  { path: 'cidade', component: CidadeComponent},
  { path: 'cliente', component: ClienteComponent},
  { path: 'cliente/:codigo', component: ClienteComponent},
  { path: 'cliente-pesquisa', component: ClientePesquisaComponent},
  { path: 'login',  component: LoginFormComponent},
  { path: 'conta',  component: ContaComponent},
  { path: 'tipoEntrada',  component: TipoEntradaComponent},
  { path: 'entradaRetirada',  component: EntradaRetiradaComponent},
  { path: 'emprestimo',  component: EmprestimoComponent},
  { path: 'emprestimo/:codigo', component: EmprestimoComponent},
  { path: 'acompanhaEmprestimo',  component: PesquisaEmprestimoComponent},
  { path: 'parcelas',  component: ParcelaComponent},
  { path: 'usuarios',  component: UsuarioComponent},
  { path: 'alterarSenha',  component: AlterarSenhaComponent},
  { path: 'telaInicial',  component: TelaInicialComponent}
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    InputTextModule,
    ButtonModule,
    TableModule,
    TabViewModule,
    TooltipModule,
    BrowserModule,
    AppRoutingModule,
    PessoasModule,
    OperacaoModule,
    SegurancaModule,
    CoreModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
