import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from "@auth0/auth0-angular";
import { MenusService } from "../services/menus.service";

@Injectable({
    providedIn: 'root'
})
export class ValidaMesa implements CanActivate, CanLoad, CanActivateChild{
    constructor(
        private auth: AuthService,
        private router: Router,
        private menusService: MenusService
    ){}
    canActivate(
        next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean  | UrlTree> | Promise<boolean  | UrlTree> | boolean  | UrlTree {
        return this.auth.isAuthenticated$;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
        this.auth.isAuthenticated$.subscribe((auth)=>{
            console.log('auth: ', auth);
            if(!auth){
                localStorage.removeItem('ventaCliente');
                this.router.navigate(['/login']);
            }else{
                if(!this.menusService.ventaCliente){
                    this.menusService.ventaCliente =  JSON.parse(localStorage.getItem('ventaCliente'));
                }
                console.log('Guard ventaCliente: ', this.menusService.ventaCliente);
                if(!this.menusService.ventaCliente?.tieneMesa){
                    this.router.navigate(['/client']);
                }
            }
        });
        return this.auth.isAuthenticated$;
    }

    canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean>{
        return this.auth.isAuthenticated$;
    }
}