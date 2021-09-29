import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isUserLoggedIn!: boolean;
  title!: string;
  userId: any;

  constructor(){
    if(localStorage.getItem('access_token')){
      this.isUserLoggedIn = true;
      this.title = 'Welcome';
    }else{
      this.isUserLoggedIn = false;
      this.title = 'User APP';
    }
  }
}
