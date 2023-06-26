import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { AppSettings, Settings } from "src/app/app.settings";
import { MenusService } from "src/app/services/menus.service";


@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {

    public settings: Settings;
    constructor(
        public menuService: MenusService,
        public appSettings:AppSettings, 
        public router:Router,
        private auth: AuthService
            
    ) { 
        this.settings = this.appSettings.settings;
    }

    ngOnInit(): void {
        console.log("ClientComponent");
        this.getMesas();
    }


    getMesas(){
        this.menuService.getMesas().subscribe((res:any)=>{
            console.log('res: ', res);
        });
    }

    cancelar(){
        this.auth.logout({ logoutParams: { returnTo: document.location.origin } })
    }

    ngAfterViewInit(){
        document.getElementById('preloader')?.classList.add('hide');
    }

    public getDemo(number:number){
        if(number == 1){
          this.settings.toolbar = 1;
          this.settings.header = 'default';
          this.settings.theme = 'red';
          this.settings.rtl = false;
        }
        if(number == 2){
          this.settings.toolbar = 1;
          this.settings.header = 'image';
          this.settings.theme = 'red';
          this.settings.rtl = false;
        }
        if(number == 3){
          this.settings.toolbar = 1;
          this.settings.header = 'carousel';
          this.settings.theme = 'red';
          this.settings.rtl = false;
        }
        if(number == 4){
          this.settings.toolbar = 1;
          this.settings.header = 'video';
          this.settings.theme = 'red';
          this.settings.rtl = false;
        } 
        if(number == 5){
          this.settings.toolbar = 1;
          this.settings.header = 'carousel';
          this.settings.theme = 'orange-dark';
          this.settings.rtl = false;
        }
        if(number == 6){
          this.settings.toolbar = 1;
          this.settings.header = 'default';
          this.settings.theme = 'red';
          this.settings.rtl = true;
        }
        this.router.navigate(['/']);
      }
    
      public getSkin(num:number){
        if(num == 1){
          this.settings.theme = 'red';
          this.settings.header = "carousel";
        }
        if(num == 2){ 
          this.settings.theme = 'blue';
          this.settings.header = "carousel";
        }
        if(num == 3){
          this.settings.theme = 'green';
          this.settings.header = "carousel";
        } 
        if(num == 4){
          this.settings.theme = 'pink';
          this.settings.header = "carousel";
        }
        if(num == 5){
          this.settings.theme = 'purple';
          this.settings.header = "carousel";
        }
        if(num == 6){
          this.settings.theme = 'grey';
          this.settings.header = "carousel";
    
        }
        this.settings.toolbar = 1;
        this.settings.rtl = false;
        
        this.router.navigate(['/']);
      }
    
    
      public scrollToDemos() {
        var elmnt = document.getElementById("demos");
        if(elmnt)
          elmnt.scrollIntoView({behavior: "smooth"});
      }
      public goToTop(){
        var elmnt = document.getElementById("top");
        if(elmnt)
          elmnt.scrollIntoView({behavior: "smooth"});
      }
    
    
    
    
}