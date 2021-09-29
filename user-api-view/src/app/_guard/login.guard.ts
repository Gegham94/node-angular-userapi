import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  accessToken:any;

  constructor(private router: Router, public appComponent: AppComponent ) 
  { 
    this.accessToken = localStorage.getItem('access_token');
  }

  canActivate(): Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accessToken && this.accessToken!=undefined && this.accessToken!=null) {
      this.router.navigate(['users-api/list']);
      return false;
    }else{
      localStorage.removeItem('access_token');
      localStorage.removeItem('email_status');
      return true;
    }
  }
}
