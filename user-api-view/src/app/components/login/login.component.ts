import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginService : LoginService, private router: Router) { }

  ngOnInit(): void {}

  submitForm(){
    this.loginService.submitForm().subscribe((response)=>{
      console.log('response is ', response);
      this.router.navigate(['/users-api/list']);
    }, (error) => {
        console.log('error is ', error)
    });
  }
}
