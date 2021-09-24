import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isUserLoggedIn!: boolean;
  title!: string;

  constructor(){
    if(localStorage.getItem('access_token')){
      this.isUserLoggedIn = true;
      this.title = 'Users list';
    }else{
      this.isUserLoggedIn = false;
      this.title = 'User APP';
    }
  }
}
