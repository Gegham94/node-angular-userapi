import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  userId:any;
  accessToken:any;

  constructor(private router: Router, public loginComponent: LoginComponent ) 
  { 
    if (this.loginComponent.userId) this.userId = this.loginComponent.userId;
    this.accessToken = localStorage.getItem('access_token');
  }

  canActivate(): Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accessToken!=undefined && this.accessToken!=null) {
      this.router.navigate(['users-api/profile', this.userId]);
      return false;
    }else{
      localStorage.removeItem('access_token');
      localStorage.removeItem('email_status');
      return true;
    }
  }
}
