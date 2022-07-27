import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators'

//Declaring the api url that will providd data for the client app
const apiUrl = 'https://my-flix-2022.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  //Inject the HttpClient module to the constructor params
  //This will provide HttpClient to the entire class, making it available via this.http

  /**
   * 
   * @param http 
   */

  constructor(private http: HttpClient) { }

  //Making the api call for the user registration endpoint
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userCredentials: any): Observable<any> {
    console.log(userCredentials);
    return this.http.post(apiUrl + 'login', userCredentials).pipe(
      catchError(this.handleError)
    );
  }


  getAllMovies(): Observable<any> {
    //get auth token stored in local storage
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  getOneMovie(title: any): Observable<any> {
    //get auth token stored in local storage
    const token = localStorage.getItem('token');
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
    //get auth token stored in local storage
    const token = localStorage.getItem('token');
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
    //get auth token stored in local storage
    const token = localStorage.getItem('token');
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


  getUser(user: any): Observable<any> {
    //get auth token stored in local storage
    const token = localStorage.getItem('token');
    // get username stored in local storage
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${user}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  getFavMovies(movieID: string): Observable<any> {
    //get auth token stored in local storage
    const token = localStorage.getItem('token');
    // get username stored in local storage
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}/movies/${movieID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  addFavMovie(movieID: string): Observable<any> {
    //get auth token stored in local storage
    const token = localStorage.getItem('token');
    // get username stored in local storage
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/movies/${movieID}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }


  deleteFavMovie(movieID: string): Observable<any> {
    //get auth token stored in local storage
    const token = localStorage.getItem('token');
    // get username stored in local storage
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }


  editUser(updateDetails: any): Observable<any> {
    //get auth token stored in local storage
    const token = localStorage.getItem('token');
    // get username stored in local storage
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, updateDetails, {
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
    //get auth token stored in local storage
    const token = localStorage.getItem('token');
    // get username stored in local storage
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}`, {
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
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error has occurred:', error.error.message);
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