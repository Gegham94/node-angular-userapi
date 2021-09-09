import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }

  getLoginData(){
    this.loginService.getAPIData().subscribe((response)=>{
      console.log('response is ', response)
    }, (error) => {
        console.log('error is ', error)
    });
  }
}
