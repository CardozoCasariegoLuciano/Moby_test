import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { EditPostData, Post } from '../interfaces/posts.interface';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Comment, EditCommentData } from '../interfaces/comment.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ShortUser, User } from 'src/app/auth/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private db: AngularFirestore
  ) {}

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
        return ref.where('postId', '==', postID).where('isHide', '==', false);
      })
      .valueChanges({ idField: 'id' }) as Observable<Comment[]>;
  }

  addComment(data: Comment) {
    const commentRef = collection(this.firestore, 'comments');
    addDoc(commentRef, data);
  }

  editComment(id: string, data: EditCommentData): void {
    let temp!: AngularFirestoreDocument<Comment>;
    temp = this.db.doc(`comments/${id}`);
    temp.update(data);
  }

  deleteComment(id: string) {
    let temp!: AngularFirestoreDocument<Comment>;
    temp = this.db.doc(`comments/${id}`);
    temp.delete();
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

  toogleLike(comment: Comment, userLoged: User) {
    const likes: ShortUser[] = comment.likes;
    if (!(likes.filter((e) => e.id === userLoged.id).length > 0)) {
      const newLike: ShortUser = {
        id: userLoged.id,
        photo: userLoged.photo,
        userName: userLoged.userName,
      };
      likes.push(newLike);
    } else {
      const likeIndex = likes.findIndex((like) => like.id === userLoged.id);
      likes.splice(likeIndex, 1);
    }
    const data: EditCommentData = {
      likes,
    };

    let temp!: AngularFirestoreDocument<Comment>;
    temp = this.db.doc(`comments/${comment.id}`);
    temp.update(data);
  }
  
}
