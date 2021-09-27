import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router ) { }

  canActivate(): Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('access_token')) {
      return true;
    }
    localStorage.removeItem('access_token');
    this.router.navigate(['users-api/login']);
    return false;
  }
}
