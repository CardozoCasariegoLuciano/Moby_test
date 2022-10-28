import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { EditUser, User } from '../interfaces/auth.interface';
import { FireAuth, IuserRegister } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean = false;

  private userSingin: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);

  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore,
    private db: AngularFirestore
  ) {
    this.getStorage();
    this.setIsLogued();
  }

  private setIsLogued() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  private getStorage() {
    const user = localStorage.getItem('userLogued');
    if (user) {
      this.userSingin.next(JSON.parse(user) as User);
    }
  }

  get getUserLogued() {
    return this.userSingin;
  }

  updateUserLoged(user: User | undefined) {
    this.userSingin.next(user);
  }

  editUser(data: EditUser, userID: string, userEmail: string) {
    let temp!: AngularFirestoreDocument<User>;
    temp = this.db.doc(`users/${userID}`);
    temp.update(data);

    this.setStorage(userEmail, false);
  }

  fireRegister(data: FireAuth) {
    return createUserWithEmailAndPassword(this.auth, data.email, data.password);
  }

  fireLogIn(data: FireAuth) {
    return signInWithEmailAndPassword(this.auth, data.email, data.password);
  }

  fireLogOut() {
    signOut(this.auth)
      .then(() => {
        localStorage.removeItem('userLogued');
        this.updateUserLoged(undefined);
        this.router.navigate(['/auth']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  prepare(data: IuserRegister) {
    const email = this.saveUserData(data);
    this.setStorage(email);
  }

  saveUserData(data: IuserRegister) {
    const user: User = {
      fullName: data.name,
      userName: data.username,
      email: data.email,
      role: 'USER',
      photo: data.photo,
      birthDate: data.birthDate.toString(),
      ubication: { lat: '', lng: '' },
    };
    const userRef = collection(this.firestore, 'users');
    addDoc(userRef, user);
    return data.email;
  }

  setStorage(email: string, redirect: boolean = true) {
    return this.db
      .collection('users', (ref) => ref.where('email', '==', email))
      .valueChanges({ idField: 'id' })
      .subscribe((val) => {
        localStorage.setItem('userLogued', JSON.stringify(val[0]));
        this.getStorage();
        redirect && this.router.navigate(['/posts']);
      });
  }
}
