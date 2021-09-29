import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  accessToken:any;

  constructor(private router: Router ) 
  {
    this.accessToken = localStorage.getItem('access_token');
   }

  canActivate(): Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accessToken && this.accessToken!=undefined && this.accessToken!=null) {
      return true;
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('email_status');
    this.router.navigate(['users-api/login']);
    return false;
  }
}
