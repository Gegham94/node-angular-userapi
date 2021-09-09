import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  User: any = ['Manager', 'Developer'];

  constructor(private registerService : RegisterService) { }

  ngOnInit(): void {}

  getRegisterData(){
    this.registerService.getAPIData().subscribe((response)=>{
      console.log('response is ', response)
    }, (error) => {
        console.log('error is ', error)
    });
  }
}
