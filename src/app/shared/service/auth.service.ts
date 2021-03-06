import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { AppUser } from '../model/user/app-user';
import firebase from 'firebase';
import { AppUserService } from './app-user.service';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import UserCredential = firebase.auth.UserCredential;
import User = firebase.User;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // use to redirect while signing in (guard limitation)
  redirectUrl = '';
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private appUserService: AppUserService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.setUserData(user);
        if (this.redirectUrl !== '') {
          this.router.navigate([this.redirectUrl]);
        }
      }
    });
  }

  get isLoggedIn(): boolean {
    const userData = this.appUserService.getCurrentAppUser();
    return userData !== undefined;
  }

  // Auth logic to run auth providers
  authLogin(provider: GoogleAuthProvider): Promise<void> {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: UserCredential) => {
        this.ngZone.run(() => {
          this.router.navigate(['adventure']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  googleAuth(): Promise<void> {
    return this.authLogin(new GoogleAuthProvider());
  }

  setUserData(user: User | null): void {
    if (user) {
      this.appUserService.initUser(user).subscribe((dbUser) => {
        this.appUserService.setCurrentAppUser(dbUser);
      });
    } else {
      console.error('SendUserData was called without an actual user');
    }
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      console.log('SignOUT called');
      this.appUserService.removeCurrentAppUser();
      this.router.navigate(['sign-in']);
    });
  }
}
