import { Injectable } from '@angular/core';
import {
  getPokemonStatPoint,
  Pokemon,
  pokemonSpec,
} from '../model/pokemon/pokemon';
import { ElemantaryType } from '../model/elemantary-type/elemantary-type';
import { getMoveStatPoint, Move, moveSpec } from '../model/move/move';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  isPokemonFormValid(pokemon: Pokemon): boolean {
    return (
      pokemon.name.trim() !== '' &&
      Object.values(ElemantaryType).includes(pokemon.type) &&
      getPokemonStatPoint(pokemon) <= pokemonSpec.maxPoints &&
      getPokemonStatPoint(pokemon) > pokemonSpec.minPoint
      // && pokemon.movesIds !== undefined
    );
  }

  isMoveFormValid(move: Move): boolean {
    return (
      move.name.trim() !== '' &&
      Object.values(ElemantaryType).includes(move.type) &&
      getMoveStatPoint(move) <= moveSpec.maxPoints &&
      getMoveStatPoint(move) > moveSpec.minPoint
    );
  }
}
