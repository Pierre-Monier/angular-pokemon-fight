// this is nammed AppUser not User to avoid firebase.default.User conflict
export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}
