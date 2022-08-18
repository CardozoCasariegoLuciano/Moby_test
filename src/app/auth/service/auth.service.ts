import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Iauth } from '../interfaces/auth.interface';
import { IuserLogin } from '../interfaces/login.interface';
import { IuserRegister } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'https://luciano-cardozo-endpoint.herokuapp.com/users';
  private userLogued: Iauth | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  hasSessionActive(): Observable<boolean> {

    const userID = localStorage.getItem("userID")
    if (!userID) {
      return of(false)
    }

    return this.http.get<Iauth>(`${this.baseURL}/${userID}`)
      .pipe(
        map(auth => {
          this.userLogued = auth;
          return true
        })
      )
  }

  get getUserLogued() {
    //console.log("getter: ",this.userLogued)
    return { ...this.userLogued };
  }

  login(data: IuserLogin) {
    return this.http.get<Iauth[]>(`${this.baseURL}?email=${data.email}`).pipe(
      map((user) => {
        if (this.isValidLogin(user, data.password)) {
          this.userLogued = user[0];
          localStorage.setItem('userID', user[0].id.toString());
          this.router.navigate(['/posts']);
          return true;
        }
        return false;
      }),
    );
  }

  isValidLogin(user: Iauth[], pass: string): boolean {
    if (user.length === 0) return false;
    if (user[0].password != pass) return false;

    return true;
  }

  register(data: IuserRegister) {
    return this.http.get<Iauth[]>(`${this.baseURL}?email=${data.email}`).pipe(
      map((user) => {
        if (user.length === 0) {
          this.registerUser(data).subscribe();
          return true;
        } else {
          return false;
        }
      }),
    );
  }

  registerUser(data: IuserRegister) {
    return this.http.post<Iauth>(`${this.baseURL}`, data).pipe(
      tap((user) => {
        this.userLogued = user;
        localStorage.setItem('userID', user.id.toString());
        this.router.navigate(['/posts']);
      }),
    );
  }

  logOut() {
    localStorage.removeItem('userID');
    this.userLogued = undefined;
    this.router.navigate(['/auth/login']);
  }


  editUser(data: Iauth) {
    return this.http.patch<Iauth>(`${this.baseURL}/${data.id}`, data).pipe(
      tap(user => {
        this.userLogued = user;
      })
    )
  }
}
