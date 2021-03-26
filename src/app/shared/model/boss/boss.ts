import {Pokemon} from '../pokemon/pokemon';

export class Boss {
  id: string;
  name: string;
  imageUrl: string;
  pokemonsIds: string[];
  pokemons?: Pokemon[];

  constructor(id: string, name: string, imageUrl: string, pokemonsIds: string[]) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.pokemonsIds = pokemonsIds;
  }
}

export const BOSS_MOCK = [
  new Boss(
    '1',
    'boss1',
    'https://firebasestorage.googleapis.com/v0/b/lp-angular.appspot.com/o/default_avatar.png?alt=media&token=46d115c9-8391-4b5a-ac57-32f729b3f088',
    ['6xsiHnka3S15SEF2xrqw']
    ),
  new Boss(
    '2',
    'boss2',
    'https://firebasestorage.googleapis.com/v0/b/lp-angular.appspot.com/o/default_avatar.png?alt=media&token=46d115c9-8391-4b5a-ac57-32f729b3f088',
    ['6xsiHnka3S15SEF2xrqw']
  ),
  new Boss(
    '3',
    'boss3',
    'https://firebasestorage.googleapis.com/v0/b/lp-angular.appspot.com/o/default_avatar.png?alt=media&token=46d115c9-8391-4b5a-ac57-32f729b3f088',
    ['6xsiHnka3S15SEF2xrqw']
  ),
  new Boss(
    '4',
    'boss4',
    'https://firebasestorage.googleapis.com/v0/b/lp-angular.appspot.com/o/default_avatar.png?alt=media&token=46d115c9-8391-4b5a-ac57-32f729b3f088',
    ['6xsiHnka3S15SEF2xrqw']
  ),
  new Boss(
    '5',
    'boss5e',
    'https://firebasestorage.googleapis.com/v0/b/lp-angular.appspot.com/o/default_avatar.png?alt=media&token=46d115c9-8391-4b5a-ac57-32f729b3f088',
    ['6xsiHnka3S15SEF2xrqw']
  )
];
