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
  title!: string;
  
  constructor(private appComponent: AppComponent, private router: Router) {
    this.isUserLoggedIn = appComponent.isUserLoggedIn;
    this.title = appComponent.title;
  }

  ngOnInit(): void {
    localStorage.removeItem('access_token');
    this.appComponent.isUserLoggedIn = false;
    this.router.navigate(['users-api/login']);
  }
}
