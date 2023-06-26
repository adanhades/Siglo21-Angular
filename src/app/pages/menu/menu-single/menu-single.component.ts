import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppSettings, Settings } from 'src/app/app.settings';
import { AppService } from 'src/app/app.service';
// import { MenuItem } from 'src/app/app.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuS21 } from 'src/app/models/venta-cliente.model';

@Component({
  selector: 'app-menu-single',
  templateUrl: './menu-single.component.html',
  styleUrls: ['./menu-single.component.scss']
})
export class MenuSingleComponent implements OnInit {
  private sub: any;
  public menuItem!: MenuS21; 
  public settings: Settings; 
  public quantityCount:number = 1;
  public relatedMenuItems:Array<MenuS21> = [];

  constructor(public appSettings:AppSettings, 
              public appService:AppService, 
              private activatedRoute: ActivatedRoute,  
              public fb: UntypedFormBuilder,
              public snackBar: MatSnackBar) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() { 
    this.sub = this.activatedRoute.params.subscribe(params => {  
      this.getMenuItemById(params['id']); 
    }); 
    this.getRelatedMenuItems();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }  

  public getMenuItemById(id:number){
    const index: number = this.appService.Data.cartList.findIndex(item => item.id == id.toString());
    if(index !== -1){
      this.menuItem = this.appService.Data.cartList[index];
      this.quantityCount = this.menuItem.cartCount;
    } 
    else{
      this.appService.getMenuItemById(id).subscribe(data=>{ 
        this.menuItem = data;  
      });
    } 
  }

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

  public getRelatedMenuItems(){ 
    let data = this.appService.getMenuItems();
    this.relatedMenuItems = this.appService.shuffleArray(data).slice(0, 8); 
  }  

}
