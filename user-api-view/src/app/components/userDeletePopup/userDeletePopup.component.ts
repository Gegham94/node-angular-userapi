import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User } from '../../_models/user'
import { UsersService } from '../../services/users.service';

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