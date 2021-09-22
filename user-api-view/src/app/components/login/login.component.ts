import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../../app.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appComponent: AppComponent, public loginService : LoginService, private router: Router) { }

  ngOnInit(): void {}

  submitForm(){
    this.loginService.sendData().subscribe((response: any)=>{
      localStorage.setItem('access_token', response.token);

      this.appComponent.isUserLoggedIn = true;
      this.appComponent.title = 'Users list';
      
      this.router.navigate(['users-api/list']);
      this.loginService.form.reset();

    }, (error) => {
        console.log('error is ', error);
    });
  }
}
