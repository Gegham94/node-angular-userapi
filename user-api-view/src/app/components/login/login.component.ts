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

  constructor(
    private appComponent: AppComponent, 
    public loginService : LoginService, 
    private router: Router,
    ) { }

  ngOnInit(): void {}

  submitForm(){
    this.loginService.sendData().subscribe((response: any)=>{
      if(response.status == 'fail') return console.log(response.message);

      localStorage.setItem('access_token', response.token);
      localStorage.setItem('email_status', response.email_status)

      this.appComponent.isUserLoggedIn = true;
      this.appComponent.title = 'Welcome';
      
      this.router.navigate(['users-api/list']);
      this.loginService.form.reset();

    }, (error) => {
        console.log('error is ', error);
    });
  }
}
