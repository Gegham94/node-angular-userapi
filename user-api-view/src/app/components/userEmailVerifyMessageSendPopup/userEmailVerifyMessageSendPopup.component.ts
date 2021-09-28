import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-userEmailVerifyMessageSendPopupComponent',
    templateUrl: './userEmailVerifyMessageSendPopup.component.html',
  })
  export class UserEmailVerifyMessageSendPopupComponent {
    constructor(
      public dialogRef: MatDialogRef<UserEmailVerifyMessageSendPopupComponent>,
    ) {}
    onCloseClick() {
      this.dialogRef.close();
    }
  }