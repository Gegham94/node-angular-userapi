import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from "@angular/forms";

import { User } from '../../_models/user'
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id: any;
  email: any;
  firstName: any;
  lastName: any;
  gender: any;
  possition: any;
  dateOfBirth: any;
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
        this.image = response.user.image;
        
      }, (error) => {
        console.log('error is ', error);
      });
    });
  }

  openEditPopup(): void {
    if(localStorage.getItem('access_token')=='true'){
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
    if(localStorage.getItem('access_token')=='true'){
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

@Component({
  selector: 'app-userNotVerifiedComponent',
  templateUrl: './userNotVerified.component.html',
})
export class UserNotVerifiedComponent {
  constructor(
    public dialogRef: MatDialogRef<UserEditPopupComponent>,
  ) {}
  onCloseClick() {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-userEditPopup',
  templateUrl: './userEditPopup.component.html',
})
export class UserEditPopupComponent {

  UserPossition: any = ['Manager', 'Developer'];
  UserGender: any = ['Male', 'Female'];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public fb: FormBuilder,
    public usersService : UsersService,
  ) {

    this.form = this.fb.group({
      gender: [''],
      possition: [''],
    });
  }
  onChangeGender(event: any) {
    this.form.get("gender")?.setValue((event.source.selected.viewValue).toLowerCase());
  }
  onChangePossition(event: any) {
    this.form.get("possition")?.setValue((event.source.selected.viewValue).toLowerCase());
  }
  onOkClick(data:any){
    this.usersService.update(data.id, data).subscribe((response: any)=>{
    this.dialogRef.close();
    }, (error) => {
      console.log('error is ', error);
    });
  }
  onCancelClick() {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-userDeletePopup',
  templateUrl: './userDeletePopup.component.html',
})
export class UserDeletePopupComponent {

  constructor(
    public dialogRef: MatDialogRef<UserDeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public usersService : UsersService,
    private router: Router,
  ) {}
  onDeletelClick() {
    this.usersService.delete(this.data.id).subscribe((response: any)=>{
      if(response.status == 'fail') console.log(response.message);
      if(response.status == 'done') this.router.navigate(['users-api/list']);
      this.dialogRef.close();
    }, (error) => {
      console.log('error is ', error);
    });
  }
  onCancelClick() {
    this.dialogRef.close();
  }
}
