import { Component, OnInit, Input } from '@angular/core';

//you'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//this import brings in the API calls 
import { UserRegistrationService } from '../fetch-api-data.service';

//this import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials = { Username: '', Password: '' }

  /**
   * 
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   * @param router 
   */

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  //this is the function responsible for logging in user
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((result) => {
      this.dialogRef.close(); //this will close the modal on success
      console.log(result);
      //logic for a successful login goes here
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);

      // this.snackBar.open('User successfully logged in', 'OK', {
      //   duration: 2000
      // });
      //once log in is successful, route to movies page
      this.router.navigate(['movies']);
    }, (result) => {
      console.log(result)
      this.snackBar.open('User Login failed', 'OK', {
        duration: 2000
      });
    });
  }

}
