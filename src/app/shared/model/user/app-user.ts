// this is named AppUser not User to avoid firebase.default.User conflict
import {Pokemon} from '../pokemon/pokemon';

export class AppUser {
  constructor(
    uid: string,
    email: string,
    displayName: string,
    photoURL: string,
    bossesDefeated?: string[]
  ) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.bossesDefeated = bossesDefeated ?? [];
  }

  static readonly UNKNOWN = 'UNKNOWN';
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  bossesDefeated: string[];
  pokemons?: Pokemon[];
}
