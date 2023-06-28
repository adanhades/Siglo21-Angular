import { Component, OnInit } from '@angular/core';
import { Settings, AppSettings } from 'src/app/app.settings';
import { AppService } from 'src/app/app.service';  
// import { MenuItem } from 'src/app/app.models';
import { AuthService } from '@auth0/auth0-angular';
import { GoogleUser } from 'src/app/interfaces/auth.interfaces';
import { AutenticarService } from 'src/app/services/autenticar.service';
import { Router } from '@angular/router';
import { MenusService } from 'src/app/services/menus.service';
import { MenuS21 } from 'src/app/models/venta-cliente.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {  
  public slides = []; 
  public specialMenuItems:Array<MenuS21> = [];
  public bestMenuItems:Array<MenuS21> = [];
  public todayMenu!:MenuS21;
  usuarioGoogle: GoogleUser = {};
  spinner = true;
  public settings: Settings;
  constructor(
    public appSettings:AppSettings,
    public appService:AppService,
    public auth: AuthService,
    private auteService: AutenticarService,
    private router:Router, 
    private menuService: MenusService
    ) {
    this.settings = this.appSettings.settings;  
  }

  ngOnInit(): void {
    this.getSlides();
    this.getSpecialMenuItems();
    this.getBestMenuItems();
    this.getTodayMenu();
    this.redirectLogin();
  }
  
  async getUsuario(){
    if(!this.menuService.ventaCliente){
      this.menuService.initBuyData();
      await this.auth.user$.subscribe((data)=>{
        this.usuarioGoogle = data;
        this.auteService.saveGoogleUser(data).subscribe((dataUser)=>{
          this.auteService.setUsuarioGoogle(dataUser.data);
          localStorage.setItem('social_usuario', JSON.stringify(dataUser.data));
          console.log('Usuario google desde base de datos: ', dataUser.data);
          this.menuService.ventaCliente.socialUser = dataUser.data;
          this.menuService.saveVentaClienteLocalStorage();

        });
        this.menuService.ventaCliente.usuario = this.usuarioGoogle;
        console.log('HOME ventaCliente: ', this.menuService.ventaCliente);
        this.menuService.saveVentaClienteLocalStorage();
        this.router.navigate(['/client']);
        this.spinner = false;
      }, (error)=>{
        console.log('error: ', error);
        this.spinner = false;
        this.router.navigate(['/login'])
      });
    }else{
      
    }
  }
  
  redirectLogin(){
    this.spinner = true;
    if(!this.auth.isAuthenticated$){
      this.router.navigate(['/login']);
    }else{
      this.getUsuario();
    }
  }

  public getSlides(){
    this.appService.getHomeCarouselSlides().subscribe((res:any)=>{
      this.slides = res;
    });
  }
 
  public getSpecialMenuItems(){
    this.appService.getSpecialMenuItems().subscribe(menuItems=>{
      this.specialMenuItems = menuItems;
    });
  } 

  public getBestMenuItems(){
    this.appService.getBestMenuItems().subscribe(menuItems=>{
      this.bestMenuItems = menuItems;
    });
  }

  public getTodayMenu(){
    this.appService.getMenuItemById(23).subscribe(data=>{ 
      this.todayMenu = data;  
    });
  }  

}
