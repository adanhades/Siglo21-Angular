import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Usuario } from 'src/app/interfaces/auth.interfaces';
// import { AuthService } from 'src/app/services/auth.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {


  usuario: Usuario = {};
  nombreUsuario: string = '';
  constructor(
    public appService:AppService,
    // private auth: AuthService,
    private auth0: AuthService
  ) { }

  ngOnInit(): void {
    // this.getUsuario();
  }

  // getUsuario(){
  //   if(!this.auth.usuario){
  //     return;
  //   }
  //   this.usuario = this.auth.usuario;
  //   console.log('this.usuario: ', this.usuario);
  //   this.getNombre();
  // }

  getNombre(){
    const nombre = this.usuario.nombres.split(' ')[0];
    const apellido = this.usuario.apellidos.split(' ')[0];
    this.nombreUsuario =  `${nombre} ${apellido}`;
  }

  logout(){
    this.auth0.logout({ logoutParams: { returnTo: document.location.origin } })
  }

}
