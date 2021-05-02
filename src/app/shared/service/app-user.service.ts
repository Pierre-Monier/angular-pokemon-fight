import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppUser } from '../model/user/app-user';
import User = firebase.User;
import { Pokemon } from '../model/pokemon/pokemon';
import app = firebase.app;

@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  constructor(private db: AngularFirestore) {}

  initUser(user: User): Observable<any> {
    return this.db
      .doc<AppUser>(`/users/${user.uid}`)
      .snapshotChanges()
      .pipe(
        map((appUserSnapshot) => {
          const data = appUserSnapshot.payload.data();
          if (data) {
            return new AppUser(
              appUserSnapshot.payload.id,
              data.email,
              data.displayName,
              data.photoURL,
              data.bossesDefeated
            );
          } else {
            // No AppUser found, creating a new one'
            const newAppUser = new AppUser(
              user.uid,
              user.email ?? AppUser.UNKNOWN,
              user.displayName ?? AppUser.UNKNOWN,
              user.photoURL ?? AppUser.UNKNOWN
            );

            this.addAppUser(newAppUser);

            return newAppUser;
          }
        })
      );
  }

  setCurrentAppUser(appUser: AppUser): void {
    localStorage.setItem('user', JSON.stringify(appUser));
  }

  removeCurrentAppUser(): void {
    localStorage.removeItem('user');
  }

  addAppUser(appUser: AppUser): void {
    this.db
      .collection<AppUser>('/users')
      .doc(appUser.uid)
      .set(Object.assign({}, appUser));
  }

  getCurrentAppUser(): AppUser | undefined {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      return new AppUser(
        parsedUser.uid,
        parsedUser.email,
        parsedUser.displayName,
        parsedUser.photoURL,
        parsedUser.bossesDefeated
      );
    }

    return undefined;
  }

  private updateAppUser(appUser: AppUser): Promise<void> {
    return this.db
      .doc<AppUser>(`/users/${appUser.uid}`)
      .update(Object.assign({}, appUser));
  }

  addBossToBossDefeated(bossId: string): void {
    console.log('addBossToBossDefeated called');
    const currentUser = this.getCurrentAppUser();

    if (currentUser && !currentUser.bossesDefeated.includes(bossId)) {
      currentUser.bossesDefeated.push(bossId);
      this.setCurrentAppUser(currentUser);
      this.updateAppUser(currentUser);
    }
  }
}
