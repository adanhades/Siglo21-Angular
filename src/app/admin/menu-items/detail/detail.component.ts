import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service'; 
import { MenuS21 } from 'src/app/models/venta-cliente.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private sub: any;
  public menuItem!: MenuS21;
  constructor(public appService:AppService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe(params => {  
      if(params['id']){
        this.getMenuItemById(params['id']); 
      } 
      else{
        this.getMenuItemById(20); 
      }
    }); 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  public getCategories(){
    if(!this.appService.Data.categories.length){
      this.appService.getCategories().subscribe(categories=>{ 
        this.appService.Data.categories = categories;
      });
    } 
  } 

  public getMenuItemById(id:number){ 
    this.appService.getMenuItemById(id).subscribe(data=>{ 
      this.menuItem = data;  
    }); 
  }

}
