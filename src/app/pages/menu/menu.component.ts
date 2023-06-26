import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, map } from 'rxjs/operators';
import {  Pagination } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { AppSettings, Settings } from 'src/app/app.settings';
import { MenuItemImageS21, MenuS21 } from 'src/app/models/venta-cliente.model';
import { MenusService } from 'src/app/services/menus.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = false;
  public showSidenavToggle:boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public menuItems: MenuS21[] = [];
  public categories:any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public count: number = 12;
  public sort: string = '';
  public selectedCategoryId:number = 0;
  public pagination:Pagination = new Pagination(1, this.count, null, 2, 0, 0); 
  public message:string | null = '';
  public watcher: Subscription;
  public settings: Settings;
  public listaMenu: string = '';

  menuItemsS21: MenuS21[] = [];

  constructor(public appSettings:AppSettings, 
    public appService:AppService, 
    public mediaObserver: MediaObserver,
    private menuServices: MenusService) {
    this.settings = this.appSettings.settings; 
    this.watcher = mediaObserver.asObservable()
    .pipe(filter((changes: MediaChange[]) => changes.length > 0), map((changes: MediaChange[]) => changes[0]))
    .subscribe((change: MediaChange) => {
      if(change.mqAlias == 'xs') {
        this.sidenavOpen = false;
        this.showSidenavToggle = true;
        this.viewCol = 100;
      }
      else if(change.mqAlias == 'sm'){
        this.sidenavOpen = false;
        this.showSidenavToggle = true;
        this.viewCol = 50;
      }
      else if(change.mqAlias == 'md'){
        this.sidenavOpen = false;
        this.showSidenavToggle = false;
        this.viewCol = 33.3;
      }
      else{
        this.sidenavOpen = false;
        this.showSidenavToggle = false;
        this.viewCol = 25;
      }
    });


  }

  ngOnInit(): void {
    this.getCategories();
    this.getMenuItems();
    this.getMenus();
  }

  getMenus(){
    this.menuServices.getMenus().subscribe((menu: any) => {
      if(menu.status == 'success'){
        console.log('Menús: ', menu);
        this.menuItemsS21 = menu.data;
        this.menuItemsS21.forEach(m => {
          m.imagen = JSON.parse(m.imagen.toString().replaceAll('\\',''));
          if(m.imagen === null){
            m.imagen = {
              small: 'assets/images/foods/no-imagen/no-imagen.jpg',
              medium:'assets/images/foods/no-imagen/no-imagen.jpg',
              big:'assets/images/foods/no-imagen/no-imagen.jpg',
            }
          }
          switch (m.categoria.toUpperCase()) {
            case "DESAYUNOS":
              m.categoryId = 1;
              break;
            case "APERITIVOS":
              m.categoryId = 2;
              break;
            case "POSTRES":
              m.categoryId = 7;
              break;
            case "ENSALADAS":
                m.categoryId = 3;
              break;
          }
          m.availibilityCount = parseInt(m.total_productos);
        });
        console.log('Menús: ', this.menuItemsS21);
        this.menuServices.menus = this.menuItemsS21;
        this.menuServices.ventaCliente.orden = this.menuItemsS21;
        this.menuServices.saveVentaClienteLocalStorage();
      }
    });
  }

  ngOnDestroy(){ 
    this.watcher.unsubscribe();
  }

  public getCategories(){
    this.appService.getCategories().subscribe(categories=>{
      this.categories = categories;
      this.appService.Data.categories = categories;
    })
  } 
  public selectCategory(id:number){
    this.selectedCategoryId = id;
    this.menuItems.length = 0;
    this.resetPagination();
    this.getMenuItems();
    this.sidenav.close();
  }
  public onChangeCategory(event:any){ 
    this.selectCategory(event.value);
  }

  public getMenuItems(){
    // this.menuItems = this.appService.shuffleArray(data);
    // this.menuItems = data;
    let data = this.appService.getMenuItems();
    let result = this.filterData(data); 
    if(result.data.length == 0){
      this.menuItems.length = 0;
      this.pagination = new Pagination(1, this.count, null, 2, 0, 0);  
      this.message = 'Ho se encontraron resultados'; 
    } 
    else{
      this.menuItems = result.data; 
      this.pagination = result.pagination;
      this.message = null;
    } 
  }  

  public resetPagination(){ 
    if(this.paginator){
      this.paginator.pageIndex = 0;
    }
    this.pagination = new Pagination(1, this.count, null, null, this.pagination.total, this.pagination.totalPages);
  }

  public filterData(data:any){
    return this.appService.filterData(data, this.selectedCategoryId, this.sort, this.pagination.page, this.pagination.perPage);
  }
  // public filterData(data){
  //   return this.appService.filterData(data, this.searchFields, this.sort, this.pagination.page, this.pagination.perPage);
  // }

  public changeCount(count:number){
    this.count = count;   
    this.menuItems.length = 0;
    this.resetPagination();
    this.getMenuItems();
  }
  public changeSorting(sort:any){    
    this.sort = sort; 
    this.menuItems.length = 0;
    this.getMenuItems();
  }
  public changeViewType(obj:any){ 
    this.viewType = obj.viewType;
    this.viewCol = obj.viewCol; 
  } 


  public onPageChange(e:any){ 
    this.pagination.page = e.pageIndex + 1;
    this.getMenuItems();
    window.scrollTo(0,0);  
  }

} 