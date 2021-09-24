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

  // public access_token: any;
  // public email_status: any;

  constructor(private appComponent: AppComponent, public loginService : LoginService, private router: Router) { }

  ngOnInit(): void {}

  submitForm(){
    this.loginService.sendData().subscribe((response: any)=>{
      if(response.status == 'fail') return console.log(response.message);

      localStorage.setItem('access_token', response.token);

      // this.access_token = `access_token_${response.user_key}`;
      // this.email_status = `email_status_${response.email_status}`
      
      // localStorage.setItem(this.access_token, response.token);
      // localStorage.setItem(this.email_status, response.email_status);

      this.appComponent.isUserLoggedIn = true;
      this.appComponent.title = 'Users list';
      
      this.router.navigate(['users-api/list']);
      this.loginService.form.reset();

    }, (error) => {
        console.log('error is ', error);
    });
  }
}
