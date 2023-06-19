import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/interfaces/auth.interfaces';
import { AutenticarService } from 'src/app/services/autenticar.service';

@Injectable()
export class UsersService {
    public url = "api/users";
    private baseUrl: string = environment.baseUrl;
    private options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').
        set('Access-Control-Allow-Origin', '*').
        set('host', 'http://localhost').
        set('content-length', '291')
        };
    constructor(
        public http:HttpClient,
        private autenticarService: AutenticarService
        ) { }
    
    agregarUsuario() {
        let usuario: Usuario;
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

    listarUsuarios(): Observable<any> {
        const body = new HttpParams()
        .set('token', this.autenticarService.usuario.token);
        console.log('body: ', body);
        console.log('token: ', this.autenticarService.usuario.token);
        return this.http.post<any>(`${this.baseUrl}/UsuariosController/listarUsuarios`,body, this.options);
    }

    addUser(user:User){	    
        return this.http.post(this.url, user);
    }
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }

    updateUser(user:User){
        return this.http.put(this.url, user);
    }

    deleteUser(id: number) {
        return this.http.delete(this.url + "/" + id);
    } 
} 