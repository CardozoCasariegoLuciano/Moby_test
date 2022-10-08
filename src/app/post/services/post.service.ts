import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewComment } from '../interfaces/posts.interface';
import { Icoment, Ipost } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsURL: string = environment.baseURL;
  subjectNotifier: Subject<null> = new Subject<null>();

  constructor(private http: HttpClient) {}

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

  errorHandler(_err: HttpErrorResponse) {
    return throwError(() => 'Content not found');
  }

  addComment(data: NewComment): void {
    this.http.post(`${this.postsURL}/comments`, data).subscribe();
  }

  editComment(data: NewComment, id: number): void {
    this.http.put(`${this.postsURL}/comments/${id}`, data).subscribe();
  }

  deleteComment(id: number): Observable<Object> {
    return this.http.delete(`${this.postsURL}/comments/${id}`);
  }

  notifyAboutChange() {
    this.subjectNotifier.next(null);
  }
}
