import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { GoogleUser, Usuario } from 'src/app/interfaces/auth.interfaces';
// import { AuthService } from 'src/app/services/auth.service';
import { AuthService } from '@auth0/auth0-angular';
import { AutenticarService } from '../../../services/autenticar.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {


  usuario: GoogleUser = {};
  nombreUsuario: string = '';
  constructor(
    public appService:AppService,
    private autenS: AutenticarService,
    public auth0: AuthService
  ) { }

  ngOnInit(): void {
    if(this.auth0.isAuthenticated$){
      console.log("Autenticado");
      this.getUsuario();
    }
  }

  getUsuario(){
    this.auth0.user$.subscribe((data)=>{
      console.log('data: ', data);
      this.usuario = data;
    });
  }



  logout(){
    this.auth0.logout({ logoutParams: { returnTo: document.location.origin } })
  }

}
