import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import {
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/auth.interface';
import { FireAuth, IuserRegister } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = environment.baseURL;
  private userLogued: User | undefined;

  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {
    const user = localStorage.getItem('userLogued');
    if (user) {
      this.userLogued = JSON.parse(user) as User;
    }
  }

  get getUserLogued() {
    return { ...this.userLogued } as User;
  }

  //editUser(data: Iauth): void {
  //this.http
  //.patch<Iauth>(`${this.baseURL}/users/${data.id}`, data)
  //.pipe(
  //tap((user) => {
  //this.userLogued = user;
  //})
  //)
  //.subscribe();
  //}

  async editUser(data: User) {
    const userRef = doc(this.firestore, 'user', data.id!);
    await setDoc(userRef, data);
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
    const user: User = {
      fullName: data.name,
      userName: data.username,
      email: data.email,
      role: 'USER',
      photo: data.photo,
      birthDate: data.birthDate.toString(),
      ubication: { lat: '', lng: '' },
      id: data.id,
    };
    const userRef = collection(this.firestore, 'users');
    localStorage.setItem('userLogued', JSON.stringify(user));
    this.router.navigate(['/posts']);
    return addDoc(userRef, user);
  }

  async setStorage(userID: string) {
    const userRef = collection(this.firestore, 'users');

    const q = query(userRef, where('id', '==', userID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      localStorage.setItem('userLogued', JSON.stringify(doc.data()));
    });
    this.router.navigate(['/posts']);
  }
}
