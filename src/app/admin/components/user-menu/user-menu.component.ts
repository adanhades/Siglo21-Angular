import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/auth.interfaces';
import { AutenticarService } from 'src/app/services/autenticar.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public userImage = 'assets/images/others/admin.jpg';
  usuario: Usuario = {};
  nombreUsuario: string = '';
  constructor(
    private autenticar: AutenticarService
  ) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(){
    if(!this.autenticar.usuario){
      return;
    }
    this.usuario = this.autenticar.usuario;
    console.log('this.usuario: ', this.usuario);
    this.getNombre();
  }

  getNombre(){
    const nombre = this.usuario.nombres.split(' ')[0];
    const apellido = this.usuario.apellidos.split(' ')[0];
    this.nombreUsuario =  `${nombre} ${apellido}`;
  }

}
