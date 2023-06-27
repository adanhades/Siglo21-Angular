import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/interfaces/auth.interfaces';
import { AutenticarService } from 'src/app/services/autenticar.service';
import { MenusService } from 'src/app/services/menus.service';
import { DataCliente } from '../../../interfaces/auth.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {

  mesas: any[] = [];
  loader: boolean = false;
  seleccionada: boolean = false;
  constructor(
    private menusService: MenusService,
    private autenticarService: AutenticarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMesas();
  }

  getMesas(){
    this.menusService.getMesas().subscribe((res:any)=>{
        console.log('res: ', res);
        this.mesas = res.data.mesas;
    });
  }

  seleccionarMesa(mesa: any){
    this.loader = true;
    console.log('mesa: ', mesa);
    this.menusService.iniciarAtencionMesa(mesa).subscribe((res:Atencion)=>{
      this.seleccionada = true;
      console.log('Mesa iniciada', res);
      this.getMesas();
      this.menusService.ventaCliente.tieneMesa = true;
      this.menusService.ventaCliente.mesa = mesa.id;
      this.menusService.ventaCliente.idAtencion = res.data.id_atencion;
      this.menusService.saveVentaClienteLocalStorage();
      this.loader = false;
      this.router.navigate(['/menu']);
    });
  }



}

export interface Atencion { 
  data?: { id_atencion: number };
  http_Status: number;
  message: string;
  ok: boolean;
  status: string;
}

