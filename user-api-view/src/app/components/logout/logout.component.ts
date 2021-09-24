import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-logout',
  templateUrl: '../../app.component.html',
  styleUrls: ['../../app.component.css']
})
export class LogoutComponent implements OnInit {

  isUserLoggedIn!: boolean;
  title: string = 'User APP';
  
  constructor(private appComponent: AppComponent, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('email_status');
    this.appComponent.isUserLoggedIn = false;
    this.appComponent.title = this.title;
    this.router.navigate(['users-api/login']);
  }
}
