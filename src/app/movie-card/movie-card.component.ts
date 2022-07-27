import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { DirectorComponent } from '../director/director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  currentUser: any = null
  currentFavs: any[] = [];

  /**
   * 
   * @param fetchApiData 
   * @param snackBar 
   * @param dialog 
   */

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.currentUser = resp.Username;
      this.currentFavs = resp.FavoriteMovies;
    })
  }

  isFav(id: string): boolean {
    return this.currentFavs.includes(id)
  }

  openDirectorDialog(name: string, bio: string, Birth: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: Birth,
      },
      width: '400px'
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: Name,
        Description: Description
      },
      width: '400px'
    })
  }

  openSynopsisDialog(Title: string, Description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: Title,
        Description: Description,
      },
      width: '400px'
    })
  }

  addFavMovie(id: string): void {
    console.log(id);
    this.fetchApiData.addFavMovie(id).subscribe((result) => {
      this.snackBar.open('Movie has been added to your Favorites List')
      console.log(result);
      this.ngOnInit();
      window.location.reload();
    })
  }

  removeFavMovie(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit;
      window.location.reload();
    })
  }

}
