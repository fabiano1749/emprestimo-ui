import { AuthService } from 'src/app/seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private usuario;
  private exibindoMenu = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    // this.usuario = this.auth.jwtPayload?.user_name;
    this.usuario = 'Marques';
  }

  exibirMenu() {
    this.exibindoMenu = !this.exibindoMenu;
  }

  exibeMenu(): boolean {
    return this.exibindoMenu;
  }

  getUsuario() {
    return this.usuario;
  }

  logout() {
    this.auth.logout()
    .then(() => {
      this.router.navigate(['/login']);
    });
  }
}
