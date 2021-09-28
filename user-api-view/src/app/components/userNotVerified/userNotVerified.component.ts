import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-userNotVerifiedComponent',
    templateUrl: './userNotVerified.component.html',
  })
  export class UserNotVerifiedComponent {
    constructor(
      public dialogRef: MatDialogRef<UserNotVerifiedComponent>,
    ) {}
    onCloseClick() {
      this.dialogRef.close();
    }
  }