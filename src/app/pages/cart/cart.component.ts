import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; 
// import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { MenuS21 } from 'src/app/models/venta-cliente.model';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public total:any[] = []; 
  public cartItemCount:any[] = [];
  public cartItemCountTotal:number = 0; 
  public currentTotalCartCount:number = 0;
  
  constructor(public appService:AppService, 
    public snackBar: MatSnackBar,
    private menusService: MenusService) { }

  ngOnInit(): void {  
    this.updateCartTotal(); 
  } 

  ngDoCheck(){ 
    if(this.currentTotalCartCount !== this.appService.Data.totalCartCount){ 
      this.updateCartTotal();
      this.currentTotalCartCount = this.appService.Data.totalCartCount;
    }
  }

  public updateCartTotal(){
    this.cartItemCountTotal = 0;
    console.log('this.appService.Data.cartList: ', this.appService.Data.cartList);
    this.appService.Data.cartList.forEach(item=>{
      let price = 0;
      price = parseInt(item.precio); 
      this.total[item.id] = item.cartCount*price; 
      this.cartItemCount[item.id] = item.cartCount;
      this.cartItemCountTotal += item.cartCount;
    });  
  }

  public onQuantityChange(count:number, menuItem:MenuS21){ 
    menuItem.cartCount = count; 
    if(menuItem.cartCount <= menuItem.availibilityCount){  
      let price = 0;
      if(menuItem.discount){
        price = parseInt(menuItem.precio) - (parseInt(menuItem.precio) * (menuItem.discount / 100));
      }
      else{
        price = parseInt(menuItem.precio);
      } 
      this.total[menuItem.id] = count * price;
      this.cartItemCount[menuItem.id] = count;
      this.appService.calculateCartTotal(); 
      this.cartItemCountTotal = 0;
      this.cartItemCount.forEach(value=>{
        this.cartItemCountTotal +=value;
      });       
      this.appService.Data.totalCartCount = this.cartItemCountTotal;
      this.appService.Data.cartList.forEach(item=>{
        this.cartItemCount.forEach((value,index)=>{
          if(item.id == index.toString()){
            item.cartCount = value;
          }
        });
      }); 
    }
    else{
      menuItem.cartCount = menuItem.availibilityCount;
      this.snackBar.open('No puede agregar más elementos de los disponibles. En stock' + menuItem.availibilityCount + ' artículos y ya agregaste' + menuItem.cartCount + ' Artículo a tu carrito', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    } 
   
  }


  public remove(item:MenuS21) {
    const index: number = this.appService.Data.cartList.indexOf(item);
    if (index !== -1) {  
      this.appService.Data.cartList.splice(index, 1); 
      this.appService.calculateCartTotal();       
      this.total.forEach(val => {
        if(val == this.total[item.id]){
          this.total[item.id] = 0;
        }
      }); 
      this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[item.id]; 
      this.appService.Data.totalCartCount = this.cartItemCountTotal;
      this.cartItemCount.forEach(val=>{
        if(val == this.cartItemCount[item.id]){
          this.cartItemCount[item.id] = 0;
        }
      }); 
    }     
  }

  confirmaPedido(){
    // this.appService.Data.cartList
    console.log('this.appService.Data.cartList: ', this.appService.Data.cartList);

    let orden = {
      atencion_id: this.menusService.ventaCliente.idAtencion,
      pedidos: []
    }

    this.appService.Data.cartList.forEach(p=>{
      let pedido = {
        preparacion_id: p.id,
        descripcion: "",
        cantidad: p.cartCount,
      }
      orden.pedidos.push(pedido);
    });

    this.menusService.crearPedido(orden).subscribe((res:any)=>{
      console.log('res: ', res);
      this.clear();
      this.menusService.clearCart();
      this.appService.Data.cartList.length = 0;
      this.appService.Data.totalPrice = 0;
      this.appService.Data.totalCartCount = 0;
    }, err=>{
      console.log('err: ', err);
    });

  }

  public clear(){ 
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
  } 
 

}
