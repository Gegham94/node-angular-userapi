import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from "@angular/forms";

import { User } from '../../_models/user'
import { UsersService } from '../../services/users.service';

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
    onEditClick(data:any){
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