import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from "@angular/forms";

import { User } from '../../_models/user'
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  email: any;
  firstName: any;
  lastName: any;
  gender: any;
  possition: any;
  dateOfBirth: any;
  image: any;

  user : any;

  constructor(
    private activateRouter: ActivatedRoute, 
    public usersService : UsersService, 
    private router: Router,
    public dialog: MatDialog
  ) 
  { }

  ngOnInit(): void {
    this.activateRouter.params.subscribe(params => {
      this.usersService.getById(params.id).subscribe((response: any)=>{
        
        this.user = response.user;

        this.email = this.user.email;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.possition = this.user.possition;
        this.gender = this.user.gender;
        this.dateOfBirth = this.user.dateOfBirth;
        this.image = this.user.image;
        
      }, (error) => {
        console.log('error is ', error);
      });
    });
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(UserPopupComponent, {
      width: '250px',
      data: {
        firstName : this.user.firstName,
        lastName : this.user.lastName,
        possition : this.user.possition,
        gender : this.user.gender,
        dateOfBirth : this.user.dateOfBirth
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.usersService.update(this.user._id, result).subscribe((response: any)=>{
        console.log(response);
      }, (error) => {
        console.log('error is ', error);
      });
    
    });
  }

  deleteUser(){
    this.usersService.delete(this.user._id).subscribe((response: any)=>{
      if(response.status == 'fail') console.log(response.message);
      if(response.status == 'done') this.router.navigate(['users-api/list']);
    }, (error) => {
      console.log('error is ', error);
    });
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './userpopup.component.html',
})
export class UserPopupComponent {

  UserPossition: any = ['Manager', 'Developer'];
  UserGender: any = ['Male', 'Female'];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      gender: [''],
      possition: [''],
      dateOfBirth: [''],
      image: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
