import { Component, OnInit } from '@angular/core';

import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  UserPossition: any = ['manager', 'developer'];
  UserGender: any = ['male', 'female'];

  constructor(private registerService : RegisterService) {}
  
  form = this.registerService.form;
  onChangeGender = this.registerService.onChangeGender;
  onChangePossition = this.registerService.onChangePossition;

  ngOnInit(): void {}

  submitForm(){
    this.registerService.submitForm().subscribe((response)=>{
      console.log('response is ', response)
    }, (error) => {
        console.log('error is ', error)
    });
  }
}
