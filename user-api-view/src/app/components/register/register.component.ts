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

  constructor(private appComponent: AppComponent, public registerService : RegisterService, private router: Router) {}

  ngOnInit(): void {}

  submitForm(){
    this.registerService.sendData().subscribe((response: any)=>{
      console.log(2222222, response, response.token);
      
      localStorage.setItem('access_token', response.token);

      this.appComponent.isUserLoggedIn = true;
      this.appComponent.title = 'Users list';
      
      this.router.navigate(['users-api/list']);
      this.registerService.form.reset();

    }, (error) => {
        console.log('error is ', error)
    });
  }
}
