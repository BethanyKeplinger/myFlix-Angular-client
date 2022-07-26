import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  //navigates to list of movies 
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  //navigates to users profile 
  goToProflie(): void {
    this.router.navigate(['profile']);
  }

  //clears token and user from local storage and logs out user
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome'])
  }

}
