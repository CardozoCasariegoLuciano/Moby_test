import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Comment, EditCommentData } from '../interfaces/comment.interface';
import { ShortUser, User } from 'src/app/auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private firestore: Firestore, private db: AngularFirestore) {}

  getCommentsByPostID(postID: string): Observable<Comment[]> {
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
