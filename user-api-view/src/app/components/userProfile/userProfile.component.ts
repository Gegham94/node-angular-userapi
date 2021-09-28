import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UserDeletePopupComponent } from '../userDeletePopup/userDeletePopup.component';
import { UserEditPopupComponent } from '../userEditPopup/userEditPopup.component';
import { UserNotVerifiedComponent } from '../userNotVerified/userNotVerified.component';
import { UserEmailVerifyMessageSendPopupComponent } from '../userEmailVerifyMessageSendPopup/userEmailVerifyMessageSendPopup.component';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-userProfile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: any;
  email: any;
  firstName: any;
  lastName: any;
  gender: any;
  possition: any;
  dateOfBirth: any;
  isEmailVerify: any;
  image: any;

  constructor(
    private activateRouter: ActivatedRoute, 
    public usersService : UsersService, 
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.activateRouter.params.subscribe(params => {
      this.usersService.getById(params.id).subscribe((response: any)=>{
        this.id = response.user._id
        this.email = response.user.email;
        this.firstName = response.user.firstName;
        this.lastName = response.user.lastName;
        this.possition = response.user.possition;
        this.gender = response.user.gender;
        this.dateOfBirth = response.user.dateOfBirth;
        this.isEmailVerify = response.user.isEmailVerify;
        this.image = response.user.image;
      }, (error) => {
        console.log('error is ', error);
      });
    });
  }

  openVerifyMessagePopup(){
    this.usersService.sendEmailVerifyMessage(this.email, this.firstName).subscribe((response: any)=>{
      if(response.status == 'done'){
        this.dialog.open(UserEmailVerifyMessageSendPopupComponent,{
          width: '250px'
        })
      }
    }, (error) => {
      console.log('error is ', error);
    });
  }
  openEditPopup(): void {
    if(localStorage.getItem('email_status')=='true'){
      this.dialog.open(UserEditPopupComponent, {
        width: '225px',
        data: {
          id: this.id,
          firstName : this.firstName,
          lastName : this.lastName,
          possition : this.possition,
          gender : this.gender,
          dateOfBirth : this.dateOfBirth,
          image: this.image
        }
      });
    } else{
      this.dialog.open(UserNotVerifiedComponent,{
        width: '250px'
      });
    }
  }
  openDeletePopup(){
    if(localStorage.getItem('email_status')=='true'){
      this.dialog.open(UserDeletePopupComponent, {
        width: '210px',
        data: {
          id: this.id,
        }
      });
    } else {
      this.dialog.open(UserNotVerifiedComponent,{
        width: '250px'
      });
    }
  }
  
}