import { UsuarioService } from 'src/app/pessoas/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  senha =  '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  alterar() {
    console.log(JSON.stringify(this.senha));
    this.usuarioService.alterarSenha(this.senha)
    .then(() => {
      this.senha = '';
    });
  }

}
