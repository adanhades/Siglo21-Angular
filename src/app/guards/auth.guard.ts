import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from "@auth0/auth0-angular";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild{
    constructor(
        private auth: AuthService,
        private router: Router
    ){}
    canActivate(
        next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean  | UrlTree> | Promise<boolean  | UrlTree> | boolean  | UrlTree {
        return this.auth.isAuthenticated$;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
        console.log('this.auth.isAuthenticated$: ', this.auth.isAuthenticated$);
        this.auth.isAuthenticated$.subscribe((auth)=>{
            console.log('auth: ', auth);
            if(!auth){
                this.router.navigate(['/login']);
            }
        });
        return this.auth.isAuthenticated$;
    }

    canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean>{
        return this.auth.isAuthenticated$;
    }
}