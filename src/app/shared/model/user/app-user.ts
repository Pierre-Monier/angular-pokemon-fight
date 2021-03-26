// this is named AppUser not User to avoid firebase.default.User conflict
export class AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  bossesDefeated: string[];

  constructor(uid: string, email: string, displayName: string, photoURL, bossesDefeated?: string[]) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
    bossesDefeated = bossesDefeated ?? [];
  }
}
