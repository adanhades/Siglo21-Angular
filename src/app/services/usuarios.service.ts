import { HttpClient, HttpHeaders, HttpParams  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AutenticarService } from "./autenticar.service";
import { ApiResponse, Usuario } from "../interfaces/auth.interfaces";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl: string = environment.baseUrl;
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  constructor(
    private http: HttpClient,
    private autenticarService: AutenticarService
    ) {
    }

    public getUsuarios(): Observable<ApiResponse> {
      const body = new HttpParams()
      .set('token', this.autenticarService.usuario.token);
      console.log('body: ', body);
      return this.http.post<ApiResponse>(`${this.baseUrl}/UsuariosController/listarUsuarios`,body);
    }

    public deleteUsuario(id: number) {
      const body = new HttpParams();
      body.set('token', this.autenticarService.usuario.token);
      body.set('id', id.toString());
      return this.http.post(`${this.baseUrl}/UsuariosController/eliminarUsuario`, body, this.options);
    }

    public updateUsuario(usuario: Usuario) {
      const body = new HttpParams()
      .set('token', this.autenticarService.usuario.token)
      .set('id', this.autenticarService.usuario.id.toString())
      .set('nombres', usuario.nombres)
      .set('telefono', usuario.telefono)
      .set('username', usuario.username)
      .set('apellidos', usuario.apellidos)
      .set('email', usuario.email)
      .set('password', usuario.password);
      return this.http.post(`${this.baseUrl}/UsuariosController/modificarUsuario`, body, this.options);
    }

    public createUsuario(usuario: Usuario) {
      const body = new HttpParams()
      .set('token', this.autenticarService.usuario.token)
      .set('nombres', usuario.nombres)
      .set('telefono', usuario.telefono)
      .set('username', usuario.username)
      .set('apellidos', usuario.apellidos)
      .set('email', usuario.email)
      .set('password', usuario.password)
      .set('rut', usuario.rut)
      .set('id_perfil',usuario.rol)
      .set('dvrut', usuario.rut[usuario.rut.length - 1]);
      return this.http.post(`${this.baseUrl}/UsuariosController/agregarUsuario`, body, this.options);
    }
}
