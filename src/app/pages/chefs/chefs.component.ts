import { Component, OnInit } from '@angular/core';
// import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { MenuS21 } from 'src/app/models/venta-cliente.model';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss']
})
export class ChefsComponent implements OnInit {
  public chefs:any;
  public menuItems: MenuS21[] = [];
  constructor(public appService:AppService) { }

  ngOnInit() {
    this.chefs = this.appService.getChefs();
    this.getMenuItems();
  }

  public getMenuItems(){
    let data = this.appService.getMenuItems();
    this.menuItems = this.appService.shuffleArray(data).slice(0, 8); 
  } 

}
