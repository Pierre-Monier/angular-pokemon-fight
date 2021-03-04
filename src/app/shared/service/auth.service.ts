import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { AppUser } from '../model/user/app-user';
import firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import UserCredential = firebase.auth.UserCredential;
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: AppUser | null = null;
  // use to redirect while signing in (guard limitation)
  redirectUrl = '';
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.setUserData(user);
        localStorage.setItem('user', JSON.stringify(this.userData));

        if (this.redirectUrl !== '') {
          this.router.navigate([this.redirectUrl]);
        }
      }
    });
  }

  get isLoggedIn(): boolean {
    const userData: string | null = localStorage.getItem('user');
    return  (userData !== null);
  }

  // Auth logic to run auth providers
  authLogin(provider: GoogleAuthProvider): Promise<void> {
    return this.afAuth.signInWithPopup(provider)
      .then((result: UserCredential) => {
        console.log('In then');
        this.ngZone.run(() => {
          console.log('should be redirected');
          this.router.navigate(['dashboard']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  googleAuth(): Promise<void> {
    return this.authLogin(new GoogleAuthProvider());
  }

  setUserData(user: User | null): Promise<void> | void {
    if (user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userData: AppUser = {
        uid: user.uid,
        email: user.email ?? 'Unknown',
        displayName: user.displayName ?? 'Unknown',
        photoURL: user.photoURL ?? 'Unknown',
      };

      this.userData = userData;

      // update firestore
      return userRef.set(userData, {
        merge: true
      });
    } else {
      console.error('SendUserData was called without an actual user');
    }
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
