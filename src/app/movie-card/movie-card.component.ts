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

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavMovies(id: string): void {
    this.fetchApiData.getFavMovies(id).subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id)
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
      console.log(result);
      this.ngOnInit();
    })
  }

  removeFavMovie(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit;
    })
  }

}
