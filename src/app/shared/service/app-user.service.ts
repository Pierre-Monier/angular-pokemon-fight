import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AppUser} from '../model/user/app-user';
import User = firebase.User;

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
}
