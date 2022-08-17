import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Icoment, Ipost } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsURL: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(): Observable<Ipost[]> {
    return this.http
      .get<Ipost[]>(`${this.postsURL}/posts`)
      .pipe(catchError(this.errorHandler));
  }

  getPostByID(id: string): Observable<Ipost> {
    return this.http
      .get<Ipost>(`${this.postsURL}/posts/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getPostComments(id: number): Observable<Icoment[]> {
    return this.http
      .get<Icoment[]>(`${this.postsURL}/comments?postId=${id}`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(err: HttpErrorResponse) {
    return throwError('Content not found');
  }
}
