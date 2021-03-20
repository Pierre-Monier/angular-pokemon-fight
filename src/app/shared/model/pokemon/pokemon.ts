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

  constructor(
    id: string,
    name: string,
    userUid: string,
    type: ElemantaryType,
    pv: number,
    e: number,
    cc: number,
    movesIds?: string[]
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
  }
}

export const defaultPokemon = new Pokemon(
  '',
  '',
  '',
  ElemantaryType.Air,
  0,
  0,
  0
);

export type PokemonStat = 'pv' | 'e' | 'cc';

export const pokemonSpec = { maxPoints: 60, minPoint: 0, maxPokemonNbr: 6 };

export const getPokemonStatPoint = (pokemon: Pokemon) =>
  pokemon.pv + pokemon.e + pokemon.cc;
