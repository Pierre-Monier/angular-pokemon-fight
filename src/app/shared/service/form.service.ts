import { Injectable } from '@angular/core';
import {
  Pokemon,
  pokemonStatDetail,
  getPokemonStatPoint,
} from '../model/pokemon/pokemon';
import { ElemantaryType } from '../model/elemantary-type/elemantary-type';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  isPokemonFormValid(pokemon: Pokemon): boolean {
    return (
      pokemon.name.trim() !== '' &&
      Object.values(ElemantaryType).includes(pokemon.type) &&
      getPokemonStatPoint(pokemon) <= pokemonStatDetail.max &&
      getPokemonStatPoint(pokemon) > pokemonStatDetail.min
    );
  }
}
