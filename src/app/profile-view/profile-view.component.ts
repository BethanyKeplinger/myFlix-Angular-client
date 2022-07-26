import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRegistrationService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Router } from '@angular/router';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any = []
  displayElement: boolean = false

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUser();

  }

  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp) => {
        this.user = resp;
        this.fetchApiData.getAllMovies().subscribe((resp) => {
          this.movies = resp;
          this.movies.forEach((movie: any) => {
            if (this.user.FavoriteMovies.includes(movie._id)) {
              this.favoriteMovies.push(movie);
              this.displayElement = true;
            }
          })
        })

      })
    }
  }

  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent), {
      width: "350px"
    }
  }

  deleteProfile(): void {
    if (confirm("Clicking this button will delete your account. Are you sure you would like to proceed?")) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      })
    }
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

