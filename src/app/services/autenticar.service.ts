import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse, Cliente, GoogleUser, LoginResponse, SocialUser, Usuario } from "../interfaces/auth.interfaces";
import { Observable, catchError, map, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "@auth0/auth0-angular";
import { local } from "d3-selection";

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {
    private baseUrl: string = environment.baseUrl;
    private _usuario: Usuario;
    private _social_usuario:SocialUser = {};
    private _usuarioGoogle: GoogleUser
    private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    constructor(
        private http: HttpClient,
        private auth: AuthService,
      ) { }

      getUsuarios() {

        console.log('this.usuario.token: ', this.usuario.token);
        const url = `${this.baseUrl}/UsuariosController/listarUsuarios`;
        const body = new HttpParams()
        .set('token', this.usuario.token);
        console.log('body: ', body);
        return this.http.post(url,body, this.options)
        .pipe(
          tap((resp: any) => {
            if (resp.ok === true) {
              console.log('resp: ', resp);
            }
          }),
          map((resp: any) => resp),
          catchError((err) => of(err)));
      }
    
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

      get social_usuario() {
        return { ...this._social_usuario };
      }

      get usuarioGoogle() {
        return { ...this._usuarioGoogle };
      }

      setUsuarioGoogle(usuario){
        this._usuarioGoogle = usuario;
      }

      getUsuarioGoogle(){
        this.auth.user$.subscribe((data)=>{
          console.log('data: ', data);
          this._usuarioGoogle = data;
          return this._usuarioGoogle
        });
      }

      saveGoogleUser(data): Observable<any>{
        console.log('Usuario Google: ', data);
        return this.http.post<any>(`${this.baseUrl}/Integracion/google_auth`,JSON.parse(JSON.stringify(data)));
      }

      

}