import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  UserPossition: any = ['Manager', 'Developer'];
  UserGender: any = ['Male', 'Female'];
  yyyy: any;

  constructor(private appComponent: AppComponent, public registerService : RegisterService, private router: Router) {}

  ngOnInit(): void {
    let today = new Date();
    this.yyyy = today.getFullYear()-8;
  }

  submitForm(){
    this.registerService.sendData().subscribe((response: any)=>{
      if(response.status == 'fail') return console.log(response.message);
      
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('email_status', response.email_status)

      this.appComponent.isUserLoggedIn = true;
      this.appComponent.title = 'Welcome';
      
      this.router.navigate(['users-api/list']);
      this.registerService.form.reset();

    }, (error) => {
        console.log('error is ', error)
    });
  }
}
