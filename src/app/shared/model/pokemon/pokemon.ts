import { ElemantaryType } from '../elemantary-type/elemantary-type';

export interface Pokemon {
  id: string;
  name: string;
  userUid: string;
  type: ElemantaryType;
  pv: number;
  e: number;
  cc: number;
}

export const defaultPokemon: Pokemon = {
  id: '',
  name: '',
  userUid: '',
  type: ElemantaryType.Air,
  pv: 0,
  e: 0,
  cc: 0,
};

export type PokemonStat = 'pv' | 'e' | 'cc';

export const pokemonStatDetail = { max: 60, min: 0 };

export const getPokemonStatPoint = (pokemon: Pokemon) =>
  pokemon.pv + pokemon.e + pokemon.cc;
