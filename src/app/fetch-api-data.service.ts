import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators'

//Declaring the api url that will providd data for the client app
const apiUrl = 'https://my-flix-2022.herokuapp.com/';

//get auth token stored in local storage
const token = localStorage.getItem('token');

// get username stored in local storage
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  //Inject the HttpClient module to the constructor params
  //This will provide HttpClient to the entire class, making it available via this.http

  constructor(private http: HttpClient) {

  }
  //Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  getOneMovie(title: any): Observable<any> {
    return this.http.get(apiUrl + `movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  getDirector(name: any): Observable<any> {
    return this.http.get(apiUrl + `movies/director/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  getGenre(name: any): Observable<any> {
    return this.http.get(apiUrl + `movies/genre/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }


  getUser(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  getFavMovie(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  addFavMovie(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }


  editUser(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  deleteUser(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }


  deleteFavMovie(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  //non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error has occurted:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later'
    )
  }

}