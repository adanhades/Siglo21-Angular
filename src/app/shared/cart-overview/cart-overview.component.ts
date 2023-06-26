import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'; 
// import { MenuItem } from 'src/app/app.models';
import { Settings, AppSettings } from 'src/app/app.settings';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuS21 } from 'src/app/models/venta-cliente.model';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.scss']
})
export class CartOverviewComponent implements OnInit {
  public menuItems: MenuS21[] = [];
  public settings: Settings;
  constructor(public appService:AppService, 
              public appSettings:AppSettings,
              private bottomSheetRef: MatBottomSheetRef<CartOverviewComponent>,
              public snackBar: MatSnackBar,
              public menuService: MenusService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.menuItems = this.appService.Data.cartList;
  }

  public hideSheet(isRedirect:boolean){
    this.bottomSheetRef.dismiss(isRedirect);
  }

  public clearCart(){
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0; 
    this.appService.Data.totalCartCount = 0;
    this.menuService.clearCart();
    this.hideSheet(false)
  }

  public remove(item:MenuS21, event:any) {
    const index: number = this.appService.Data.cartList.indexOf(item);
    if (index !== -1) {
      item.cartCount = 0;
      this.appService.Data.cartList.splice(index, 1);  
      this.appService.calculateCartTotal(); 
    } 
    if(this.appService.Data.cartList.length == 0){
      this.hideSheet(false);
    }
    event.preventDefault();           
  }  

  public counterChange(menuItem:MenuS21, count:number){   
    menuItem.cartCount = count;
    if(menuItem.cartCount <= menuItem.availibilityCount){ 
      this.appService.calculateCartTotal();
    }
    else{
      menuItem.cartCount = menuItem.availibilityCount;
      this.snackBar.open('No puede agregar más elementos de los disponibles. En stock' + menuItem.availibilityCount + ' artículos y ya agregaste' + menuItem.cartCount + ' Artículo a tu carrito', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    } 
  }
 

}
