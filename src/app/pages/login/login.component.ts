import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router'; 
import { AppSettings, Settings } from 'src/app/app.settings';
import { LoginResponse } from 'src/app/interfaces/auth.interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: UntypedFormGroup;
  public hide = true;
  public bgImage:any;
  public settings: Settings;
  constructor(
    public fb: UntypedFormBuilder, 
    public router:Router, 
    private sanitizer:DomSanitizer, 
    public appSettings:AppSettings,
    private auth: AuthService
    ) { 
    this.settings = this.appSettings.settings; 
  }
  loader: boolean = false;
  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/login.jpg)');
    this.loginForm = this.fb.group({
      email: ['email@mail.cl', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['poiuytrewq0987654321', Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
  }

  public onLoginFormSubmit():void {
    if (this.loginForm.valid) {
      this.loader = true;
      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value).subscribe((resp: LoginResponse) => {
        if (resp.ok === true) {
          // Swal.fire(` ${resp.data.fullName}`, 'Bienvenido Siglo a 21', 'success');
          console.log(resp);
          this.loader = false;
          this.redirect(this.auth.usuario.profile);
          // this.router.navigate(['/']);
        }else{
          this.loader = false;
          let error: string = resp.message;
          // Swal.fire('Error',error, 'error');
        }
      });
    }
  }

  redirect(perfil){
    console.log('perfil: ', perfil);
    switch (perfil) {
      case 'Administrador':
        // this.router.navigateByUrl('/admin');
        this.router.navigate(['/admin']);
        break;
      case 'Cliente':
        this.router.navigate(['/']);
        break;
      default:
        break;
    }
  }
}
