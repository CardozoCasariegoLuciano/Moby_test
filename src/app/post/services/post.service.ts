import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { NewPost } from '../interfaces/posts.interface';
import { Icoment, Ipost } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsURL: string = 'https://luciano-cardozo-endpoint.herokuapp.com';

  subjectNotifier: Subject<null> = new Subject<null>();

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

  addComment(data: NewPost) {
    return this.http.post(`${this.postsURL}/comments`, data);
  }

  editComment(data: NewPost, id: number) {
    return this.http.put(`${this.postsURL}/comments/${id}`, data);
  }

  deleteComment(id: number) {
    return this.http.delete(`${this.postsURL}/comments/${id}`);
  }

  notifyAboutChange() {
    this.subjectNotifier.next(null);
  }
}
