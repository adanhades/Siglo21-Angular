import { Component, OnInit } from '@angular/core';
import { Settings, AppSettings } from 'src/app/app.settings';
import { AppService } from 'src/app/app.service';  
import { MenuItem } from 'src/app/app.models';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {  
  public slides = []; 
  public specialMenuItems:Array<MenuItem> = [];
  public bestMenuItems:Array<MenuItem> = [];
  public todayMenu!:MenuItem;
  usuario = {};
  spinner = false;
  public settings: Settings;
  constructor(
    public appSettings:AppSettings,
    public appService:AppService,
    public auth: AuthService ) {
    this.settings = this.appSettings.settings;  
  }

  ngOnInit(): void {
    this.getUsuario();
    this.getSlides();
    this.getSpecialMenuItems();
    this.getBestMenuItems();
    this.getTodayMenu();
    if(this.auth.user$){
      console.log('this.auth.user$: ', JSON.stringify(this.auth.user$) );
    }
  }

  async getUsuario(){
    this.spinner = true;
    await this.auth.user$.subscribe((data:any)=>{
      console.log('data: ', data);
      this.usuario = data;
      this.spinner = false;
    });
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
