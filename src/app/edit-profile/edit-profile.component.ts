import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = {};


  @Input() userData: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      localStorage.setItem('user', result.Username);
      console.log(result);
      this.snackBar.open('Successfully updated your profile!', 'OK', {
        duration: 2000
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

}
