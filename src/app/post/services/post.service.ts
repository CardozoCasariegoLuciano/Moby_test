import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EditPostData, Post } from '../interfaces/posts.interface';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

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
