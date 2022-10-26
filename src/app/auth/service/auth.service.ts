import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {
  Firestore,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import {Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditUser, User } from '../interfaces/auth.interface';
import { FireAuth, IuserRegister } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = environment.baseURL;
  private userLogued: User | undefined;
  isLogged: boolean = false;

  test: Subject<string> = new Subject()

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
      console.log(user);
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
      this.userLogued = JSON.parse(user) as User;
    }
  }

  //Manejar esto con un subject
  get getUserLogued() {
    return { ...this.userLogued } as User;
  }

  async editUser(data: EditUser, userID: string) {
    let temp!: AngularFirestoreDocument<User>;
    console.log(userID);
    temp = this.db.doc(`users/${userID}`);
    temp.update(data);

    this.test.next("hola")
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
        this.userLogued = undefined;
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

  setStorage(email: string) {
    return this.db
      .collection('users', (ref) => ref.where('email', '==', email))
      .valueChanges({ idField: 'id' })
      .subscribe((val) => {
        console.log(val);
        localStorage.setItem('userLogued', JSON.stringify(val[0]));
        this.router.navigate(['/posts']);
      });
  }
}
