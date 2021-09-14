import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  UserPossition: any = ['Manager', 'Developer'];
  UserGender: any = ['Male', 'Female'];

  constructor(public registerService : RegisterService, private router: Router) {}

  ngOnInit(): void {}

  submitForm(){
    this.registerService.submitForm().subscribe((response)=>{
      console.log('response is ', response);
      this.router.navigate(['/users-api/list']);
    }, (error) => {
        console.log('error is ', error)
    });
  }
}
