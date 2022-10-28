import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { EditPostData, Post } from '../interfaces/posts.interface';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Comment, EditCommentData } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: Firestore, private db: AngularFirestore) {}

  getPosts(): Observable<Post[]> {
    return this.db
      .collection('posts', (ref) => {
        return ref.where('isHide', '==', false);
      })
      .valueChanges({ idField: 'id' }) as Observable<Post[]>;
  }

  getPostsByUserID(userID: string): Observable<Post[]> {
    return this.db
      .collection('posts', (ref) => {
        return ref.where('author.id', '==', userID);
      })
      .valueChanges({ idField: 'id' }) as Observable<Post[]>;
  }

  getPostByID(id: string): Observable<Post> {
    return this.db
      .doc(`posts/${id}`)
      .valueChanges({ idField: 'id' }) as Observable<Post>;
  }

  getPostComments(postID: string): Observable<Comment[]> {
    return this.db
      .collection('comments', (ref) => {
        return ref.where('postId', '==', postID);
      })
      .valueChanges({ idField: 'id' }) as Observable<Comment[]>;
  }

  addComment(data: Comment) {
    const commentRef = collection(this.firestore, 'comments');
    addDoc(commentRef, data);
  }

  editComment(_data: EditCommentData, _id: string): void {
    //this.http.put(`${this.postsURL}/comments/${id}`, data).subscribe();
  }

  deleteComment(_id: string): Observable<any> {
    //return this.http.delete(`${this.postsURL}/comments/${id}`);
    return of(true);
  }

  addPost(data: Post) {
    const postsRef = collection(this.firestore, 'posts');
    addDoc(postsRef, data);
  }

  editPost(postID: string, data: EditPostData) {
    let temp!: AngularFirestoreDocument<Post>;
    temp = this.db.doc(`posts/${postID}`);
    temp.update(data);
  }

  deletePost(postID: string) {
    let temp!: AngularFirestoreDocument<Post>;
    temp = this.db.doc(`posts/${postID}`);
    temp.delete();
  }
}
