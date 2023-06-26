import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; 
// import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { AppSettings, Settings } from 'src/app/app.settings';
import { MenuS21 } from 'src/app/models/venta-cliente.model';

@Component({
  selector: 'app-today-menu',
  templateUrl: './today-menu.component.html',
  styleUrls: ['./today-menu.component.scss']
})
export class TodayMenuComponent implements OnInit {
  @Input() menuItem!: MenuS21; 
  public quantityCount:number = 1;
  public settings: Settings;
  constructor(public appService:AppService, public snackBar: MatSnackBar, public appSettings:AppSettings) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit(): void { } 

  public counterChange(count:number){ 
    this.quantityCount = count;   
  } 

  public addToCart(){ 
    this.menuItem.cartCount = this.quantityCount;
    if(this.menuItem.cartCount <= this.menuItem.availibilityCount){
      const index: number = this.appService.Data.cartList.findIndex(item => item.id == this.menuItem.id); 
      (index !== -1) ? this.appService.Data.cartList[index] = this.menuItem : this.appService.addToCart(this.menuItem, null); 
      this.appService.calculateCartTotal();
    }
    else{
      this.menuItem.cartCount = this.menuItem.availibilityCount;
      this.snackBar.open('No puede agregar más elementos de los disponibles. En stock' + this.menuItem.availibilityCount + ' artículos y ya agregaste' + this.menuItem.cartCount + ' Artículo a tu carrito', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    }
  }


  public addToFavorites(){  
    this.appService.addToFavorites(this.menuItem);
  } 

}
