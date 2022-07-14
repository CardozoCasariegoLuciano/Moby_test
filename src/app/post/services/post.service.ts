import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icoment, Ipost } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsURL: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Ipost[]> {
    return this.http.get<Ipost[]>(`${this.postsURL}/posts`);
  }

  getPostByID(id: string): Observable<Ipost> {
    return this.http.get<Ipost>(`${this.postsURL}/posts/${id}`);
  }

  getPostComments(id: number): Observable<Icoment[]> {
    return this.http.get<Icoment[]>(`${this.postsURL}/comments?postId=${id}`);
  }
}
