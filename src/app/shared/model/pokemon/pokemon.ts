import { ElemantaryType } from '../elemantary-type/elemantary-type';
import { Move } from '../move/move';

export class Pokemon {
  id: string;
  name: string;
  userUid: string;
  type: ElemantaryType;
  pv: number;
  e: number;
  cc: number;
  movesIds: string[];
  moves: Move[];
  imageUrl: string;

  constructor(
    id: string,
    name: string,
    userUid: string,
    type: ElemantaryType,
    pv: number,
    e: number,
    cc: number,
    imageUrl: string,
    movesIds?: string[],
    moves?: Move[]
  ) {
    this.id = id;
    this.name = name;
    this.userUid = userUid;
    this.type = type;
    this.pv = pv;
    this.e = e;
    this.cc = cc;
    this.movesIds = movesIds ?? [];
    this.moves = [];
    this.imageUrl = imageUrl;
  }

  static getDefaultImageUrl(): string {
    return 'https://firebasestorage.googleapis.com/v0/b/lp-angular.appspot.com/o/default_avatar.png?alt=media&token=46d115c9-8391-4b5a-ac57-32f729b3f088';
  }

  getImageRef(): string {
    return this.imageUrl.split('/')[7].split('?')[0];
  }

  isImageUrlDefault(): boolean {
    return this.getImageRef() === 'default_avatar.png';
  }

  getStatPoint(): number {
    return this.pv + this.e + this.cc;
  }
}

export const defaultPokemon = new Pokemon(
  '',
  '',
  '',
  ElemantaryType.Air,
  0,
  0,
  0,
  Pokemon.getDefaultImageUrl()
);

export type PokemonStat = 'pv' | 'e' | 'cc';

export const pokemonSpec = { maxPoints: 60, minPoint: 0, maxPokemonNbr: 6 };
