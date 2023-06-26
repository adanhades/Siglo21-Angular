import { HttpClient, HttpHeaders, HttpParams  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AutenticarService } from "./autenticar.service";
import { ApiResponse } from "../interfaces/auth.interfaces";
import { Observable } from 'rxjs';
import { MenuS21, VentaCliente } from "../models/venta-cliente.model";
import { Atencion } from "../pages/client/mesas/mesas.component";


@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private baseUrl: string = environment.baseUrl;
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  public menus: MenuS21[] = [];
  ventaCliente: VentaCliente;
  constructor(
    private http: HttpClient,
    private autenticarService: AutenticarService
    ) {
    }

    public getMenus(): Observable<ApiResponse> {
      const body = new HttpParams()
      .set('token', "");
      console.log('body: ', body);
      return this.http.post<ApiResponse>(`${this.baseUrl}/obtener-menu`,body);
    }

    getMesas(): Observable<ApiResponse>{
      const body = new HttpParams()
      .set('token', "");
      return this.http.post<ApiResponse>(`${this.baseUrl}/Compra/get_mesas`,body, this.options);
    }
    clearCart(){
      this.ventaCliente.orden = [];
      this.saveVentaClienteLocalStorage();
      localStorage.removeItem('cartList');
    }
    initBuyData(){
      this.ventaCliente = new VentaCliente();
      console.log('this.ventaCliente: ', this.ventaCliente);
      this.saveVentaClienteLocalStorage();
    }
    
    saveVentaClienteLocalStorage(){
      localStorage.setItem('ventaCliente', JSON.stringify(this.ventaCliente));
      console.log('localStorage', JSON.parse(localStorage.getItem('ventaCliente')));
    }

    iniciarAtencionMesa(mesa): Observable<Atencion>{
      const body = new HttpParams()
      .set('mesa_id', mesa.id)
      .set('cliente_id', this.ventaCliente.socialUser.data_cliente.id_cliente.toString());
      return this.http.post<Atencion>(`${this.baseUrl}/Compra/crear_atencion_mesa_cliente`,body, this.options);
    }

 

    
}
