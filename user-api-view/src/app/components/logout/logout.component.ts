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
  constructor(private appComponent: AppComponent, private router: Router) {
    this.isUserLoggedIn = appComponent.isUserLoggedIn;
  }

  ngOnInit(): void {
    this.appComponent.isUserLoggedIn = false;
    localStorage.removeItem('access_token');
    this.router.navigate(['users-api/login']);
  }
}
