import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewComment } from '../interfaces/comment.interface';
import { Post } from '../interfaces/posts.interface';
import { Icoment, Ipost } from '../interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsURL: string = environment.baseURL;
  subjectNotifier: Subject<null> = new Subject<null>();

  constructor(
    private http: HttpClient,
    private firestore: Firestore,
    private db: AngularFirestore
  ) {}

  getPosts(): Observable<Post[]> {
    const postRef = collection(this.firestore, 'posts');
    return collectionData(postRef, { idField: 'id' }) as Observable<Post[]>;
  }

  getPostsByUserID(userID: string) {
    return this.db
      .collection('posts', (ref) => {
        return ref.where('author.id', '==', userID);
      })
      .valueChanges({idField: 'id'});
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

  addPost(data: Post) {
    const postsRef = collection(this.firestore, 'posts');
    return addDoc(postsRef, data);
  }

  editPost(data: Post, postID: string) {}
}
