import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse, Cliente, GoogleUser, LoginResponse, Usuario } from "../interfaces/auth.interfaces";
import { Observable, catchError, map, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "@auth0/auth0-angular";

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {
    private baseUrl: string = environment.baseUrl;
    private _usuario: Usuario;
    private _usuarioGoogle: GoogleUser
    private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    constructor(
        private http: HttpClient,
        private auth: AuthService,
      ) { }
    
      login(userLogin): Observable<LoginResponse> {
        console.log('userLogin: ', userLogin);
        const url = `${this.baseUrl}/AutenticacionController/autenticar`;
    
        const body = new HttpParams()
          .set('email', userLogin.email)
          .set('password', userLogin.password);
        return this.http.post<LoginResponse>(url, body)
        .pipe(
          tap((resp: LoginResponse) => {
            if (resp.ok === true) {
              this._usuario = resp.data;
            }
          }),
          map((resp: LoginResponse) => resp),
          catchError((err) => of(err)));
      }
    
      logout() {
        this._usuario = null;
        console.log('this._usuario: ', this._usuario);
      }
    
      get usuario() {
        return { ...this._usuario };
      }

      get usuarioGoogle() {
        return { ...this._usuarioGoogle };
      }

      getUsuarioGoogle(){
        this.auth.user$.subscribe((data)=>{
          console.log('data: ', data);
          this._usuarioGoogle = data;
          return this._usuarioGoogle;
        });
      }
    
      registrarCliente(cliente: Cliente){
        const body = new HttpParams()
          .set('nombre', cliente.nombre)
          .set('apellido', cliente.apellido)
          .set('email', cliente.email)
          .set('password', cliente.password)
          .set('telefono', cliente.telefono)
        return this.http.post<ApiResponse>(`${this.baseUrl}/ClientesController/agregarCliente`, body, this.options);
      }
}